import Market from './market';
import Rlending from '@riflending/riflending-js';
import BigNumber from 'bignumber.js';

export default class Middleware {
    constructor() { }


    getMarkets(account) {
        let markets = Array();
        for (let index = 0; index < Rlending.cTokensDetails.length; index++) {
            let cTokenSymbol = Rlending.cTokensDetails[index].symbol;
            let tokenSymbol = Rlending.cTokensDetails[index].underlying.symbol;
            markets.push(new Market(cTokenSymbol, Rlending.cTokensDetails[index].decimals, tokenSymbol, Rlending.cTokensDetails[index].underlying.name, Rlending.cTokensDetails[index].underlying.decimals, account));
        }
        return markets;
    }

    getAccountLiquidity(account) {
        return Rlending.eth
            .read(
                Rlending.util.getAddress(Rlending.Unitroller),
                "function getAccountLiquidity(address) returns (uint,uint,uint)",
                [account],
                { provider: window.ethereum }
            )
            .then(([error, liquidity, shortfall]) => Number(liquidity));
    }

    getCollateralFactor(account) {
        return 1;
        return Rlending.eth
            .read( // TODO: update to query proper collateral factor in contract
                Rlending.util.getAddress(Rlending.Unitroller),
                "function getAccountLiquidity(address) returns (uint)",
                [account],
                { provider: window.ethereum }
            );
    }

    getWalletAccountBalance(account, tokenAddress) {
      return Rlending.eth
        .read(
          tokenAddress,
          "function balanceOf(address) returns (uint)",
          [account],
          {provider: window.ethereum}
        ).then((balance) => Rlending._ethers.utils.formatEther(balance));
    }

    getWalletAccountBalanceForRBTC(account) {
      return Rlending.eth
        .getBalance(
          account,
          window.ethereum
        ).then((balance) => Rlending._ethers.utils.formatEther(balance));
    }

    async getTotals(account) {
      const markets = this.getMarkets(account);

      const marketsPromises = markets.map(market => new Promise((resolve, reject) => {
          (async () => {
            try {
              const borrowBalanceCurrent = await market.borrowBalanceCurrent(account);
              const borrowBalanceCurrentBN = new BigNumber(borrowBalanceCurrent.toNumber());

              const marketPriceFromOracleBN = await market.price;
              const marketPriceBN = marketPriceFromOracleBN ? marketPriceFromOracleBN: new BigNumber(0);

              const tokenBalance = await market.tokenBalance;
              const tokenBalanceBN = new BigNumber(tokenBalance);

              const borrowValue = borrowBalanceCurrentBN.multipliedBy(marketPriceBN);
              const supplyValue = tokenBalanceBN.multipliedBy(marketPriceBN);
              resolve({borrowValue, supplyValue});
            } catch (err) {
              reject(err);
            }
          })()
        })
      )
      const totals = await Promise.all(marketsPromises);

      const totalsReduced = totals.reduce((previousValue, currentValue) => {
        return {
          borrowValue: previousValue.borrowValue.plus(currentValue.borrowValue),
          supplyValue: previousValue.supplyValue.plus(currentValue.supplyValue),
          earningValue: new BigNumber(0)
        }
      }, { borrowValue: new BigNumber(0), supplyValue: new BigNumber(0), earningValue: new BigNumber(0)});

      return totalsReduced;
    }
}
