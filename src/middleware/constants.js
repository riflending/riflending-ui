import { Erc20 } from '../abis/erc20'
import { CERC20 } from '../abis/cErc20'
import { Comptroller } from '../abis/comptroller'
import { CRBTC } from '../abis/cRBTC'
import { CToken } from '../abis/cToken'
import { GovernorAlpha } from '../abis/governorAlpha'
import { JumpRateModelV2 } from '../abis/jumpRateModelV2'
import { Maximillion } from '../abis/maximillion'
import { PriceOracleAdapterMoc } from '../abis/priceOracleAdapterMoc'
import { PriceOracleProxy } from '../abis/priceOracleProxy'
import { RBTCMocOracle } from '../abis/rBTCMocOracle'
import { RLEN } from '../abis/rLEN'
import { RlendingLens } from '../abis/rLendingLens'
import { WhitePaperInterestRateModel } from '../abis/whitePaperInterestRateModel'
import { Multicall } from '../abis/multicall'

export const abi = {
  Erc20: Erc20,
  cErc20: CERC20,
  Comptroller: Comptroller,
  cRBTC: CRBTC,
  CToken: CToken,
  GovernorAlpha: GovernorAlpha,
  JumpRateModelV2: JumpRateModelV2,
  Maximillion: Maximillion,
  PriceOracleAdapterMoc: PriceOracleAdapterMoc,
  PriceOracleProxy: PriceOracleProxy,
  RBTCMocOracle: RBTCMocOracle,
  RLEN: RLEN,
  RlendingLens: RlendingLens,
  WhitePaperInterestRateModel: WhitePaperInterestRateModel,
  PriceFeed: ['function price(string symbol) returns (uint256)'],
  Multicall: Multicall,
}

export const constants = {
  Unitroller: 'Unitroller',
  PriceOracleProxy: 'PriceOracleProxy',
  PriceOracleAdapterRif: 'PriceOracleAdapterRif',
  PriceOracleAdapterRBTC: 'PriceOracleAdapterRBTC',
  PriceOracleAdapterUSDT: 'PriceOracleAdapterUSDT',
  Comptroller: 'Comptroller',
  JumpRateModelV2: 'JumpRateModelV2',
  WhitePaperInterestRateModel: 'WhitePaperInterestRateModel',
  RlendingLens: 'RlendingLens',
  crUSDT: 'crUSDT',
  cRIF: 'cRIF',
  cRBTC: 'cRBTC',
  RLEN: 'RLEN',
  MaximillionAddress: 'MaximillionAddress',
  RBTCMocOracle: 'RBTCMocOracle',
  RIFMocOracle: 'RIFMocOracle',
  USDTOracle: 'USDTOracle',
  RIF: 'RIF',
  RBTC: 'RBTC',
  rUSDT: 'rUSDT',
  Multicall: 'Multicall',
  PriceOracleAdapterMoc: 'PriceOracleAdapterMoc',
}

