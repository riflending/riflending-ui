import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import factoryContract from './factoryContract'
import { constants, decimals, abi } from './constants'

BigNumber.set({ EXPONENTIAL_AT: [-18, 36] })

/**
 * middleware that adapt events and state of rbank js to compound js
 */
export default class Market {
  // constructor() {}
  constructor(market, middleware) {
    const {
      cTokenSymbol,
      cTokenDecimals,
      tokenSymbol,
      underlyingName,
      underlyingDecimals,
      logo,
      account,
      collateralFactorMantissa,
      exchangeRateCurrent,
      reserveFactorMantissa,
      supplyRatePerBlock,
      borrowRatePerBlock,
      totalBorrows,
      totalCash,
      totalReserves,
      totalSupply,
    } = market
    this.middleware = middleware
    this.account = account
    this.factoryContract = new factoryContract()
    this.isCRBTC = cTokenSymbol === 'cRBTC'
    // TODO see delete eventuan web, uses in vue
    this.eventualWeb3WS = {}
    this.eventualWeb3Http = {}
    // set data cToken
    this.decimals = cTokenDecimals
    this.instanceAddress = this.factoryContract.addressContract[cTokenSymbol]
    this.instance = this.factoryContract.getContractCtoken(cTokenSymbol)
    this.symbol = cTokenSymbol

    this.token = Object()
    // validate cRBTC
    if (cTokenSymbol !== 'cRBTC') {
      this.token.instance = this.factoryContract.getContractToken(tokenSymbol)
      this.token.address = this.token.instance.address.toLowerCase()
    }
    // set data token
    this.token.symbol = tokenSymbol
    this.token.name = underlyingName
    this.token.decimals = underlyingDecimals
    this.token.logo = logo
    // set borrow rate
    this.factor = 1e18
    this.blocksPerYear = 1051200

    // TODO set supply of
    // https://github.com/ajlopez/DeFiProt/blob/master/contracts/Market.sol#L246
    this.supplyOf = 13

    // New information added fromt the Lens Helpers
    // Collateral factor can range from 0-90%,
    this.collateralFactorMantissa = collateralFactorMantissa
    // In the discord channel, the support team says that LTV is the same as the collateralFactor
    this.loanToValue = collateralFactorMantissa
    this.exchangeRateCurrent = exchangeRateCurrent
    this.reserveFactorMantissa = reserveFactorMantissa
    this.supplyRatePerBlock = supplyRatePerBlock
    this.borrowRatePerBlock = borrowRatePerBlock
    this.totalBorrows = totalBorrows
    this.totalCash = totalCash
    this.totalReserves = totalReserves
    this.totalSupply = totalSupply

    // Calculation based on the compound doc, see https://compound.finance/docs#protocol-math, search for APY
    const mantissa = ethers.utils.parseUnits('1', underlyingDecimals)
    const blocksPerDay = 4 * 60 * 24
    const daysPerYear = 365

    this.supplyApy =
      (Math.pow((supplyRatePerBlock / mantissa) * blocksPerDay + 1, daysPerYear - 1) - 1) * 100
    this.borrowApy =
      (Math.pow((borrowRatePerBlock / mantissa) * blocksPerDay + 1, daysPerYear - 1) - 1) * 100
  }

  async getValueMoc() {
    // set contract
    const contract = this.factoryContract.getContract('RBTCMocOracle')
    // call contract
    const [value] = await contract.callStatic.peek()
    return new BigNumber(value)
    // TODO comment validation, because in Oracle moc test fails (ok=false)
    // if (ok) {
    //   return value;
    // }
    // return 0;
  }

  async getPriceInDecimals() {
    const price = await this.getPrice()
    return new BigNumber(price).div(new BigNumber(1e18))
  }

  async getPrice() {
    // set contract
    const contract = this.factoryContract.getContract('PriceOracleProxy')
    // get price of cToken
    const priceToken = await contract.callStatic.getUnderlyingPrice(this.instanceAddress)
    // get price of rbtc
    return new BigNumber(priceToken.toString()).toNumber()
  }

  async getCurrentUserBalanceOfCtoken() {
    return this.getBalanceOfCtoken(this.account)
  }

  async getAccountBalanceOfCtoken(account) {
    // set balance of address
    const balance = await this.instance.balanceOf(account)
    // return format (without wei)
    return ethers.utils.formatUnits(balance, this.decimals)
  }

