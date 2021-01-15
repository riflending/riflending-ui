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

    const addresses = Vue.web3Provider.network.chainId === 31 ? address.testnet : address.mainnet

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

  async getAccountHealth(account) {
    // DTI Debt to Income
    // TODO: fix this function, probably not calculating the right number
    console.log('getAccountHealth')
    const liqFactor = await this.getLiquidationFactor()
    console.log('getAccountHealth liquidateFactor', liqFactor)
    if (supplyValue == 0 || borrowValue == 0) return 0
    const { borrowValue, supplyValue } = await this.getTotals(account)
    console.log('getAccountHealth getTotals borrow', borrowValue, ' supply', supplyValue)
    const val = supplyValue.div(borrowValue * liqFactor)
    console.log('val', val)
    const ret = 1 / (1 + Math.exp(-val.toNumber()))
    console.log('getAccountHealth return', ret)
    return ret > 1 ? 1 : ret < 0 ? 0 : ret
  }

  async getAssetsIn(account) {
    const factoryContractInstance = new factoryContract()
    const contract = factoryContractInstance.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    return await contract.getAssetsIn(account)
  }

  async getAssetsBalanceIn(account) {
    const assets = await this.getAssetsIn(account)
    let balances = []
    const markets = await this.getMarkets(account)
    for (let asset of assets) {
      let market = markets.find((market) => market.instanceAddress === asset.toLowerCase())
      if (market) {
        balances.push({
          symbol: market.token.symbol,
          balance: await market.getBalanceOfUnderlying(account),
          marketAddress: market.instanceAddress,
          price: await market.getPriceInDecimals(),
        })
      }
    }
    return balances
  }
  async liquidateBorrowAllowed(
    liquidateAccountAddress,
    liquidatorAccountAddress,
    amount,
    addressLiquidateMarket,
    addressCollateralMarket,
  ) {
    //parse amount
    const decimal = 18
    let amountBN = ethers.utils.parseUnits(amount.toFixed(decimal), decimal)
    //get contract and signer
    const factoryContractInstance = new factoryContract()
    const contract = factoryContractInstance.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    const signer = contract.connect(factoryContractInstance.getSigner())
    //call liquidateBorrowAllowed
    return await signer.callStatic.liquidateBorrowAllowed(
      addressLiquidateMarket,
      addressCollateralMarket,
      liquidatorAccountAddress,
      liquidateAccountAddress,
      amountBN.toString(),
    )
  }
}
