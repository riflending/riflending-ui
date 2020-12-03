import Market from './market';
import Rlending from '@riflending/riflending-js';

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

    getCollateralFactor() {
        return Rlending.eth
            .read(
                Rlending.util.getAddress(Rlending.Unitroller),
                "function getAccountLiquidity(address) returns (uint)",
                [account],
                { provider: window.ethereum }
            );
    }
}