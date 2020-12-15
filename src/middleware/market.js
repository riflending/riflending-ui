import Rlending from '@riflending/riflending-js';
import BigNumber from 'bignumber.js';
import factoryContract from './factoryContract'
import { constants, decimals, abi } from "./constants";
import { ethers } from "ethers";


/**
 * middleware that adapt events and state of rbank js to compound js
 */
export default class Market {
  // constructor() {}
  constructor(cTokenSymbol, cTokenDecimals, tokenSymbol, underlyingName, underlyingDecimals, account) {
    //TODO see if factoryContract go to middleware class
    this.factoryContract = new factoryContract();
    this.isCRBTC = (cTokenSymbol == 'cRBTC');
    //TODO see delete eventuan web, uses in vue
    this.eventualWeb3WS = {};
    this.eventualWeb3Http = {};
    //set data cToken
    this.decimals = cTokenDecimals;
    this.instanceAddress = this.factoryContract.addressContract[cTokenSymbol];
    this.instance = this.factoryContract.getContractCtoken(cTokenSymbol);
    this.symbol = cTokenSymbol;

    this.token = Object();
    //validate cRBTC
    if (cTokenSymbol != 'cRBTC') {
      this.token.instance = this.factoryContract.getContractToken(tokenSymbol)
      this.token.internalAddress = Rlending.util.getAddress(tokenSymbol).toLowerCase();
    }
    //set data token
    this.token.symbol = tokenSymbol;
    this.token.name = underlyingName;
    this.token.decimals = underlyingDecimals;
    //set token balance account
    this.tokenBalance = this.getBalanceOfUnderlying(account);
    //set cToken balance account
    this.cTokenBalance = this.getBalanceOfCtoken(account);
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

  async getBalanceOfCtoken(account) {
    //set balance of account
    let balance = await this.instance.balanceOf(account);
    //return format (without wei)
    return ethers.utils.formatEther(balance);
  }

  async getBalanceOfUnderlying(account) {
    //set balance of account
    let balance = await this.instance.callStatic.balanceOfUnderlying(account);
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
    return contract.checkMembership(account, this.instanceAddress);
  }

  async addMarkets() {
    //set contract
    let contract = this.factoryContract.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    //set signer
    let contractWithSigner = contract.connect(this.factoryContract.signer);
    //send transaction
    let tx = await contractWithSigner.enterMarkets([this.instanceAddress]);
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
    let tx;
    //validate crbtc
    if (!this.isCRBTC) {
      //check allowance
      const allowance = await this.token.instance.allowance(account, this.instanceAddress);
      //validate if enough
      const notEnough = allowance.lt(amount);
      if (notEnough) {
        //set signer token
        let signer = this.token.instance.connect(this.factoryContract.signer);
        //approve
        let txSigner = await signer.approve(this.instanceAddress, ethers.constants.MaxUint256);
        await txSigner.wait();
      }
      //mint token
      let signerCtoken = this.instance.connect(this.factoryContract.signer);
      tx = await signerCtoken.mint(amount);
    }
    else {
      //set signer cRBTC
      let signer = this.instance.connect(this.factoryContract.signer);
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
    // connect to cerc20
    let signer = this.instance.connect(this.factoryContract.signer);
    // perform borrow()
    let tx = await signer.borrow(amount);
    //wait for mined transaction
    return tx.wait();
  }

  getAmountDecimals(amount, isCtoken = false) {
    //add decimals token
    amount = amount * Math.pow(10, (!isCtoken) ? decimals[this.token.symbol] : decimals[this.symbol]);
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

  async redeemUnderlying(amount) {
    //set signer token
    let signer = this.instance.connect(this.factoryContract.signer);
    //send redeemUnderlying
    let tx = await signer.redeemUnderlying(amount);
    //wait for mined transaction
    return tx.wait();
  }

  async redeem(amount) {
    //set signer token
    let signer = this.instance.connect(this.factoryContract.signer);
    //send redeem
    let tx = await signer.redeem(amount);
    //wait for mined transaction
    return tx.wait();
  }

  withdraw(amount, max = false) {
    //add decimals token
    amount = this.getAmountDecimals(amount);
    //validate if max sets and is crbtc
    // if ((max) || (this.isCRBTC)) {
    //   //amount cToken
    //   return this.redeem(amount);
    // }
    //amount token
    return this.redeemUnderlying(amount);
  }

  /**
   * rePays off the specified amount from an existing debt in this market.
   * May fail if there is no debt to be paid or if the user doesn't have enough
   * tokens to pay the amount entered.
   * @param {number} amount of the debt of this market's token to be paid.
   * @param {string=} from if specified executes the transaction using this account.
   * @return {Promise<TXResult>}
   */
  async payBorrow(amount) {
    let contractWithSigner;
    let tx;
    //validate crbtc
    if (this.isCRBTC) {
      //set signer token
      contractWithSigner = this.instance.connect(this.factoryContract.signer);
      tx = await contractWithSigner.repayBorrow({ value: ethers.utils.parseEther(amount + '') });
    } else {
      //set signer cRBTC
      contractWithSigner = this.instance.connect(this.factoryContract.signer);
      tx = await contractWithSigner.repayBorrow(ethers.utils.parseEther(amount + ''));
    }
    //wait for mined transaction
    return tx.wait();
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
   * @return {response, code} response: (bool) if allowed or not, code: numerical error otherwise
   */
  async withdrawAllowed(amount, account) {
    //set
    amount = this.getAmountDecimals(amount);
    //set contract Comptroller delegate (Unitroller)
    let contract = this.factoryContract.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    return contract.callStatic.redeemAllowed(this.instanceAddress, account, amount).then((response) => ({ "allowed": response == 0, "errorCode": response }));
  }

  /**
     * borrowAllowed Calls Comptroller to check if borrow is
     *   allowed for this user in this market with this amount
     * @dev to be used in borrow modal
     * @param amount of underlying to be borrowed
     * @param {address} account the address of the account
     * @return 0 if allowed, numerical error otherwise
     */
  async borrowAllowed(amount, account) {
    amount = this.getAmountDecimals(amount);
    // console.log("market.js borrowAllowed");
    let contract = this.factoryContract.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    // console.log("market.js borrowAllowed contract", contract);
    let isAllowed = await contract.callStatic.borrowAllowed(this.instanceAddress, account, amount);
    // console.log("market.js borrowAllowed allowed?", isAllowed);
    return isAllowed;
  }

  /** TODO
   * Gets the equivalent of rbank getAccountValues() ¯\_(ツ)_/¯
   * @dev research DefiProt contracts to understand what this does
   * @param {address} account the address of the account
   * @return (supplyValue, borrowValue)
   */
  async getAccountValues(account) {
    const borrowValue = await this.borrowBalanceCurrent(account)
    return (this.tokenBalance, borrowValue);
  }

  /**
   * calls borrowBalanceCurrent()
   * @dev replaces DefiProt updatedBorrowBy()
   * @param {address} account the address of the account
   * @return returns the total borrow balance including accrued interests
   */
  async borrowBalanceCurrent(account) {
    let balance = await this.instance.callStatic.borrowBalanceCurrent(account);
    return balance;
  }

  async borrowBalanceCurrentFormatted(account) {
    let balance = await this.borrowBalanceCurrent(account);
    return ethers.utils.formatEther(balance);
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
    return Number(currentExchangeRate);
  }

  async getBalanceOfUnderlying(account) {
    //set balance of account
    let balance = await this.instance.callStatic.balanceOfUnderlying(account);
    //return format (without wei)
    return ethers.utils.formatEther(balance);
  }
}