  async getTotalBorrowsCurrent(formatted) {
    // Total Borrows is the amount of underlying currently loaned out by the market, and the amount upon which interest is accumulated to suppliers of the market.
    const balance = await this.instance.callStatic.totalBorrowsCurrent()
    return formatted ? ethers.utils.formatEther(balance) : balance
  }

  getTotalSupply() {
    // Mmmm see https://compound.finance/docs/ctokens#total-supply, probably we need to use this method, but depends of the bussines rule, we will use the sum of the total borrow and cash
    const totalSupply = this.totalCash.add(this.totalBorrows)
    return ethers.utils.formatEther(totalSupply)
  }

  async getUserBalanceOfUnderlying() {
    return this.getBalanceOfUnderlyingFormatted(this.account)
  }

  async getBalanceOfUnderlyingFormatted(account) {
    // set balance of account
    // const balance = await this.instance.callStatic.balanceOfUnderlying(account)
    const balance = await this.balanceOfUnderlying(account)
    // return format (without wei)
    return ethers.utils.formatEther(balance)
  }

  async balanceOfUnderlying(account) {
    return await this.instance.callStatic.balanceOfUnderlying(account)
  }

  async getCash() {
    // get balance of contract expressed in underlying
    const cash = await this.instance.getCash()
    return Number(cash)
  }

  async getBorrowRate() {
    const borrowRatePerBlock = await this.instance.borrowRatePerBlock()
    // return borrow rate
    return new BigNumber(borrowRatePerBlock.toString())
      .times(new BigNumber(100 * this.blocksPerYear))
      .div(new BigNumber(this.factor))
      .toNumber()
  }

  /**
   * Check if the user already enter the market
   * @param account
   * @returns {Promise<*>}
   */
  async checkMembership(account) {
    const contract = this.factoryContract.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )

