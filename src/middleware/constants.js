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

// Publicly revealed on the parent class
export const constants = {
  Unitroller: 'Unitroller',
  MultiSigWallet: 'MultiSigWallet',
  PriceOracleProxy: 'PriceOracleProxy',
  'MockPriceProviderMoc Dai': 'MockPriceProviderMoc Dai',
  'PriceOracleAdapter Rif': 'PriceOracleAdapter Rif',
  'PriceOracleAdapter Dai': 'PriceOracleAdapter Dai',
  'PriceOracleAdapter RBTC': 'PriceOracleAdapter RBTC',
  Comptroller: 'Comptroller',
  JumpRateModelV2: 'JumpRateModelV2',
  WhitePaperInterestRateModel: 'WhitePaperInterestRateModel',
  RlendingLens: 'RlendingLens',
  crDAI: 'crDAI',
  cRIF: 'cRIF',
  cRBTC: 'cRBTC',
  RLEN: 'RLEN',
  MaximillionAddress: 'MaximillionAddress',
  RBTCMocOracle: 'RBTCMocOracle',
  'RIF Moc Oracle': 'RIF Moc Oracle',
  'DAI Oracle': 'DAI Oracle',
  RIF: 'RIF',
  rDAI: 'rDAI',
  RBTC: 'RBTC',
  Multicall: 'Multicall',
}

export const address = {
  31: {
    // rsk testnet deployed contracts
    Unitroller: '0x3a983c7597b3ac4fbc3e0cf484d7631d70d04c05',
    MultiSigWallet: '0x9760d4a155058f6bec8d9fd8d50222073e57083e',
    PriceOracleProxy: '0xbe898c9fc63c0185bc6e403e7b9c12e341a60aa7',
    'MockPriceProviderMoc Dai': '0xee1e9bc499242d2de09d10a1affe3a6eb687d98f',
    'PriceOracleAdapter Rif': '0x5a9003e5f443607b7e0491dc27cad6796d309055',
    'PriceOracleAdapter Dai': '0x238b2703A389D72098C0d1e76a326a2247bb5f26',
    'PriceOracleAdapter RBTC': '0xc02c09c578ae2680796e33f6662b779580cd84b6',
    Comptroller: '0x2e64b3acd75d86a8ff17b98e02dae4dcf2852a94',
    JumpRateModelV2: '0xf8b35564e85800d60043ccdde0af47ba3463b6ce',
    WhitePaperInterestRateModel: '0xa9a4da01daea36da9000f83f34691ba6132e5e87',
    RlendingLens: '0xef9a1856f3cd3b5da7104524065a3d6cc9b7a4b3',
    crDAI: '0xfe281bdfef9ecd8dad7194b13ce3896c2e0b6ae1',
    cRIF: '0x4664d4cbd5104a0e974354724cbc8e0d9bd1aca3',
    cRBTC: '0xc19f0882bf318c9f8767c7d520018888e878417b',
    RLEN: '0xcd87f7a5b353ff167a8543908649518a0c3454c1',
    MaximillionAddress: '0x0b33fa12e3363a8cb22dc8c53a1cccb6267bea6a',
    RBTCMocOracle: '0x26a00af444928d689ddec7b4d17c0e4a8c9d407d',
    'RIF Moc Oracle': '0x9d4b2c05818a0086e641437fcb64ab6098c7bbec',
    RIF: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    rDAI: '0x0d86fca9be034a363cf12c9834af08d54a10451c',
    Multicall: '0x4eeebb5580769ba6d26bfd07be636300076d1831', // https://github.com/Think-and-Dev/multicall
  },
  30: {
    /* TODO - uptate this to RSK mainnet addresses */
    Unitroller: '0x51401d51f7cfc1a91f88a973edd0762d2021bb5b',
    MultiSigWallet: '0x0fce7d2e8e0a92ba6068a54ed2a7e628ea022e72',
    PriceOracleProxy: '0x0d0006f3f700a468b6467615f2fb9efdec4e4e33',
    'MockPriceProviderMoc Dai': '0x51461e07dfb997e5fd15c1febe7a19fd931ad500',
    'PriceOracleAdapter Rif': '0x20e3996603e6c9415e56181ee55d2b8e1c423acf',
    'PriceOracleAdapter Dai': '0xa60c1a0ca1e95962cc1a77dec306545dc8475b74',
    Comptroller: '0xca8744cfaeb8ef4bc1fe5350f24058768fb78a5e',
    JumpRateModelV2: '0x5f3fd1f2f5d8f6ac902d4653e517f1731732a0b6',
    WhitePaperInterestRateModel: '0x8ac501b80a8932cfac4f0c55213b372c02631c5e',
    crDAI: '0xb386c06b1240e51f98e70e4b7d216b270b12425e',
    cRIF: '0x2b47f1b810faf99d911228a87c9c6d0d61514b9d',
    cRBTC: '0xa04bb527be81bb92b59059a45206101b2d11200d',
    RLEN: '0xcbf15821e5ecb15d46af5d98bf25b7ce49e4ebd2',
    MaximillionAddress: '0x5edd33c93086bef90692a3db1cbc51104734b851',
    'RBTC Moc Oracle': '0x26a00af444928d689ddec7b4d17c0e4a8c9d407d',
    'RIF Moc Oracle': '0x9d4b2c05818a0086e641437fcb64ab6098c7bbec',
    RIF: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    rDAI: '0x0d86fca9be034a363cf12c9834af08d54a10451c',
    Multicall: '0x4eeebb5580769ba6d26bfd07be636300076d1831', // https://github.com/Think-and-Dev/multicall
  },
}

export const cTokens = ['cRBTC', 'cRIF', 'crDAI']
export const underlyings = ['RBTC', 'RIF', 'rDAI']

// additional assets supported by the open price feed
export const opfAssets = ['RBTC', 'RIF', 'rDAI']

export const decimals = {
  rDAI: 18,
  crDAI: 8,
  RBTC: 18,
  cRBTC: 8,
  RIF: 18,
  cRIF: 8,
  RLEN: 18,
}

export const cTokensDetails = [
  {
    symbol: 'cRBTC',
    name: 'ctoken rbtc',
    decimals: decimals.cRBTC,
    underlying: { symbol: 'RBTC', name: 'RSK Smart Bitcoin', decimals: decimals.RBTC },
    logo: 'rbtc',
    //this is use to substract the calculate liquidated amount (closed Factor * borrow borrower), because this calculate have a insignificant (but precius) % of  lost
    liquidate: {
      sub: 0.000001,
      decimalToFix: 8,
    },
  },
  {
    symbol: 'cRIF',
    name: 'ctoken rLending Rif',
    decimals: decimals.cRIF,
    underlying: { symbol: 'RIF', name: 'rLending Rif', decimals: decimals.RIF },
    logo: 'rif',
    //this is use to substract the calculate liquidated amount (closed Factor * borrow borrower), because this calculate have a insignificant (but precius) % of  lost
    liquidate: {
      sub: 0.001,
      decimalToFix: 6,
    },
  },
  {
    symbol: 'crDAI',
    name: 'ctoken rLending Dai',
    decimals: decimals.crDAI,
    underlying: { symbol: 'rDAI', name: 'rLending Dai', decimals: decimals.rDAI },
    logo: 'dai',
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
