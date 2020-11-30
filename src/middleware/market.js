import Rlending from '@riflending/riflending-js';
import BigNumber from 'bignumber.js';


/**
 * middleware that adapt events and state of rbank js to compound js
 */
export default class Market {
  // constructor() {}
  constructor(cTokenSymbol, tokenSymbol, underlyingName, underlyingDecimals, account) {
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
    // this.token.internalAddress = "0x";
    this.token.symbol = tokenSymbol;
    this.token.name = underlyingName;
    this.token.decimals = underlyingDecimals;
    //set balance account
    this.tokenBalance = Rlending.eth.getBalance(
      account,
      window.ethereum
    ).then((balance) => Number(balance));

    //set price
    this.price =
      Rlending.eth
        .read(
          Rlending.util.getAddress('PriceOracleProxy').toLowerCase(),
          "function getUnderlyingPrice(address) returns (uint)",
          [Rlending.util.getAddress(cTokenSymbol).toLowerCase()],
          { provider: window.ethereum }
        )
        .then((price) => {
          return new BigNumber(price._hex).toNumber();
        });
    //set borrow rate 
    this.factor = 1;
    this.blocksPerYear = 1051200;
    this.borrowRate =
      Rlending.eth
        .read(
          this.instanceAddress,
          "function borrowRatePerBlock() returns (uint)",
          [],
          { provider: window.ethereum }
        ).then((borrowRatePerBlock) => {
          return new BigNumber(borrowRatePerBlock._hex).times(new BigNumber(100 * this.blocksPerYear)).div(new BigNumber(this.factor)).toNumber();
        });

    //set supply of
    // https://github.com/ajlopez/DeFiProt/blob/master/contracts/Market.sol#L246
    this.supplyOf = 13;
  }

  getEventualChainId = async () => 32;
  /**
   * Returns the list of existing markets.
   * @return {Promise<[Market]>}
   */

  /**
   * mock events
   */
  get eventualEvents() {
    return new Promise((resolve, reject) => {
      resolve('10')
      // .then(resolve)
      // .catch(reject);
    });
  }

  // get eventualEvents() {
  //   return new Promise((resolve, reject) => {
  //     // this.eventualWeb3WS
  //     // .then((web3WS) => {
  //     //   const ws = new Rlending._ethers.Contract(MarketContract.abi, this.address);
  //     resolve(
  //       {
  //         // supply: (filter = {}, fromBlock = 'latest', cb) => ws
  //         //   .events.Supply({ filter, fromBlock }, cb),
  //         // borrow: (filter = {}, fromBlock = 'latest', cb) => ws
  //         //   .events.Borrow({ filter, fromBlock }, cb),
  //         // redeem: (filter = {}, fromBlock = 'latest', cb) => ws
  //         //   .events.Redeem({ filter, fromBlock }, cb),
  //         // payBorrow: (filter = {}, fromBlock = 'latest', cb) => ws
  //         //   .events.PayBorrow({ filter, fromBlock }, cb),
  //         // liquidateBorrow: (filter = {}, fromBlock = 'latest', cb) => ws
  //         //   .events.LiquidateBorrow({ filter, fromBlock }, cb),
  //         // allEvents: (cb) => ws.events
  //         //   .allEvents({ fromBlock: 'latest' }, cb),
  //         liquidateBorrow: (filter = {}, fromBlock = 'latest', cb),
  //         allEvents: (cb) => "",
  //       },
  //     );
  //     // })
  //     // .catch(reject);
  //   });
  // }

  liquidateBorrow(borrower, amount, collateralMarket, from = '') {
    // return this.token;
    return new Promise((resolve, reject) => {
      this.token
        .then(resolve)
        .catch(reject);
    });
    // return new Promise((resolve, reject) => {
    //   this.token
    //     .then((token) => token.approve(this.instanceAddress, amount, from))
    //     .then(() => send(this.instance.methods.liquidateBorrow(
    //       borrower,
    //       amount,
    //       collateralMarket,
    //     ), from))
    //     .then(resolve)
    //     .catch(reject);
    // });
  }

}