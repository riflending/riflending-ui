import Rlending from '@riflending/riflending-js';
import BigNumber from 'bignumber.js';
import factoryContract from './factoryContract'
import { constants, decimals } from "./constants";
import { ethers } from "ethers";
import { account } from '@riflending/riflending-js/dist/nodejs/api';


/**
 * middleware that adapt events and state of rbank js to compound js
 */
export default class Market {
  // constructor() {}
  constructor(cTokenSymbol, cTokenDecimals, tokenSymbol, underlyingName, underlyingDecimals, account) {
    //TODO see if factoryContract go to middleware class
    this.factoryContract = new factoryContract();
    this.isCRBTC = (cTokenSymbol == 'cRBTC');
    let config = {
      1337: {
        httpProvider: 'http://127.0.0.1:8545',
        wsProvider: 'ws://127.0.0.1:8545',
      }
    };
    this.eventualWeb3WS = {};
    this.eventualWeb3Http = {};
    // market.eventualWeb3WS = getEventualChainId().then((chainId) => new Rlending._ethers.providers.WebsocketProvider(config[chainId].wsProvider)).catch(() => new Error('Something went wrong with the web3 instance over web sockets on Market'));
    // market.eventualWeb3Http = new Rlending._ethers.providers.HttpProvider(config[32].httpProvider);
    this.decimals = cTokenDecimals;
    this.instanceAddress = this.factoryContract.addressContract[cTokenSymbol];
    this.instance = this.factoryContract.getContractCtoken(cTokenSymbol);

    this.token = Object();
    //TODO
    //validate cRBTC
    if (cTokenSymbol != 'cRBTC') {
      this.token.instace = this.factoryContract.getContractCtoken(cTokenSymbol)
      this.token.internalAddress = Rlending.util.getAddress(tokenSymbol).toLowerCase();
    }
    //set data token
    this.token.symbol = tokenSymbol;
    this.token.name = underlyingName;
    this.token.decimals = underlyingDecimals;
    //set balance account
    this.tokenBalance = this.getBalanceOfToken(account);
    //set price
    this.price = this.getPrice().then((price) => new BigNumber(price).div(new BigNumber(1e18)));
    //set borrow rate
    this.factor = 1e18;
    this.blocksPerYear = 1051200;
    this.borrowRate = this.getBorrowRate();

    //TODO set supply of
    // https://github.com/ajlopez/DeFiProt/blob/master/contracts/Market.sol#L246
    this.supplyOf = 13;
  }

  async getValueMoc() {
    //set contract
    let contract = this.factoryContract.getContract('RBTCMocOracle');
    //call contract
    let [value, ok] = await contract.peek();
    return value;
    //TODO comment validation, because in Oracle moc test fails (ok=false)
    // if (ok) {
    //   return value;
    // }
    // return 0;
  }

  async getPrice() {
    //set contract
    let contract = this.factoryContract.getContract('PriceOracleProxy');
    //get price of cToken
    let priceToken = await contract.getUnderlyingPrice(this.instanceAddress);
    //get price of rbtc
    let valueOracle = await this.getValueMoc();
    //set decimals of cToken
    let decimals = `1e${this.decimals}`;
    // price = ( price cToken in rbtc * price of rbtc) / decimals of cToken
    return new BigNumber(priceToken._hex).multipliedBy(new BigNumber(valueOracle)).div(new BigNumber(decimals)).toNumber();
  }

  async getBalanceOfToken(account) {
    //set balance of account
    let balance = await this.instance.balanceOf(account);
    //return format (without wei)
    return ethers.utils.formatEther(balance);
  }

  async getCash() {
    //set balance of account
    let cash = await this.instance.getCash();
    return Number(cash);
  }

  async getBorrowRate() {
    let borrowRatePerBlock = await this.instance.borrowRatePerBlock();
    // return borrow rate
    return new BigNumber(borrowRatePerBlock._hex).times(new BigNumber(100 * this.blocksPerYear)).div(new BigNumber(this.factor)).toNumber();
  }

  async validateMarketAccount(account) {
    //set contract Comptroller delegate (Unitroller)
    let contract = this.factoryContract.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    //get is member (bool)
    return await contract.checkMembership(account, this.instanceAddress);
  }

  async addMarkets() {
    //set contract
    let contract = this.factoryContract.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    //set signer
    let contractWithSigner = contract.connect(this.factoryContract.signer);
    //send transaction
    let tx = await contractWithSigner.enterMarkets([p.addressContract.cRIF]);
    //await result transaction
    return tx.wait();
  }

  /**
   * Supply the specified amount from this market.
   * @param {number} amount of this market's token to be supply.
   * @param {address} account the address of the account
   * @return {Promise<TXResult>} the wait mined transaction
   */
  async supply(amount, account) {
    //add decimals token
    amount = this.getAmountDecimals(amount);
    let signer;
    let tx;
    //validate crbtc
    if (!this.isCRBTC) {
      //check allowance
      const allowance = await this.token.instace.allowance(account, this.instanceAddress);
      //validate if enough
      const notEnough = allowance.lt(amount);
      //set signer token
      signer = this.token.instace.connect(this.factoryContract.signer);

      if (notEnough) {
        //approve
        await signer.approve(this.instanceAddress, amount);
      }
      //mint token
      tx = await signer.mint(amount);
    }
    else {
      //set signer cRBTC
      signer = this.instance.connect(this.factoryContract.signer);
      //set value
      let overrides = {
        value: amount,
      };
      //mint crbtc
      tx = await signer.mint(overrides);
    }
    //wait for mined transaction
    return tx.wait();
  }
  /**
   * Borrows the specified amount from this market.
   * @param {number} amount of this market's token to be borrowed.
   * @return {Promise<TXResult>} the wait mined transaction
   */
  async borrow(amount) {
    //add decimals token
    amount = this.getAmountDecimals(amount);
    let signer;
    //validate crbtc
    if (!this.isCRBTC) {
      //set signer token
      signer = this.token.instace.connect(this.factoryContract.signer);
    } else {
      //set signer cRBTC
      signer = this.instance.connect(this.factoryContract.signer);
    }
    let tx = await signer.borrow(amount);
    //wait for mined transaction
    return tx.wait();
  }

