import { ethers } from 'ethers'
import Vue from 'vue'
import BigNumber from 'bignumber.js'
import Market from './market'
import factoryContract from './factoryContract'
import { constants, address, errorCodes, cTokensDetails } from './constants'

BigNumber.set({ EXPONENTIAL_AT: [-18, 36] })

export default class Middleware {
  async getMarkets(account) {
    const markets = []

    const addresses = Vue?.web3Provider?.network?.chainId === 31 ? address.testnet : address.mainnet

    for (let cTokensDetail of cTokensDetails) {
      const {
        collateralFactorMantissa,
        exchangeRateCurrent,
        reserveFactorMantissa,
        supplyRatePerBlock,
        borrowRatePerBlock,
        totalBorrows,
        totalCash,
        totalReserves,
        totalSupply,
      } = await this.getCTokenMetadata(addresses[cTokensDetail.symbol])

      const options = {
        cTokenSymbol: cTokensDetail.symbol,
        cTokenDecimals: cTokensDetail.decimals,
        tokenSymbol: cTokensDetail.underlying.symbol,
        underlyingName: cTokensDetail.underlying.name,
        underlyingDecimals: cTokensDetail.underlying.decimals,
        collateralFactorMantissa,
        exchangeRateCurrent,
        reserveFactorMantissa,
        supplyRatePerBlock,
        borrowRatePerBlock,
        totalBorrows,
        totalCash,
        totalReserves,
        totalSupply,
        account,
      }

      markets.push(new Market(options))
    }
    return markets
  }

  async getCTokenMetadata(cTokenAddress) {
    const factoryContractInstance = new factoryContract()
    const contract = factoryContractInstance.getContractByNameAndAbiName(
      constants.RlendingLens,
      constants.RlendingLens,
    )
    return contract.callStatic.cTokenMetadata(cTokenAddress)
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
    //TODO: This function shouldn't have so many new BigNumber()
    const markets = await this.getMarkets(account)
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

  /**
   * getAccountHealth calculates the account health factor
   * @dev returns percentage value between 0 and 1
   * @param account Address of the account to snapshot
   * @return 1 - (SUM_market borrowValue / SUM_market(supplyValue * colFact) )
   */
  async getAccountHealth(account) {
    //TODO: This function shouldn't have so many new BigNumber(), casting to Number and string
    //      try to unify criteria
    const markets = await this.getMarkets(account)
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
              const colFact = market.collateralFactorMantissa

              const colFactNum = Number(colFact)
              const colFactStr = colFactNum / market.factor.toString()
              const colFactBN = new BigNumber(colFactStr)

              const borrowValue = borrowBalanceCurrentBN.multipliedBy(marketPriceBN)
              const supplyValue = tokenBalanceBN.multipliedBy(marketPriceBN)

              const supplyByFactor = supplyValue.multipliedBy(colFactBN)
              resolve({ borrowValue, supplyByFactor })
            } catch (err) {
              reject(err)
            }
          })()
        }),
    )
    const totals = await Promise.all(marketsPromises)
    let numerator = new BigNumber(0)
    let denominator = new BigNumber(0)

    for (let i = 0, len = totals.length; i < len; i++) {
      numerator = numerator.plus(totals[i].borrowValue)
      denominator = denominator.plus(totals[i].supplyByFactor)
    }

    if (denominator == 0 || numerator == 0) return 1

    return new BigNumber(1).minus(numerator.div(denominator)).toNumber()
  }
}
