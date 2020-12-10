import Rlending from '@riflending/riflending-js';
import BigNumber from 'bignumber.js';
import factoryContract from './factoryContract'
import { constants, decimals, abi } from "./constants";
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
    this.ctokenBalance = this.getBalanceOfToken(account);
    this.tokenBalance = this.getBalanceOfUnderlying(account);
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
    let decimals = `1e${this.token.decimals}`;
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
    //get balance of contract expressed in underlying
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
    //TODO: add validation. Account has to have entered market prior to borrowing.
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
   * TODO: clean this function
   * TODO: update to contract factory
   * rePays off the specified amount from an existing debt in this market.
   * May fail if there is no debt to be paid or if the user doesn't have enough
   * tokens to pay the amount entered.
   * @param {number} amount of the debt of this market's token to be paid.
   * @param {string=} from if specified executes the transaction using this account.
   * @return {Promise<TXResult>}
   */
  payBorrow(amount, from = '') {
    console.log("RepayBorrow(): this.token.symbol", this.token.symbol);
    console.log("RepayBorrow(): amount", amount);
    console.log("RepayBorrow(): amount", new BigNumber(amount));
    let instanceRlending = new Rlending(window.ethereum);
    // return instanceRlending.repayBorrow(this.token.symbol, new BigNumber(amount),null);
    return instanceRlending.repayBorrow(this.token.symbol, amount ,null);
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
    amount = this.getAmountDecimals(amount);
    let isAllowed =  await Rlending.eth.read(
      this.instanceAddress,
      "function redeemAllowed(address, address, uint) returns (uint)",
      [this.instanceAddress, account, amount],
      { provider: window.ethereum }
    );
    console.log("market.js isWithdrawAllowed",isAllowed);
    return isAllowed;
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
    // signer(with a provider) https://docs.ethers.io/v5/api/signer/#VoidSigner
    let allow = await contractWithSigner.redeemAllowed(this.instanceAddress, account, amount);
    // let allow= await contract.redeemAllowed(this.instanceAddress, account, amount);
    console.log("Market.js withdrawAllowed? allowed LALALA",allow);
    // return allow.wait();
    return allow;
  }

/**
   * borrowAllowed Calls Comptroller to check if borrow is
   *   allowed for this user in this market with this amount
   * @dev to be used in borrow modal
   * @param amount of underlying to be borrowed
   * @param {address} account the address of the account
   * @return 0 if allowed, numerical error otherwise
   */
  async borrowAllowed(amount,account){
    amount = this.getAmountDecimals(amount);
    // console.log("market.js borrowAllowed");
    let contract = this.factoryContract.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    // console.log("market.js borrowAllowed contract", contract);
    let isAllowed = await contract.callStatic.borrowAllowed(this.instanceAddress,account,amount);
    // console.log("market.js borrowAllowed allowed?", isAllowed);
    return isAllowed;
  }

  /** TODO
   * Gets the equivalent of rbank getAccountValues() ¯\_(ツ)_/¯
   * @dev research DefiProt contracts to understand what this does
   * @param {address} account the address of the account
   * @return (supplyValue, borrowValue)
   */
  async getAccountValues(account){
    const borrowValue = await this.borrowBalanceCurrent(account);
    console.log("market.js getAccountValues supplyValue ", this.tokenBalance, "balanceUnderlying ", this.getBalanceOfUnderlying(account), " borrowValue ",borrowValue);
    return (this.tokenBalance, borrowValue);
  }

  /**
   * calls borrowBalanceCurrent()
   * @dev replaces DefiProt updatedBorrowBy()
   * @param {address} account the address of the account
   * @return returns the total borrow balance including accrued interests
   */
  async borrowBalanceCurrent(account){
    let balance = await this.instance.callStatic.borrowBalanceCurrent(account);
    console.log("market.js borrowBalanceCurrent()",Number(balance));
    return balance;
  }

  async supplyBalanceCurrent(account){
    let balance = await this.instance.callStatic.borrowBalanceCurrent(account);
    return balance;
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

  async getBalanceOfUnderlying(account) {
    //set balance of account
    let balance = await this.instance.callStatic.balanceOfUnderlying(account);
    //return format (without wei)
    return ethers.utils.formatEther(balance);
  }
}
