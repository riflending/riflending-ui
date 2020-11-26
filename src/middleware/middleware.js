import Market from './market';
import Rlending from '@riflending/riflending-js';


export default class Middleware {
    constructor() { }


    get getMarkets() {
        let markets = Array();
        for (let index = 0; index < Rlending.cTokensDetails.length; index++) {
            let cTokenSymbol = Rlending.cTokensDetails[index].symbol;
            let tokenSymbol = Rlending.cTokensDetails[index].underlying.symbol;
            markets.push(new Market(cTokenSymbol, tokenSymbol, Rlending.cTokensDetails[index].underlying.name, Rlending.cTokensDetails[index].underlying.decimals));
        }
        return markets;
    }
}