export const address = {
  31: {
    // rsk testnet deployed contracts
    Unitroller: '0x3a983c7597b3ac4fbc3e0cf484d7631d70d04c05',
    PriceOracleProxy: '0xbe898c9fc63c0185bc6e403e7b9c12e341a60aa7',
    PriceOracleAdapterRif: '0x5a9003e5f443607b7e0491dc27cad6796d309055',
    PriceOracleAdapterUSDT: '0x08c2feb0352ed646ea48e7e1874c6f2e4a934dad',
    PriceOracleAdapterRBTC: '0xc02c09c578ae2680796e33f6662b779580cd84b6',
    RlendingLens: '0xef9a1856f3cd3b5da7104524065a3d6cc9b7a4b3',
    crUSDT: '0xfd09f3349fdab173d162cd0e4669b591ed5a78fb',
    cRIF: '0x4664d4cbd5104a0e974354724cbc8e0d9bd1aca3',
    cRBTC: '0xc19f0882bf318c9f8767c7d520018888e878417b',
    RLEN: '0xcd87f7a5b353ff167a8543908649518a0c3454c1',
    MaximillionAddress: '0x0b33fa12e3363a8cb22dc8c53a1cccb6267bea6a',
    RBTCMocOracle: '0x26a00af444928d689ddec7b4d17c0e4a8c9d407d',
    RIFMocOracle: '0x9d4b2c05818a0086e641437fcb64ab6098c7bbec',
    USDTOracle: '0xc52c19df35a3e7cae0871ee15e4e3fb58ffbfee4',
    RIF: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    rUSDT: '0x4cfe225ce54c6609a525768b13f7d87432358c57',
    Multicall: '0x4eeebb5580769ba6d26bfd07be636300076d1831', // https://github.com/Think-and-Dev/multicall
  },
  30: {
    Unitroller: '0x57f3edae1d2a109f0d5e4e6269aca2f532cdbaaa',
    PriceOracleProxy: '0x38273146634d1f1805cb11a7ae70c7f4818ee69c',
    PriceOracleAdapterRif: '0x3f0c80c7fa4d313037a77d9e5d2070be2c8ea19d',
    PriceOracleAdapterUSDT: '0x6d4174b7290d207c5631e4da6e9a0f1e3acd7411',
    PriceOracleAdapterRBTC: '0xbc4a94b0e07a8a453d382747741d4652a0d0bcbf',
    RlendingLens: '0xbd190212b60323e8756324fd5aaa448ddb50ab6a',
    crUSDT: '0xd256c121a507cadd2687599e27fa45e31b7c3199',
    cRIF: '0xb7ff2c56c897562c0aa6747d2679d35f5e937492',
    cRBTC: '0x872664a885a1995d754e3666a23fad5c801401c4',
    RLEN: '0x4f6b4d3af154d5f1ce200b97051a39b77e99f1f9',
    MaximillionAddress: '0x7a1834092a00eacfe5292418a83f2dde4dcd9b97',
    RBTCMocOracle: '0x7b19bb8e6c5188ec483b784d6fb5d807a77b21bf',
    RIFMocOracle: '0x504efcadfb020d6bbaec8a5c5bb21453719d0e00',
    USDTOracle: '0x7faf361a1ff5404f2e7a9bf44b94c95b61b0749b',
    RIF: '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5',
    rUSDT: '0xef213441a85df4d7acbdae0cf78004e1e486bb96',
    Multicall: '0x4eeebb5580769ba6d26bfd07be636300076d1831', // https://github.com/Think-and-Dev/multicall
  },
}

export const cTokens = ['cRBTC', 'cRIF', 'crUSDT']
export const underlyings = ['RBTC', 'RIF', 'rUSDT']

// additional assets supported by the open price feed
export const opfAssets = ['RBTC', 'RIF', 'rUSDT']

export const decimals = {
  RBTC: 18,
  cRBTC: 8,
  RIF: 18,
  cRIF: 8,
  RLEN: 18,
  crUSDT: 8,
  rUSDT: 18,
}
export const percentageOfHealthToBorrow = 0.01

export const cTokensDetails = [
  {
    symbol: 'cRBTC',
    name: 'cToken rLending RBTC',
    decimals: decimals.cRBTC,
    underlying: { symbol: 'RBTC', name: 'RSK Smart Bitcoin', decimals: decimals.RBTC },
    logo: 'rbtc',
    adapter: 'PriceOracleAdapterRBTC',
    interestRateModel: 'WhitePaperInterestRateModel',
    //this is use to substract the calculate liquidated amount (closed Factor * borrow borrower), because this calculate have a insignificant (but precius) % of  lost
    liquidate: {
      sub: 0.000001,
      decimalToFix: 8,
    },
  },
  {
    symbol: 'cRIF',
    name: 'cToken rLending RIF',
    decimals: decimals.cRIF,
    underlying: { symbol: 'RIF', name: 'RSK Infrastructure Token', decimals: decimals.RIF },
    logo: 'rif',
    adapter: 'PriceOracleAdapterRif',
    interestRateModel: 'WhitePaperInterestRateModel',
    //this is use to substract the calculate liquidated amount (closed Factor * borrow borrower), because this calculate have a insignificant (but precius) % of  lost
    liquidate: {
      sub: 0.001,
      decimalToFix: 6,
    },
  },
  {
    symbol: 'crUSDT',
    name: 'cToken rLending rUSDT',
    decimals: decimals.crUSDT,
    underlying: { symbol: 'rUSDT', name: 'Tether USD', decimals: decimals.rUSDT },
    logo: 'usdt',
    adapter: 'PriceOracleAdapterUSDT',
    interestRateModel: 'JumpRateModelV2',
    //this is use to substract the calculate liquidated amount (closed Factor * borrow borrower), because this calculate have a insignificant (but precius) % of  lost
    liquidate: {
      sub: 0.0001,
      decimalToFix: 6,
    },
  },
]