  getAmountDecimals(amount) {
    //add decimals token
    amount = amount * Math.pow(10, (!this.isCRBTC) ? decimals[this.token.symbol] : decimals[constants.cRBTC]);
    return ethers.BigNumber.from(amount.toString());
  }

  /**
   * getCollateralFactorMantissa for cToken.
   * @return human number collateralFactorMantisa | error beacuse the cToken is not listed on protocol
   */
  async getCollateralFactorMantissa() {
    //set contract Comptroller delegate (Unitroller)
    let contract = this.factoryContract.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    //get is member (bool)
    let [isListed, collateralFactorMantissa, isComped] = await contract.markets(this.instanceAddress);
    //validate token listed
    if (isListed) {
      return ethers.utils.formatEther(collateralFactorMantissa);
    }
    console.error("cToken is not listed")
  }

  redeem(amount,account){
    console.log("borrow():this.token.symbol", this.token.symbol);
    console.log("borrow():amount", amount);
    console.log("borrow():amount BigNum", new BigNumber(amount));
    console.log("borrow():account", account);
    let instanceRlending = new Rlending(window.ethereum);
    return instanceRlending.redeem(this.token.symbol, amount);
  }

  /**
   * mock events
   */
  get eventualEvents() {
    return new Promise((resolve, reject) => {
      resolve('10')
    });
  }

  liquidateBorrow(borrower, amount, collateralMarket, from = '') {
    // return this.token;
    return new Promise((resolve, reject) => {
      this.token
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * withdrawAllowed Calls Comptroller to check if redeem is
   *   allowed for this user in this market with this amount
   * @dev to be used in withdraw modal
   * @param amount of ctoken to be redeemed for underlying
   * @param {address} account the address of the account
   * @return 0 if allowed, numerical error otherwise
   */
  async withdrawAllowed(amount,account){
    //TODO fix this function. error: Duplicate definition in ABI?
    // gets Comptroller
    console.log("withdrawAllowed? Market.js");
    console.log("Market.js acc",account);
    console.log("Market.js addr",this.instanceAddress);
    console.log("Market.js amount",amount);
    amount = this.getAmountDecimals(amount);
    console.log("Market.js amount DECIMALS",amount);
    let contract = this.factoryContract.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    // let contract = this.factoryContract.getContract(constants.Comptroller);
    console.log("Market.js redeemAllowed? contract",contract);
    //function redeemAllowed(address cToken, address redeemer, uint redeemTokens) external returns (uint);
    //query the contract
    let contractWithSigner = contract.connect(this.factoryContract.signer);
    //TODO need to research signed call to contract ethers
    // doc: https://docs.ethers.io/v4/api-contract.html#providers-vs-signers
    // signer(with a provider)
    let allow = await contractWithSigner.redeemAllowed(this.instanceAddress, account, amount);
    // let allow= await contract.redeemAllowed(this.instanceAddress, account, amount);
    console.log("Market.js withdrawAllowed? allowed LALALA",allow);
    // return allow.wait();
    return allow;
  }

  /** TODO
   * Gets the equivalent of rbank getAccountValues() ¯\_(ツ)_/¯
   * @dev research DefiProt contracts to understand what this does
   * @param {address} account the address of the account
   * @return (supplyValue, borrowValue)
   */
  getAccountValues(account){
    console.log("market.js getAccountValues TODO THIS FUNCTION");
    let supplyValue, borrowValue;
    return (666,666);
  }

  /** TODO
   * Gets the equivalent of rbank updatedBorrowBy() ¯\_(ツ)_/¯
   * (perhaps this is similar to accrued() on borrow interests )
   * @dev research DefiProt contracts to understand what this does
   * @param {address} account the address of the account
   * @return borrowBy - I think this returns the total borrow supply across all markets (??)
   */
  updatedBorrowBy(account){
    console.log("market.js updatedBorrowBy TODO THIS FUNCTION");
    let borrowBy = 999;
    return borrowBy;
  }

  /**
   * getSnapshot returns the current status of a given account in this market
   * @dev to be used in
   * @param account Address of the account to snapshot
   * @return (possible error, accrued ctoken balance, borrow balance, current exchange rate mantissa) all in BigNumber
   */
  async getSnapshot(account) {
    // calls cToken contract
    let snap = await this.instance.getAccountSnapshot(account);
    return snap;
  }

  /**
   * currentExchangeRate mantissa for a given cToken.
   * @return human number currentExchangeRate
   */
  async getCurrentExchangeRate() {
    //set balance of account
    let currentExchangeRate = await this.instance.exchangeRateStored();
    // console.log("getCurExRate:",currentExchangeRate);
    return Number(currentExchangeRate);
  }
}
