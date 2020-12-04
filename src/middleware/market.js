import Rlending from '@riflending/riflending-js';
import BigNumber from 'bignumber.js';


/**
 * middleware that adapt events and state of rbank js to compound js
 */
export default class Market {
  // constructor() {}
  constructor(cTokenSymbol, cTokenDecimals, tokenSymbol, underlyingName, underlyingDecimals, account) {
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
    this.instanceAddress = Rlending.util.getAddress(cTokenSymbol).toLowerCase();
    this.instance = new Rlending._ethers.Contract(
      Rlending.util.getAddress(cTokenSymbol),
      ((cTokenSymbol) == 'cRBTC') ? Rlending.util.getAbi("CRBTC") : Rlending.util.getAbi("cErc20"),
      Rlending.eth._createProvider(window.ethereum)
    );
    this.token = Object();
    //TODO
    //validate cRBTC
    if (cTokenSymbol != 'cRBTC') {
      this.token.instace = new Rlending._ethers.Contract(
        Rlending.util.getAddress(tokenSymbol),
        Rlending.util.getAbi("cErc20"),
        Rlending.eth._createProvider(window.ethereum)
      );
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
    //TODO addres oracle moc in const
    return Rlending.eth
      .read(
        "0x2d39cc54dc44ff27ad23a91a9b5fd750dae4b218",
        "function peek() returns (bytes32, bool)",
        [],
        { provider: window.ethereum }
      )
      .then(([value, ok]) => {
        return value;
        //TODO comment validation, because in Oracle moc test fails (ok=false)
        // if (ok) {
        //   return value;
        // }
        // return 0;
      });
  }

  async getPrice() {
    let priceToken;
    //get price of cToken
    return Rlending.eth
      .read(
        Rlending.util.getAddress('PriceOracleProxy').toLowerCase(),
        "function getUnderlyingPrice(address) returns (uint)",
        [this.instanceAddress],
        { provider: window.ethereum }
      )
      .then((priceResult) => {
        priceToken = priceResult;
        //get price of rbtc
        return this.getValueMoc();
      }).then((valueOracle) => {
        //set decimals of token
        let decimals = `1e${this.decimals}`;
        // price = ( price cToken in rbtc * price of rbtc) / decimals of cToken
        return new BigNumber(priceToken._hex).multipliedBy(new BigNumber(valueOracle)).div(new BigNumber(decimals)).toNumber();
      });
  }

  async getBalenceOfToken(acoount) {
    return Rlending.eth
      .read(
        this.instanceAddress,
        "function balanceOf(address) returns (uint)",
        [acoount],
        { provider: window.ethereum }
      ).then((balance) => Rlending._ethers.utils.formatEther(balance));
  }

  async getCash() {
    return Rlending.eth
      .read(
        this.instanceAddress,
        "function getCash() returns (uint)",
        [],
        { provider: window.ethereum }
      ).then((cash) => Number(cash));
  }

  async getBorrowRate() {
    return Rlending.eth
      .read(
        this.instanceAddress,
        "function borrowRatePerBlock() returns (uint)",
        [],
        { provider: window.ethereum }
      )
      .then((borrowRatePerBlock) => {
        return new BigNumber(borrowRatePerBlock._hex).times(new BigNumber(100 * this.blocksPerYear)).div(new BigNumber(this.factor)).toNumber();
      });
  }


  /**
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

    // console.log("RepayBorrow(): account", account);
    // Calls erc20 contract repayBorrow()
    // return Rlending.eth
    //   .trx(
    //     this.token.internalAddress,
    //     //"0x2b47f1b810faf99d911228a87c9c6d0d61514b9d", // cRIF
    //     "function repayBorrow(uint) returns (uint)",
    //     [amount],
    //     { provider: window.ethereum }
    //   ).catch((err) => {console.log("repayErr",err)});
    // // let instanceRlending = new Rlending(window.ethereum, { account });
    // return instanceRlending.payBorrow(amount,window.ethereum.account);
    // return new Promise((resolve, reject) => {
    //   this.token
    //     .then((token) => token.approve(this.instanceAddress, amount, from))
    //     .then(() => send(this.instance.methods.payBorrow(amount), from))
    //     .then(resolve)
    //     .catch(reject);
    // });
  }

    /**
   * Returns an updated amount according to the chain block number
   * for this market's token that has been borrowed by the caller.
   * @param {string=} from if specified executes the transaction using this account.
   * @return {Promise<number>}
   */
  updatedBorrowBy(account = '') {
    console.log("updateBorrow: account",account);
    console.log("updateBorrow: symbol",this.token.symbol);
    let instanceRlending = new Rlending(window.ethereum, { account });
    //?????
    // return new Promise((resolve, reject) => {
    //   web3.eth.getAccounts()
    //     .then(([account]) => this.instance.methods.updatedBorrowBy(from || account)
    //       .call())
    //     .then((updatedBorrowBy) => Number(updatedBorrowBy))
    //     .then(resolve)
    //     .catch(reject);
    // });
  }

  supply(amount, account) {
    console.log("this.token.symbol", this.token.symbol);
    console.log("amount", amount);
    console.log("amount", new BigNumber(amount));
    console.log("account", account);
    let instanceRlending = new Rlending(window.ethereum, { account });
    return new Promise((resolve, reject) => {
      instanceRlending.supply(this.token.symbol, amount)
        .then((result) => {
          console.log('Ethers.js transaction object', result);
        })
        .then(resolve)
        .catch(reject);
      // this.token
      //   .then((token) => token.approve(this.instanceAddress, amount, from))
      //   .then(() => send(this.instance.methods.supply(amount), from))
      //   .then(resolve)
      //   .catch(reject);
    });
  }



    // instanceRlending
    // console.log("compound", instanceRlending);

    // delete instanceRlending;
    // return new Promise((resolve, reject) => {
    //   Rlending.eth
    //     .read(
    //       this.token.internalAddress,
    //       "function approve(address, uint) returns (bool)",
    //       // "function balanceOf(address) returns (uint)",
    //       // [Rlending.util.getAddress(cTokenSymbol).toLowerCase()],
    //       [this.instanceAddress, amount],
    //       { provider: window.ethereum }
    //     )
    //     .then((aprove) => {
    //       console.log("aprove", approve);
    //       // return new BigNumber(price._hex).toNumber();
    //       return Rlending.eth
    //         .read(
    //           approve,
    //           "function mint(uint) returns (uint)",
    //           // "function balanceOf(address) returns (uint)",
    //           // [Rlending.util.getAddress(cTokenSymbol).toLowerCase()],
    //           [amount],
    //           { provider: window.ethereum }
    //         );
    //     }).then((mint => {
    //       console.log(mint);
    //       return Rlending.eth
    //         .write(
    //           approve,
    //           "function mint(uint) returns (uint)",
    //           // "function balanceOf(address) returns (uint)",
    //           // [Rlending.util.getAddress(cTokenSymbol).toLowerCase()],
    //           [amount],
    //           { provider: window.ethereum }
    //         );
    //     })).then(resolve)
    //     .catch(reject);

    // });



  validateMarketAccount(account, cTokenSymbol) {
    //TODO add cache.
    return Rlending.eth
      .read(
        Rlending.util.getAddress(Rlending.Unitroller),
        "function checkMembership(address, address) returns (bool)",
        [account, this.instanceAddress],
        { provider: window.ethereum }
      );
    //"function getAssetsIn() returns (address[])",
  }

  async addMarkets() {
    return Rlending.eth.trx(
      Rlending.util.getAddress(Rlending.Unitroller),
      "function enterMarkets(address[]) returns (bool)",
      [[this.instanceAddress]],
      { provider: window.ethereum }
    );
  }

  async supply(amount, account) {
    //instace Rleanding js
    let instanceRlending = new Rlending(window.ethereum);
    //validate if market exist in account
    return this.validateMarketAccount(account, this.token.symbol).then((ok) => {
      //if not exist => enterMarket
      //then supply
      if (!ok) {
        return this.addMarkets().then((enterMark) => {
          return instanceRlending.supply(this.token.symbol, amount);
        });
      };
      return instanceRlending.supply(this.token.symbol, amount);
    });
  }

  /**
   * Borrows the specified amount from this market. May fail if no collateral has been supplied.
   * onto another market.
   * @param {number} amount of this market's token to be borrowed.
   * @param {string=} from if specified executes the transaction using this account.
   * @return {Promise<TXResult>}
   */
  borrow(amount, account){
    console.log("borrow():this.token.symbol", this.token.symbol);
    console.log("borrow():amount", amount);
    console.log("borrow():amount", new BigNumber(amount));
    console.log("borrow():account", account);
    let instanceRlending = new Rlending(window.ethereum);
    return instanceRlending.borrow(this.token.symbol, amount);
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

}