import { ethers } from 'ethers'
import Vue from 'vue'
import BigNumber from 'bignumber.js'
import Market from './market'
import FactoryContract from './factoryContract'
import { constants, address, errorCodes, cTokensDetails } from './constants'
import { NETWORK_ID } from '../config/constants'

BigNumber.set({ EXPONENTIAL_AT: [-18, 36] })

export default class Middleware {
  constructor() {
    this.factoryContractInstance = new FactoryContract()
    this.factor = 10 ** 18
  }
  getAddresses() {
    const chainId = +Vue?.web3Provider?.network?.chainId || NETWORK_ID
    return address[chainId]
  }

  async getMarkets(account) {
    const markets = []
    const addresses = this.getAddresses()
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
        logo: cTokensDetail.logo,
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

      markets.push(new Market(options, this))
    }
    return markets
  }

  async getCTokenMetadata(cTokenAddress) {
    const contract = this.factoryContractInstance.getContract(constants.RlendingLens)
    return contract.callStatic.cTokenMetadata(cTokenAddress)
  }

  async cTokenBalancesAll(cTokensList, account) {
    const contract = this.factoryContractInstance.getContract(constants.RlendingLens)
    return contract.callStatic.cTokenBalancesAll(cTokensList, account)
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
    const contract = this.factoryContractInstance.getContractByNameAndAbiName(
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

  async getAllMarketsTotals(account) {
    const markets = await this.getMarkets(account)
    const marketsIn = (await this.getAssetsIn(account)).map((addr) => addr.toLowerCase())
    const multicallContract = this.factoryContractInstance.getContract(constants.Multicall)
    const priceOracleProxyContract = this.factoryContractInstance.getContract(
      constants.PriceOracleProxy,
    )
    const cTokenContract = this.factoryContractInstance.getContract(constants.cRBTC)

    let callArguments = []
    for (let i = 0; i < markets.length; i++) {
      callArguments.push({
        target: priceOracleProxyContract.address,
        callData: priceOracleProxyContract.interface.encodeFunctionData('getUnderlyingPrice', [
          markets[i].instanceAddress,
        ]),
      })
      callArguments.push({
        target: markets[i].instanceAddress,
        callData: cTokenContract.interface.encodeFunctionData('getAccountSnapshot', [account]),
      })
    }

    const results = await multicallContract.callStatic.aggregate(callArguments)

    let marketsTotals = []
    for (var i = 0; i < markets.length; i++) {
      const underlyingPrice = priceOracleProxyContract.interface.decodeFunctionResult(
        'getUnderlyingPrice',
        results.returnData[i * 2],
      )
      const underlyingPriceBN = new BigNumber(underlyingPrice.toString()).div(this.factor)

      const [
        err,
        cTokenBalance,
        borrowBalance,
        exchangeRateMantissa,
      ] = cTokenContract.interface.decodeFunctionResult(
        'getAccountSnapshot',
        results.returnData[i * 2 + 1],
      )
      const cTokenBalanceBN =
        Number(err) === 0 ? new BigNumber(cTokenBalance.toString()) : new BigNumber(0)
      const borrowBalanceBN =
        Number(err) === 0
          ? new BigNumber(borrowBalance.toString()).div(10 ** markets[i].token.decimals)
          : new BigNumber(0)
      const exchangeRateBN =
        Number(err) === 0
          ? new BigNumber(exchangeRateMantissa.toString()).div(this.factor)
          : new BigNumber(1)

      const underlyingBalanceBN = cTokenBalanceBN
        .times(exchangeRateBN)
        .div(10 ** markets[i].token.decimals)
      const collateralFactorBN = markets[i].collateralFactorMantissa

      marketsTotals.push({
        address: markets[i].instanceAddress,
        isInMarket: marketsIn.includes(markets[i].instanceAddress),
        collateralFactorMantissa: collateralFactorBN,
        symbol: markets[i].symbol,
        decimals: markets[i].decimals,
        cTokenBalance: cTokenBalanceBN.div(10 ** markets[i].decimals),
        exchangeRateMantissa: exchangeRateBN,
        underlyingPrice: underlyingPriceBN,
        underlyingBalance: underlyingBalanceBN,
        supplyValueUsd: underlyingBalanceBN.times(underlyingPriceBN),
        borrowValueUsd: borrowBalanceBN.times(underlyingPriceBN),
      })
    }
    return marketsTotals
  }

  async getTotalSupplysAndBorrows(account) {
    const marketsTotals = await this.getAllMarketsTotals(account)
    const total = marketsTotals.reduce(
      (accumulator, currentValue) => ({
        supplyValue: accumulator.supplyValue.plus(currentValue.supplyValueUsd),
        supplyValueAsCollateral: currentValue.isInMarket
          ? accumulator.supplyValueAsCollateral.plus(currentValue.supplyValueUsd)
          : accumulator.supplyValueAsCollateral,
        borrowValue: accumulator.borrowValue.plus(currentValue.borrowValueUsd),
      }),
      {
        supplyValue: new BigNumber(0),
        supplyValueAsCollateral: new BigNumber(0),
        borrowValue: new BigNumber(0),
      },
    )
    return total
  }

  getMsjErrorCodeComptroller(errorNumber, isErroInfo = false) {
    const retorno = errorCodes.comptroller[isErroInfo ? 'info' : 'codes'][Number(errorNumber)]
    return !retorno ? '' : retorno.description
  }

  // calls comptroller to retrieve the liquidationFactor
  async getLiquidationFactor() {
    let contract = this.factoryContractInstance.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    const liqFactor = await contract.closeFactorMantissa()
    return liqFactor
  }

  /**
   * getAccountHealth calculates the account health factor
   * @dev returns percentage value between 0 and 1
   * @param account Address of the account to snapshot
   * @return 1 - (SUM_market borrowValue / SUM_market(supplyValue * colFact) )
   */
  async getAccountHealth(account) {
    const marketsTotals = await this.getAllMarketsTotals(account)
    const inMarketsTotals = marketsTotals.filter((market) => market.isInMarket)
    const total = inMarketsTotals.reduce(
      (accumulator, currentValue) => ({
        supplyByFactor: accumulator.supplyByFactor.plus(
          currentValue.supplyValueUsd.times(currentValue.collateralFactorMantissa),
        ),
        borrowValue: accumulator.borrowValue.plus(currentValue.borrowValueUsd),
      }),
      { supplyByFactor: new BigNumber(0), borrowValue: new BigNumber(0) },
    )
    return total.supplyByFactor.eq(0) || total.borrowValue.eq(0)
      ? 1
      : new BigNumber(1).minus(total.borrowValue.div(total.supplyByFactor)).toNumber()
  }

  async getAssetsIn(account) {
    const contract = this.factoryContractInstance.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    return contract.getAssetsIn(account)
  }

  async getAssetsBalanceIn(account) {
    const assets = await this.getAssetsIn(account)
    let balances = []
    const markets = await this.getMarkets(account)
    for (let asset of assets) {
      let market = markets.find(
        (market) => market.instanceAddress.toLowerCase() === asset.toLowerCase(),
      )
      if (market) {
        balances.push({
          symbol: market.token.symbol,
          balance: await market.getBalanceOfUnderlyingFormatted(account),
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
    const contract = this.factoryContractInstance.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    const signer = contract.connect(this.factoryContractInstance.getSigner())
    //call liquidateBorrowAllowed
    return await signer.callStatic.liquidateBorrowAllowed(
      addressLiquidateMarket,
      addressCollateralMarket,
      liquidatorAccountAddress,
      liquidateAccountAddress,
      amountBN.toString(),
    )
  }

  /**
   * getRBTCPrice query the oracle to get rbtc price
   * @return BigNumber value of the rbtc price expressed in usd
   */
  async getRBTCPrice() {
    const contract = this.factoryContractInstance.getContract('RBTCMocOracle')
    const [value] = await contract.callStatic.peek()
    return new BigNumber(value)
  }

  async getAdapterPrice(adapterName) {
    const contract = this.factoryContractInstance.getContractByNameAndAbiName(
      adapterName,
      constants.PriceOracleAdapterMoc,
    )
    if (!contract) return
    const value = await contract.callStatic.assetPrices(this.getAddresses()[adapterName])
    return new BigNumber(value.toString()).div(10 ** 18)
  }

  /**
   * Check if some market was entered
   * @param account
   * @returns {Promise<boolean>}
   */
  async hasEnteredToSomeMarket(account) {
    const markets = await this.getMarkets(account)
    const marketsMemberships = await Promise.all(
      markets.map((market) => market.checkMembership(account)),
    )
    return marketsMemberships.some((value) => value)
  }

  /**
   * Check if the market is approve
   * @param account
   * @param marketSymbol
   * @returns bool = false need approve
   */
  async isAccountAllowanceInMarket(account, marketSymbol) {
    //validate symbol
    const symbol = constants[marketSymbol]
    const cTokenDetail = cTokensDetails.find((element) => element.underlying.symbol == symbol)
    if (!cTokenDetail || !symbol) return false
    //validate not crbtc
    if (symbol === constants['RBTC']) return true
    const addresses = this.getAddresses()
    //set amount
    const amountBN = ethers.utils.parseUnits('1', cTokenDetail.underlying.decimals)
    //set contract
    const contract = this.factoryContractInstance.getContractToken(symbol)
    // check allowance
    const allowance = await contract.allowance(account, addresses[cTokenDetail.symbol])
    // validate if enough
    return !allowance.lt(amountBN)
  }

  async approveMarketWithMaxUint(marketSymbol) {
    //validate symbol
    const symbol = constants[marketSymbol]
    const cTokenDetail = cTokensDetails.find((element) => element.underlying.symbol == symbol)
    if (!cTokenDetail || !symbol) return
    //validate not crbtc
    if (symbol === constants['RBTC']) return
    const addresses = this.getAddresses()
    //set contract
    const contract = this.factoryContractInstance.getContractToken(symbol)
    //set signer
    const cTokenSigner = contract.connect(this.factoryContractInstance.getSigner())
    // approve
    return cTokenSigner.approve(addresses[cTokenDetail.symbol], ethers.constants.MaxUint256)
  }

  async getGasPrice() {
    return Vue.web3Provider.getGasPrice().then((price) => {
      return new BigNumber(price.toString()).div(this.factor)
    })
  }
}
