import Rlending from '@riflending/riflending-js';
import BigNumber from 'bignumber.js';
import Util from './util'
import { constants, decimals } from "./constants";
import { ethers } from "ethers";


/**
 * middleware that adapt events and state of rbank js to compound js
 */
export default class Market {
  // constructor() {}
  constructor(cTokenSymbol, cTokenDecimals, tokenSymbol, underlyingName, underlyingDecimals, account) {
    //TODO see if util go to middleware class
    this.util = new Util();
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
    this.instanceAddress = this.util.addressContract[cTokenSymbol];
    this.instance = this.util.getContractCtoken(cTokenSymbol);

    this.token = Object();
    //TODO
    //validate cRBTC
    if (cTokenSymbol != 'cRBTC') {
      this.token.instace = this.util.getContractCtoken(cTokenSymbol)
      this.token.internalAddress = Rlending.util.getAddress(tokenSymbol).toLowerCase();
    }
    //set data token
    this.token.symbol = tokenSymbol;
    this.token.name = underlyingName;
    this.token.decimals = underlyingDecimals;
    //set balance account
    this.tokenBalance = this.getBalenceOfToken(account);
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
    let contract = this.util.getContract('RBTCMocOracle');
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
    let contract = this.util.getContract('PriceOracleProxy');
    //get price of cToken
    let priceToken = await contract.getUnderlyingPrice(this.instanceAddress);
    //get price of rbtc
    let valueOracle = await this.getValueMoc();
    //set decimals of cToken
    let decimals = `1e${this.decimals}`;
    // price = ( price cToken in rbtc * price of rbtc) / decimals of cToken
    return new BigNumber(priceToken._hex).multipliedBy(new BigNumber(valueOracle)).div(new BigNumber(decimals)).toNumber();
  }

  async getBalenceOfToken(account) {
    //set balance of account
    let balance = await this.instance.balanceOf(account);
    //return format (without wei)
    return Rlending._ethers.utils.formatEther(balance);
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
    let contract = this.util.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    //get is member (bool)
    return await contract.checkMembership(account, this.instanceAddress);
  }

  async addMarkets() {
    //set contract
    let contract = this.util.getContractByNameAndAbiName(constants.Unitroller, constants.Comptroller);
    //set signer
    let contractWithSigner = contract.connect(this.util.signer);
    //send transaction
    let tx = await contractWithSigner.enterMarkets([p.addressContract.cRIF]);
    //await result transaction
    return tx.wait();
  }

  async supply(amount, account) {
    //instace Rleanding js
    let instanceRlending = new Rlending(window.ethereum);
    //validate if market exist in account
    return this.validateMarketAccount(account).then((ok) => {
      //if not exist => enterMarket
      //then supply
      if (!ok) {
        //TODO remove this addMarkets and add it in supply button UI
        return this.addMarkets().then((enterMark) => {
          return instanceRlending.supply(this.token.symbol, amount);
        });
      };
      return instanceRlending.supply(this.token.symbol, amount);
    });
  }

  //TODO this 
  async supplyV2(amount, account) {
    //add decimals token
    amount = amount * Math.pow(10, decimals[this.token.symbol]);
    amount = ethers.BigNumber.from(amount.toString());
    const parameters = [];

    if (!this.isCRBTC) {
      //check allow
      const allowance = await this.token.instace.allowance(account, this.instanceAddress);
      const verify = allowance.lt(amount);
      if (verify) {
        //approve
        let signer = this.token.instace.connect(this.util.signer);
        await signer.approve(this.instanceAddress, amount);
      }
    }
    if (cTokenName === constants.cRBTC) {
      options.value = amount;
    } else {
      parameters.push(amount);
    }

  }
  /**
   * Borrows the specified amount from this market. May fail if no collateral has been supplied.
   * onto another market.
   * @param {number} amount of this market's token to be borrowed.
   * @param {string=} from if specified executes the transaction using this account.
   * @return {Promise<TXResult>}
   */
  borrow(amount, account) {
    console.log("borrow():this.token.symbol", this.token.symbol);
    console.log("borrow():amount", amount);
    console.log("borrow():amount", new BigNumber(amount));
    console.log("borrow():account", account);
    let instanceRlending = new Rlending(window.ethereum);
    return instanceRlending.borrow(this.token.symbol, amount);
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

}