    return contract.checkMembership(account, this.instanceAddress)
  }

  /**
   * Allow connected user to enter the market
   * @returns {Promise<*|"ok"|"not-equal"|"timed-out">}
   */
  async enterMarket() {
    // set contract
    const contract = this.factoryContract.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    // set signer
    const contractWithSigner = contract.connect(this.factoryContract.getSigner())
    // send transaction
    const tx = await contractWithSigner.enterMarkets([this.instanceAddress])
    // await result transaction
    return tx.wait()
  }

  /**
   * Allow the connecte user to exit the market
   * @returns {Promise<*|"ok"|"not-equal"|"timed-out">}
   */
  async exitMarket() {
    // set contract
    const contract = this.factoryContract.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    // set signer
    const contractWithSigner = contract.connect(this.factoryContract.getSigner())
    // send transaction
    const tx = await contractWithSigner.exitMarket(this.instanceAddress)
    // await result transaction
    return tx.wait()
  }

  /**
   * Supply the specified amount from this market.
   * @param {number} amount of this market's token to be supply.
   * @return {Promise<TXResult>} the wait mined transaction
   */
  async supply(amount) {
    // Required, please dont delete this
    const txOptions = {
      gasLimit: 250000,
    }
    // add decimals token
    const amountBN = this.getAmountDecimals(amount)
    let tx
    // validate crbtc
    if (!this.isCRBTC) {
      // mint token
      const signerCtoken = this.instance.connect(this.factoryContract.getSigner())
      tx = await signerCtoken.mint(amountBN.toString(), txOptions)
    } else {
      // set signer cRBTC
      const signer = this.instance.connect(this.factoryContract.getSigner())
      // set value
      const overrides = {
        value: amountBN.toString(),
        ...txOptions,
      }
      // mint crbtc
      tx = await signer.mint(overrides)
    }
    // wait for mined transaction
    return tx.wait()
  }

  /**
   * Borrows the specified amount from this market.
   * @param {number} amount of this market's token to be borrowed.
   * @return {Promise<TXResult>} the wait mined transaction
   */
  async borrow(amount) {
    // TODO: add validation. Account has to have entered market prior to borrowing.
    // add decimals token
    const amountBN = this.getAmountDecimals(amount)
    // connect to cerc20
    const signer = this.instance.connect(this.factoryContract.getSigner())
    // perform borrow()
    const tx = await signer.borrow(amountBN.toString())
    // wait for mined transaction
    return tx.wait()
  }

  getAmountDecimals(amount, isCtoken = false) {
    // add decimals token to fixed
    const decimalToFix = !isCtoken ? decimals[this.token.symbol] : decimals[this.symbol]
    return ethers.utils.parseUnits(
      typeof amount === 'string' ? amount : amount.toFixed(decimalToFix),
      decimalToFix,
    )
  }

  /**
   * @dev collateralFactorMantissa, scaled by 1e18, is multiplied by a supply balance to determine how much value can be borrowed
   * getCollateralFactorMantissa for cToken.
   * @return human number collateralFactorMantisa
   */
  getCollateralFactorMantissa() {
    return ethers.utils.formatEther(this.collateralFactorMantissa)
  }

  /**
   * getLiquidationIncentiveMantissa for cToken.
   * @return human number liquidationIncentiveMantissa
   */
  async getLiquidationIncentiveMantissa() {
    // set contract Comptroller delegate (Unitroller)
    const contract = this.factoryContract.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    // get incentive mantissa
    const liquidationIncentiveMantissa = await contract.liquidationIncentiveMantissa()
    // return value
    return ethers.utils.formatEther(liquidationIncentiveMantissa)
  }

  async redeemUnderlying(amount) {
    // Required, please dont delete this
    const txOptions = {
      gasLimit: 250000,
    }
    // set signer token
    const signer = this.instance.connect(this.factoryContract.getSigner())
    // send redeemUnderlying
    const tx = await signer.redeemUnderlying(amount.toString(), txOptions)
    // wait for mined transaction
    return tx.wait()
  }

  async redeem(amount) {
    const amountBN = this.getAmountDecimals(amount, true)
    // Required, please dont delete this
    const txOptions = {
      gasLimit: 250000,
    }
    // set signer token
    const signer = this.instance.connect(this.factoryContract.getSigner())
    // send redeem
    const tx = await signer.redeem(amountBN.toString(), txOptions)
    // wait for mined transaction
    return tx.wait()
  }
  // eslint-disable-next-line no-unused-vars
  withdraw(amount, max = false) {
    // add decimals token
    const amountBN = this.getAmountDecimals(amount)
    // validate if max sets and is crbtc
    // if ((max) || (this.isCRBTC)) {
    //   //amount cToken
    //   return this.redeem(amountBN.toString());
    // }
    // amount token
    return this.redeemUnderlying(amountBN.toString())
  }

  /**
   * rePays off the specified amount from an existing debt in this market.
   * May fail if there is no debt to be paid or if the user doesn't have enough
   * tokens to pay the amount entered.
   * @param {number} amount of the debt of this market's token to be paid.
   * @param {string=} from if specified executes the transaction using this account.
   * @return {Promise<TXResult>}
   */
  async payBorrow(amount) {
    let contractWithSigner
    let tx

    // Required, please dont delete this
    const txOptions = {
      gasLimit: 250000,
    }
    // validate crbtc
    if (this.isCRBTC) {
      // set signer token
      contractWithSigner = this.instance.connect(this.factoryContract.getSigner())
      tx = await contractWithSigner.repayBorrow({
        value: ethers.utils.parseEther(`${amount}`),
        ...txOptions,
      })
    } else {
      // set signer cRBTC
      contractWithSigner = this.instance.connect(this.factoryContract.getSigner())
      tx = await contractWithSigner.repayBorrow(ethers.utils.parseEther(`${amount}`), txOptions)
    }
    // wait for mined transaction
    return tx.wait()
  }

  /**
   * mock events
   */
  get eventualEvents() {
    return new Promise((resolve) => {
      resolve('10')
    })
  }

  /**
   * withdrawAllowed Calls Comptroller to check if redeem is
   *   allowed for this user in this market with this amount
   * @dev to be used in withdraw modal
   * @param amount of ctoken to be redeemed for underlying
   * @param {address} account the address of the account
   * @return {response, code} response: (bool) if allowed or not, code: numerical error otherwise
   */
  async withdrawAllowed(amount, account) {
    // set
    const amountBN = this.getAmountDecimals(amount)
    // set contract Comptroller delegate (Unitroller)
    const contract = this.factoryContract.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    return contract.callStatic
      .redeemAllowed(this.instanceAddress, account, amountBN.toString())
      .then((response) => ({ allowed: response.toNumber() === 0, errorCode: response }))
  }

  /**
   * getMaxWithdrawAllowed Calculates max withdraw allowance for this account in this market
   * @dev to be used in Withdraw modal
   * @param {address} account the address of the account
   * @return {Number} res the max redeemable amount in underlying
   */
  async getMaxWithdrawAllowed(account) {
    // pseudo-code
    // if user not entered market:
    //   return min(user balance, market balance)
    // else:
    //   return min(user liquidity / (asset price * collateralFactor), market balance)
    //   this value comes from  https://github.com/riflending/rlending-protocol/blob/master/contracts/Comptroller.sol#L717
    //   we don't need the exchangeRate at this point as we want the result in the underlying and not in cTokens

    const balance = new BigNumber((await this.getUserBalanceOfUnderlying()).toString())
    const contractCash = new BigNumber((await this.getCash()) / 10 ** this.token.decimals)
    let maxWithdrawAllowed = contractCash.gt(balance) ? balance : contractCash
    const member = await this.checkMembership(account)
    if (!member) return maxWithdrawAllowed

    const { accountLiquidityInExcess } = await this.middleware.getAccountLiquidity(account)
    const liquidityInExcess = new BigNumber(accountLiquidityInExcess.toString()).div(10 ** 18)
    if (liquidityInExcess.lte(0)) return BigNumber(0)

    const price = new BigNumber(await this.getPrice()).div(10 ** 18) // current market price
    const collateralFactor = new BigNumber(this.collateralFactorMantissa.toString()).div(10 ** 18)

    const tokensToDenom = collateralFactor.times(price)
    const maxAmountByLiquidityInExcess = liquidityInExcess.div(tokensToDenom)

    maxWithdrawAllowed = maxWithdrawAllowed.gt(maxAmountByLiquidityInExcess)
      ? maxAmountByLiquidityInExcess
      : maxWithdrawAllowed

    return maxWithdrawAllowed
  }

  /**
   * borrowAllowed Calls Comptroller to check if borrow is
   *   allowed for this user in this market with this amount
   * @dev to be used in borrow modal
   * @param amount of underlying to be borrowed
   * @param {address} account the address of the account
   * @return {response, code} response: (bool) if allowed or not, code: numerical error otherwise
   */
  async borrowAllowed(amount, account) {
    const amountBN = this.getAmountDecimals(amount)
    const contract = this.factoryContract.getContractByNameAndAbiName(
      constants.Unitroller,
      constants.Comptroller,
    )
    const response = await contract.callStatic.borrowAllowed(
      this.instanceAddress,
      account,
      amountBN.toString(),
    )
    return { allowed: response.toNumber() === 0, errorCode: response }
  }

  /**
   * getMaxBorrowAllowed Calculates max borrow allowance for this account in this market
   * @notice this function will may only be used when entered market, otherwise liquidity will be 0
   * @dev to be used in supply, borrow and repay modals
   * @param {address} account the address of the account
   * @return {Number} res the max borrowable amount
   */
  async getMaxBorrowAllowed(account) {
    //set price
    const price = await this.getPrice() // current market price
    const { accountLiquidityInExcess } = await this.middleware.getAccountLiquidity(account)
    return price > 0 ? accountLiquidityInExcess / price : 0 // return max(0,borrowLimit)
  }

  /** TODO
   * Gets the equivalent of rbank getAccountValues() ¯\_(ツ)_/¯
   * @dev research DefiProt contracts to understand what this does
   * @param {address} account the address of the account
   * @return (supplyValue, borrowValue)
   */
  async getAccountValues(account) {
    const borrowValue = await this.borrowBalanceCurrent(account)
    const tokenBalance = await this.getBalanceOfUnderlyingFormatted(account)
    return tokenBalance, borrowValue
  }

  /**
   * calls borrowBalanceCurrent()
   * @dev replaces DefiProt updatedBorrowBy()
   * @param {address} account the address of the account
   * @return returns the total borrow balance including accrued interests
   */
  async borrowBalanceCurrent(account) {
    return this.instance.callStatic.borrowBalanceCurrent(account)
  }

  async borrowBalanceCurrentFormatted(account) {
    const balance = await this.borrowBalanceCurrent(account)
    return ethers.utils.formatEther(balance)
  }

  /**
   * getAccountSnapshot returns the current status of a given account in this market
   * @dev to be used in
   * @param account Address of the account to snapshot
   * @return (possible error, accrued ctoken balance, borrow balance, current exchange rate mantissa) all in BigNumber
   */
  async getAccountSnapshot(account) {
    // calls cToken contract
    const [
      err,
      cTokenBalance,
      borrowBalance,
      exchangeRateMantissa,
    ] = await this.instance.getAccountSnapshot(account)
    return {
      err: err,
      cTokenBalance: new BigNumber(cTokenBalance.toString()),
      borrowBalance: new BigNumber(borrowBalance.toString()),
      exchangeRateMantissa: new BigNumber(exchangeRateMantissa.toString()),
    }
  }

  /**
   * currentExchangeRate mantissa for a given cToken.
   * @return human number currentExchangeRate
   */
  async getCurrentExchangeRate() {
    // set balance of account
    const currentExchangeRate = await this.instance.exchangeRateStored()
    return Number(currentExchangeRate)
  }

  async getAccountUnderwater() {
    //get borrow accounts
    const borrowAcconts = await this.borrowAccounts()
    let underWaters = []
    //get underwater accounts
    for (let index = 0; index < borrowAcconts.length; index++) {
      await this.middleware.getAccountLiquidity(borrowAcconts[index]).then((liquidity) => {
        if (new BigNumber(liquidity.accountShortfall._hex).isGreaterThan(0)) {
          // console.log("liquidity", borrowAcconts[index], liquidity)
          underWaters.push(borrowAcconts[index])
        }
      })
    }
    return underWaters
  }

  async borrowAccounts() {
    //TODO, refact turl and provider
    const url = 'http://18.218.165.234:4444'
    const provider = new ethers.providers.JsonRpcProvider(url)
    const abiCtoken = this.isCRBTC ? abi['cRBTC'] : abi['cErc20']
    const filterLocal = this.instance.filters.Borrow()
    const latest = await provider.getBlockNumber()
    // const ini = 1451746;
    const ini = 1504046
    let borrows = []
    for (let index = latest; index > ini; index -= 1000) {
      try {
        let logs = await provider.getLogs({
          ...filterLocal,
          fromBlock: index - 1000,
          toBlock: index,
        })
        if (logs.length > 0) {
          //get account of log
          let auxiliar = logs.map(function (element) {
            const iface = new ethers.utils.Interface(abiCtoken)
            //return first element of event (borrower)
            //TODO fix "args[0]"
            return iface.parseLog(element).args[0]
          })
          //get distinct address
          auxiliar = auxiliar.filter((v, i, a) => a.indexOf(v) === i)

          for (let index = 0; index < auxiliar.length; index++) {
            borrows.push(auxiliar[index])
          }
        }
      } catch (error) {
        console.error('ERROR', error)
      }
    }
    //TODO see if apply distinct once
    //get distinct address
    borrows = borrows.filter((v, i, a) => a.indexOf(v) === i)
    return borrows
  }

  async liquidateBorrow(liquidateAccount, amount, addressCollateralMarket) {
    const amountBN = this.getAmountDecimals(amount)
    let tx
    //set signer
    const signer = this.instance.connect(this.factoryContract.getSigner())
    //validate crbtc
    if (!this.isCRBTC) {
      tx = await signer.liquidateBorrow(
        liquidateAccount,
        amountBN.toString(),
        addressCollateralMarket,
      )
    } else {
      tx = await signer.liquidateBorrow(liquidateAccount, addressCollateralMarket, {
        value: amountBN.toString(),
      })
    }
    // wait for mined transaction
    return tx.wait()
  }

  /**
   * Check if the market is approve
   * @param account
   * @param amountBN => amount in BN
   * @returns bool = false need approve
   */
  async isAllowance(account, amountBN = this.getAmountDecimals(1)) {
    //validate not crbtc
    if (this.isCRBTC) return true
    // check allowance
    const allowance = await this.token.instance.allowance(account, this.instanceAddress)
    // validate if enough
    return !allowance.lt(amountBN)
  }

  async approveWithMaxUint() {
    if (!this.isCRBTC) {
      const cTokenSigner = this.token.instance.connect(this.factoryContract.getSigner())
      // approve
      const tx = await cTokenSigner.approve(this.instanceAddress, ethers.constants.MaxUint256)
      return tx.wait()
    }
  }
}