export const errorCodes = {
  comptroller: {
    codes: {
      0: { error: 'NO_ERROR', description: 'Not a failure.', hint: '' },
      1: {
        error: 'UNAUTHORIZED',
        description: 'The sender is not authorized to perform this action.',
        hint: '',
      },
      2: {
        error: 'COMPTROLLER_MISMATCH',
        description: 'Liquidation cannot be performed in markets with different comptrollers.',
        hint: '',
      },
      3: {
        error: 'INSUFFICIENT_SHORTFALL',
        description: 'The account does not have sufficient shortfall to perform this action.',
        hint: '',
      },
      4: {
        error: 'INSUFFICIENT_LIQUIDITY',
        description: 'The account does not have sufficient liquidity to perform this action.',
        hint: '',
      },
      5: { error: 'INVALID_CLOSE_FACTOR', description: 'The close factor is not valid.', hint: '' },
      6: {
        error: 'INVALID_COLLATERAL_FACTOR',
        description: 'The collateral factor is not valid.',
        hint: '',
      },
      7: {
        error: 'INVALID_LIQUIDATION_INCENTIVE',
        description: 'The liquidation incentive is invalid.',
        hint: '',
      },
      8: {
        error: 'MARKET_NOT_ENTERED',
        description: 'The market has not been entered by the account.',
        hint: '',
      },
      9: {
        error: 'MARKET_NOT_LISTED',
        description: 'The market is not currently listed by the comptroller.',
        hint: '',
      },
      10: {
        error: 'MARKET_ALREADY_LISTED',
        description: 'An admin tried to list the same market more than once.',
        hint: '',
      },
      11: { error: 'MATH_ERROR', description: 'A math calculation error occurred.', hint: '' },
      12: {
        error: 'NONZERO_BORROW_BALANCE',
        description: 'The action cannot be performed since the account carries a borrow balance.',
        hint: '',
      },
      13: {
        error: 'PRICE_ERROR',
        description: 'The comptroller could not obtain a required price of an asset.',
        hint: '',
      },
      14: {
        error: 'REJECTION',
        description: 'The comptroller rejects the action requested by the market.',
        hint: '',
      },
      15: {
        error: 'SNAPSHOT_ERROR',
        description:
          'The comptroller could not get the account borrows and exchange rate from the market.',
        hint: '',
      },
      16: {
        error: 'TOO_MANY_ASSETS',
        description: 'Attempted to enter more markets than are currently supported.',
        hint: '',
      },
      17: {
        error: 'TOO_MUCH_REPAY',
        description: 'Attempted to repay more than is allowed by the protocol.',
        hint: '',
      },
    },
    info: {
      0: { error: 'ACCEPT_ADMIN_PENDING_ADMIN_CHECK', description: '', hint: '' },
      1: { error: 'ACCEPT_PENDING_IMPLEMENTATION_ADDRESS_CHECK', description: '', hint: '' },
      2: { error: 'EXIT_MARKET_BALANCE_OWED', description: '', hint: '' },
      3: { error: 'EXIT_MARKET_REJECTION', description: '', hint: '' },
      4: { error: 'SET_CLOSE_FACTOR_OWNER_CHECK', description: '', hint: '' },
      5: { error: 'SET_CLOSE_FACTOR_VALIDATION', description: '', hint: '' },
      6: { error: 'SET_COLLATERAL_FACTOR_OWNER_CHECK', description: '', hint: '' },
      7: { error: 'SET_COLLATERAL_FACTOR_NO_EXISTS', description: '', hint: '' },
      8: { error: 'SET_COLLATERAL_FACTOR_VALIDATION', description: '', hint: '' },
      9: { error: 'SET_COLLATERAL_FACTOR_WITHOUT_PRICE', description: '', hint: '' },
      10: { error: 'SET_IMPLEMENTATION_OWNER_CHECK', description: '', hint: '' },
      11: { error: 'SET_LIQUIDATION_INCENTIVE_OWNER_CHECK', description: '', hint: '' },
      12: { error: 'SET_LIQUIDATION_INCENTIVE_VALIDATION', description: '', hint: '' },
      13: { error: 'SET_MAX_ASSETS_OWNER_CHECK', description: '', hint: '' },
      14: { error: 'SET_PENDING_ADMIN_OWNER_CHECK', description: '', hint: '' },
      15: { error: 'SET_PENDING_IMPLEMENTATION_OWNER_CHECK', description: '', hint: '' },
      16: { error: 'SET_PRICE_ORACLE_OWNER_CHECK', description: '', hint: '' },
      17: { error: 'SUPPORT_MARKET_EXISTS', description: '', hint: '' },
      18: { error: 'SUPPORT_MARKET_OWNER_CHECK', description: '', hint: '' },
    },
  },
}
