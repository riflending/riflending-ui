import { ethers } from 'ethers'
import Vue from 'vue'
import BigNumber from 'bignumber.js'
import Market from './market'
import factoryContract from './factoryContract'
import { constants, errorCodes, cTokensDetails } from './constants'

BigNumber.set({ EXPONENTIAL_AT: [-18, 36] })

export default class Middleware {
  getMarkets(account) {
    const markets = Array()
    for (let index = 0; index < cTokensDetails.length; index++) {
      const cTokenSymbol = cTokensDetails[index].symbol
      const tokenSymbol = cTokensDetails[index].underlying.symbol
      markets.push(
        new Market(
          cTokenSymbol,
          cTokensDetails[index].decimals,
          tokenSymbol,
          cTokensDetails[index].underlying.name,
          cTokensDetails[index].underlying.decimals,
          account,
        ),
      )
    }
    return markets
  }

  /**
   * getAccountLiquidity gets account liquidity information
   * @dev This only works for accounts that have entered a borrow market, othewise returns (0,0,0)
   * @param account Address of the account to snapshot
   * @return (possible error code (semi-opaque),
   *          account liquidity in excess of collateral requirements,
   *          account shortfall below collateral requirements)
   */

  async getAccountLiquidity(account) {
    const factoryContractInstance = new factoryContract()
    const contract = factoryContractInstance.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    const [err, accountLiquidityInExcess, accountShortfall] = await contract.getAccountLiquidity(
      account,
    )
    return {
      err,
      accountLiquidityInExcess,
      accountShortfall,
    }
  }

  // eslint-disable-next-line no-unused-vars
  getCollateralFactor(account) {
    return 1
    // return Rlending.eth
    //   .read( // TODO: update to query proper collateral factor in contract
    //     Rlending.util.getAddress(Rlending.Unitroller),
    //     "function getAccountLiquidity(address) returns (uint)",
    //     [account],
    //     { provider: window.ethereum }
    //   );
  }

  async getWalletAccountBalance(account, tokenAddress) {
    const abi = ['function balanceOf(address) returns (uint)']
    const contract = new ethers.Contract(tokenAddress, abi, Vue.web3Provider)
    const balance = await contract.callStatic.balanceOf(account)
    return ethers.utils.formatEther(balance)
  }

  async getWalletAccountBalanceForRBTC(account) {
    const balance = await Vue.web3Provider.getBalance(account)
    return ethers.utils.formatEther(balance)
  }

  async getTotals(account) {
    const markets = this.getMarkets(account)
    const marketsPromises = markets.map(
      (market) =>
        new Promise((resolve, reject) => {
          ;(async () => {
            try {
              const borrowBalanceCurrent = await market.borrowBalanceCurrentFormatted(account)
              const borrowBalanceCurrentBN = new BigNumber(borrowBalanceCurrent)
              const marketPriceFromOracleBN = await market.getPriceInDecimals()
              const marketPriceBN = marketPriceFromOracleBN || new BigNumber(0)

              const tokenBalance = await market.getBalanceOfUnderlying(account)
              const tokenBalanceBN = new BigNumber(tokenBalance)

              const borrowValue = borrowBalanceCurrentBN.multipliedBy(marketPriceBN)
              const supplyValue = tokenBalanceBN.multipliedBy(marketPriceBN)
              resolve({ borrowValue, supplyValue })
            } catch (err) {
              reject(err)
            }
          })()
        }),
    )
    const totals = await Promise.all(marketsPromises)
    const totalsReduced = totals.reduce(
      (previousValue, currentValue) => ({
        borrowValue: previousValue.borrowValue.plus(currentValue.borrowValue),
        supplyValue: previousValue.supplyValue.plus(currentValue.supplyValue),
      }),
      { borrowValue: new BigNumber(0), supplyValue: new BigNumber(0) },
    )
    return totalsReduced
  }

  getMsjErrorCodeComptroller(errorNumber, isErroInfo = false) {
    const retorno = errorCodes.comptroller[isErroInfo ? 'info' : 'codes'][Number(errorNumber)]
    return !retorno ? '' : retorno.description
  }

  // calls comptroller to retrieve the liquidationFactor
  async getLiquidationFactor() {
    console.log('getLiquidationFactor')
    const factoryContractInstance = new factoryContract()
    let contract = factoryContractInstance.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    console.log('getLiquidationFactor contract', contract)
    const liqFactor = await contract.closeFactorMantissa()
    console.log('getLiquidationFactor', liqFactor)
    return liqFactor
  }

  async getAccountHealth(account) {
    const { borrowValue, supplyValue } = await this.getTotals(account)
    if (supplyValue == 0 || borrowValue == 0) return 1
    //returns 1 minus the division of borrow by supply. Supply is div 2, because of the reserve factor
    return 1 - borrowValue / (supplyValue / 2)
  }
}
