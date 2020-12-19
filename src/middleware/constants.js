// Publicly revealed on the parent class
export const constants = {
  Unitroller: 'Unitroller',
  MultiSigWallet: 'MultiSigWallet',
  PriceOracleProxy: 'PriceOracleProxy',
  'MockPriceProviderMoc Dai': 'MockPriceProviderMoc Dai',
  'PriceOracleAdapter Rif': 'PriceOracleAdapter Rif',
  'PriceOracleAdapter Dai': 'PriceOracleAdapter Dai',
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
  RIF: 'RIF',
  rDAI: 'rDAI',
  RBTC: 'RBTC'
}

export const address = {
  testnet: {
    // rsk testnet deployed contracts
    Unitroller: '0x51401d51f7cfc1a91f88a973edd0762d2021bb5b',
    MultiSigWallet: '0x0fce7d2e8e0a92ba6068a54ed2a7e628ea022e72',
    PriceOracleProxy: '0x0d0006f3f700a468b6467615f2fb9efdec4e4e33',
    'MockPriceProviderMoc Dai': '0x51461e07dfb997e5fd15c1febe7a19fd931ad500',
    'PriceOracleAdapter Rif': '0x20e3996603e6c9415e56181ee55d2b8e1c423acf',
    'PriceOracleAdapter Dai': '0xa60c1a0ca1e95962cc1a77dec306545dc8475b74',
    Comptroller: '0xca8744cfaeb8ef4bc1fe5350f24058768fb78a5e',
    JumpRateModelV2: '0x5f3fd1f2f5d8f6ac902d4653e517f1731732a0b6',
    WhitePaperInterestRateModel: '0x8ac501b80a8932cfac4f0c55213b372c02631c5e',
    RlendingLens: '0x0ad5f84880194dc283e50c1d48a29b825379f1ab',
    crDAI: '0xb386c06b1240e51f98e70e4b7d216b270b12425e',
    cRIF: '0x2b47f1b810faf99d911228a87c9c6d0d61514b9d',
    cRBTC: '0xa04bb527be81bb92b59059a45206101b2d11200d',
    RLEN: '0xcbf15821e5ecb15d46af5d98bf25b7ce49e4ebd2',
    MaximillionAddress: '0x5edd33c93086bef90692a3db1cbc51104734b851',
    RBTCMocOracle: '0x2d39cc54dc44ff27ad23a91a9b5fd750dae4b218',
    'RIF Moc Oracle': '0x9d4b2c05818a0086e641437fcb64ab6098c7bbec',
    RIF: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    rDAI: '0x0d86fca9be034a363cf12c9834af08d54a10451c'
  },
  mainnet: {
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
    'RBTC Moc Oracle': '0x2d39cc54dc44ff27ad23a91a9b5fd750dae4b218',
    'RIF Moc Oracle': '0x9d4b2c05818a0086e641437fcb64ab6098c7bbec',
    RIF: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    rDAI: '0x0d86fca9be034a363cf12c9834af08d54a10451c'
  }
}

export const abi = {
  Erc20: [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { name: '_spender', type: 'address' },
        { name: '_value', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      payable: false,
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' }
      ],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { name: '_owner', type: 'address' },
        { name: '_spender', type: 'address' }
      ],
      name: 'allowance',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      type: 'function'
    },
    { inputs: [], payable: false, type: 'constructor' },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: '_from', type: 'address' },
        { indexed: true, name: '_to', type: 'address' },
        { indexed: false, name: '_value', type: 'uint256' }
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: '_owner', type: 'address' },
        { indexed: true, name: '_spender', type: 'address' },
        { indexed: false, name: '_value', type: 'uint256' }
      ],
      name: 'Approval',
      type: 'event'
    }
  ],
  cErc20: [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x06fdde03'
    },
    {
      constant: false,
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x095ea7b3'
    },
    {
      constant: false,
      inputs: [{ name: 'repayAmount', type: 'uint256' }],
      name: 'repayBorrow',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x0e752702'
    },
    {
      constant: true,
      inputs: [],
      name: 'reserveFactorMantissa',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x173b9904'
    },
    {
      constant: false,
      inputs: [{ name: 'account', type: 'address' }],
      name: 'borrowBalanceCurrent',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x17bfdfbc'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x18160ddd'
    },
    {
      constant: true,
      inputs: [],
      name: 'exchangeRateStored',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x182df0f5'
    },
    {
      constant: false,
      inputs: [
        { name: 'src', type: 'address' },
        { name: 'dst', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x23b872dd'
    },
    {
      constant: false,
      inputs: [
        { name: 'borrower', type: 'address' },
        { name: 'repayAmount', type: 'uint256' }
      ],
      name: 'repayBorrowBehalf',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x2608f818'
    },
    {
      constant: true,
      inputs: [],
      name: 'pendingAdmin',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x26782247'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x313ce567'
    },
    {
      constant: false,
      inputs: [{ name: 'owner', type: 'address' }],
      name: 'balanceOfUnderlying',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x3af9e669'
    },
    {
      constant: true,
      inputs: [],
      name: 'getCash',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x3b1d21a2'
    },
    {
      constant: false,
      inputs: [{ name: 'newComptroller', type: 'address' }],
      name: '_setComptroller',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x4576b5db'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalBorrows',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x47bd3718'
    },
    {
      constant: true,
      inputs: [],
      name: 'comptroller',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x5fe3b567'
    },
    {
      constant: false,
      inputs: [{ name: 'reduceAmount', type: 'uint256' }],
      name: '_reduceReserves',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x601a0bf1'
    },
    {
      constant: true,
      inputs: [],
      name: 'initialExchangeRateMantissa',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x675d972c'
    },
    {
      constant: true,
      inputs: [],
      name: 'accrualBlockNumber',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x6c540baf'
    },
    {
      constant: true,
      inputs: [],
      name: 'underlying',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x6f307dc3'
    },
    {
      constant: true,
      inputs: [{ name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x70a08231'
    },
    {
      constant: false,
      inputs: [],
      name: 'totalBorrowsCurrent',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x73acee98'
    },
    {
      constant: false,
      inputs: [{ name: 'redeemAmount', type: 'uint256' }],
      name: 'redeemUnderlying',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x852a12e3'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalReserves',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x8f840ddd'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x95d89b41'
    },
    {
      constant: true,
      inputs: [{ name: 'account', type: 'address' }],
      name: 'borrowBalanceStored',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x95dd9193'
    },
    {
      constant: false,
      inputs: [{ name: 'mintAmount', type: 'uint256' }],
      name: 'mint',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xa0712d68'
    },
    {
      constant: false,
      inputs: [],
      name: 'accrueInterest',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xa6afed95'
    },
    {
      constant: false,
      inputs: [
        { name: 'dst', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xa9059cbb'
    },
    {
      constant: true,
      inputs: [],
      name: 'borrowIndex',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xaa5af0fd'
    },
    {
      constant: true,
      inputs: [],
      name: 'supplyRatePerBlock',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xae9d70b0'
    },
    {
      constant: false,
      inputs: [
        { name: 'liquidator', type: 'address' },
        { name: 'borrower', type: 'address' },
        { name: 'seizeTokens', type: 'uint256' }
      ],
      name: 'seize',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xb2a02ff1'
    },
    {
      constant: false,
      inputs: [{ name: 'newPendingAdmin', type: 'address' }],
      name: '_setPendingAdmin',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xb71d1a0c'
    },
    {
      constant: false,
      inputs: [],
      name: 'exchangeRateCurrent',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xbd6d894d'
    },
    {
      constant: true,
      inputs: [{ name: 'account', type: 'address' }],
      name: 'getAccountSnapshot',
      outputs: [
        { name: '', type: 'uint256' },
        { name: '', type: 'uint256' },
        { name: '', type: 'uint256' },
        { name: '', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xc37f68e2'
    },
    {
      constant: false,
      inputs: [{ name: 'borrowAmount', type: 'uint256' }],
      name: 'borrow',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xc5ebeaec'
    },
    {
      constant: false,
      inputs: [{ name: 'redeemTokens', type: 'uint256' }],
      name: 'redeem',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xdb006a75'
    },
    {
      constant: true,
      inputs: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' }
      ],
      name: 'allowance',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xdd62ed3e'
    },
    {
      constant: false,
      inputs: [],
      name: '_acceptAdmin',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xe9c714f2'
    },
    {
      constant: false,
      inputs: [{ name: 'newInterestRateModel', type: 'address' }],
      name: '_setInterestRateModel',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xf2b3abbd'
    },
    {
      constant: true,
      inputs: [],
      name: 'interestRateModel',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xf3fdb15a'
    },
    {
      constant: false,
      inputs: [
        { name: 'borrower', type: 'address' },
        { name: 'repayAmount', type: 'uint256' },
        { name: 'cTokenCollateral', type: 'address' }
      ],
      name: 'liquidateBorrow',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xf5e3c462'
    },
    {
      constant: true,
      inputs: [],
      name: 'admin',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xf851a440'
    },
    {
      constant: true,
      inputs: [],
      name: 'borrowRatePerBlock',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xf8f9da28'
    },
    {
      constant: false,
      inputs: [{ name: 'newReserveFactorMantissa', type: 'uint256' }],
      name: '_setReserveFactor',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xfca7820b'
    },
    {
      constant: true,
      inputs: [],
      name: 'isCToken',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xfe9c44ae'
    },
    {
      inputs: [
        { name: 'underlying_', type: 'address' },
        { name: 'comptroller_', type: 'address' },
        { name: 'interestRateModel_', type: 'address' },
        { name: 'initialExchangeRateMantissa_', type: 'uint256' },
        { name: 'name_', type: 'string' },
        { name: 'symbol_', type: 'string' },
        { name: 'decimals_', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
      signature: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'interestAccumulated', type: 'uint256' },
        { indexed: false, name: 'borrowIndex', type: 'uint256' },
        { indexed: false, name: 'totalBorrows', type: 'uint256' }
      ],
      name: 'AccrueInterest',
      type: 'event',
      signature: '0x875352fb3fadeb8c0be7cbbe8ff761b308fa7033470cd0287f02f3436fd76cb9'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'minter', type: 'address' },
        { indexed: false, name: 'mintAmount', type: 'uint256' },
        { indexed: false, name: 'mintTokens', type: 'uint256' }
      ],
      name: 'Mint',
      type: 'event',
      signature: '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'redeemer', type: 'address' },
        { indexed: false, name: 'redeemAmount', type: 'uint256' },
        { indexed: false, name: 'redeemTokens', type: 'uint256' }
      ],
      name: 'Redeem',
      type: 'event',
      signature: '0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'borrower', type: 'address' },
        { indexed: false, name: 'borrowAmount', type: 'uint256' },
        { indexed: false, name: 'accountBorrows', type: 'uint256' },
        { indexed: false, name: 'totalBorrows', type: 'uint256' }
      ],
      name: 'Borrow',
      type: 'event',
      signature: '0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'payer', type: 'address' },
        { indexed: false, name: 'borrower', type: 'address' },
        { indexed: false, name: 'repayAmount', type: 'uint256' },
        { indexed: false, name: 'accountBorrows', type: 'uint256' },
        { indexed: false, name: 'totalBorrows', type: 'uint256' }
      ],
      name: 'RepayBorrow',
      type: 'event',
      signature: '0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'liquidator', type: 'address' },
        { indexed: false, name: 'borrower', type: 'address' },
        { indexed: false, name: 'repayAmount', type: 'uint256' },
        { indexed: false, name: 'cTokenCollateral', type: 'address' },
        { indexed: false, name: 'seizeTokens', type: 'uint256' }
      ],
      name: 'LiquidateBorrow',
      type: 'event',
      signature: '0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'oldPendingAdmin', type: 'address' },
        { indexed: false, name: 'newPendingAdmin', type: 'address' }
      ],
      name: 'NewPendingAdmin',
      type: 'event',
      signature: '0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'oldAdmin', type: 'address' },
        { indexed: false, name: 'newAdmin', type: 'address' }
      ],
      name: 'NewAdmin',
      type: 'event',
      signature: '0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'oldComptroller', type: 'address' },
        { indexed: false, name: 'newComptroller', type: 'address' }
      ],
      name: 'NewComptroller',
      type: 'event',
      signature: '0x7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'oldInterestRateModel', type: 'address' },
        { indexed: false, name: 'newInterestRateModel', type: 'address' }
      ],
      name: 'NewMarketInterestRateModel',
      type: 'event',
      signature: '0xedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f926'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'oldReserveFactorMantissa', type: 'uint256' },
        { indexed: false, name: 'newReserveFactorMantissa', type: 'uint256' }
      ],
      name: 'NewReserveFactor',
      type: 'event',
      signature: '0xaaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'admin', type: 'address' },
        { indexed: false, name: 'reduceAmount', type: 'uint256' },
        { indexed: false, name: 'newTotalReserves', type: 'uint256' }
      ],
      name: 'ReservesReduced',
      type: 'event',
      signature: '0x3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, name: 'error', type: 'uint256' },
        { indexed: false, name: 'info', type: 'uint256' },
        { indexed: false, name: 'detail', type: 'uint256' }
      ],
      name: 'Failure',
      type: 'event',
      signature: '0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'from', type: 'address' },
        { indexed: true, name: 'to', type: 'address' },
        { indexed: false, name: 'amount', type: 'uint256' }
      ],
      name: 'Transfer',
      type: 'event',
      signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'owner', type: 'address' },
        { indexed: true, name: 'spender', type: 'address' },
        { indexed: false, name: 'amount', type: 'uint256' }
      ],
      name: 'Approval',
      type: 'event',
      signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    }
  ],
  cRBTC: [
    {
      inputs: [
        { internalType: 'contract ComptrollerInterface', name: 'comptroller_', type: 'address' },
        { internalType: 'contract InterestRateModel', name: 'interestRateModel_', type: 'address' },
        { internalType: 'uint256', name: 'initialExchangeRateMantissa_', type: 'uint256' },
        { internalType: 'string', name: 'name_', type: 'string' },
        { internalType: 'string', name: 'symbol_', type: 'string' },
        { internalType: 'uint8', name: 'decimals_', type: 'uint8' },
        { internalType: 'address payable', name: 'admin_', type: 'address' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'cashPrior',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'interestAccumulated',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'borrowIndex',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalBorrows',
          type: 'uint256',
        },
      ],
      name: 'AccrueInterest',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'borrowAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'accountBorrows',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalBorrows',
          type: 'uint256',
        },
      ],
      name: 'Borrow',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'error',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'info',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'detail',
          type: 'uint256',
        },
      ],
      name: 'Failure',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'liquidator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'repayAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'cTokenCollateral',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'seizeTokens',
          type: 'uint256',
        },
      ],
      name: 'LiquidateBorrow',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintTokens',
          type: 'uint256',
        },
      ],
      name: 'Mint',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldAdmin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newAdmin',
          type: 'address',
        },
      ],
      name: 'NewAdmin',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract ComptrollerInterface',
          name: 'oldComptroller',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'contract ComptrollerInterface',
          name: 'newComptroller',
          type: 'address'
        }
      ],
      name: 'NewComptroller',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract InterestRateModel',
          name: 'oldInterestRateModel',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'contract InterestRateModel',
          name: 'newInterestRateModel',
          type: 'address'
        }
      ],
      name: 'NewMarketInterestRateModel',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldPendingAdmin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newPendingAdmin',
          type: 'address',
        },
      ],
      name: 'NewPendingAdmin',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldReserveFactorMantissa',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newReserveFactorMantissa',
          type: 'uint256'
        }
      ],
      name: 'NewReserveFactor',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'redeemer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'redeemAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'redeemTokens',
          type: 'uint256',
        },
      ],
      name: 'Redeem',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'payer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'repayAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'accountBorrows',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalBorrows',
          type: 'uint256',
        },
      ],
      name: 'RepayBorrow',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'benefactor',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'addAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotalReserves',
          type: 'uint256',
        },
      ],
      name: 'ReservesAdded',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'admin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'reduceAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotalReserves',
          type: 'uint256',
        },
      ],
      name: 'ReservesReduced',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event'
    },
    { payable: true, stateMutability: 'payable', type: 'fallback' },
    {
      constant: false,
      inputs: [],
      name: '_acceptAdmin',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'reduceAmount', type: 'uint256' }],
      name: '_reduceReserves',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract ComptrollerInterface', name: 'newComptroller', type: 'address' }
      ],
      name: '_setComptroller',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'contract InterestRateModel',
          name: 'newInterestRateModel',
          type: 'address'
        }
      ],
      name: '_setInterestRateModel',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address payable', name: 'newPendingAdmin', type: 'address' }],
      name: '_setPendingAdmin',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'newReserveFactorMantissa', type: 'uint256' }],
      name: '_setReserveFactor',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'accrualBlockNumber',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'accrueInterest',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'admin',
      outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' }
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'balanceOfUnderlying',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'borrowAmount', type: 'uint256' }],
      name: 'borrow',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'borrowBalanceCurrent',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'borrowBalanceStored',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'borrowIndex',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'borrowRatePerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'comptroller',
      outputs: [{ internalType: 'contract ComptrollerInterface', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'exchangeRateCurrent',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'exchangeRateStored',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'getAccountSnapshot',
      outputs: [
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getCash',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract ComptrollerInterface', name: 'comptroller_', type: 'address' },
        { internalType: 'contract InterestRateModel', name: 'interestRateModel_', type: 'address' },
        { internalType: 'uint256', name: 'initialExchangeRateMantissa_', type: 'uint256' },
        { internalType: 'string', name: 'name_', type: 'string' },
        { internalType: 'string', name: 'symbol_', type: 'string' },
        { internalType: 'uint8', name: 'decimals_', type: 'uint8' }
      ],
      name: 'initialize',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'interestRateModel',
      outputs: [{ internalType: 'contract InterestRateModel', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'isCToken',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'contract CToken', name: 'cTokenCollateral', type: 'address' }
      ],
      name: 'liquidateBorrow',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'mint',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'pendingAdmin',
      outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'redeemTokens', type: 'uint256' }],
      name: 'redeem',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'redeemAmount', type: 'uint256' }],
      name: 'redeemUnderlying',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'repayBorrow',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'borrower', type: 'address' }],
      name: 'repayBorrowBehalf',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'reserveFactorMantissa',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'liquidator', type: 'address' },
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'uint256', name: 'seizeTokens', type: 'uint256' }
      ],
      name: 'seize',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'supplyRatePerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalBorrows',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'totalBorrowsCurrent',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalReserves',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'dst', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'src', type: 'address' },
        { internalType: 'address', name: 'dst', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ],
  RLEN: [
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
      signature: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
      signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'delegator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'fromDelegate',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'toDelegate',
          type: 'address',
        },
      ],
      name: 'DelegateChanged',
      type: 'event',
      signature: '0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'delegate',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'previousBalance',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newBalance',
          type: 'uint256',
        },
      ],
      name: 'DelegateVotesChanged',
      type: 'event',
      signature: '0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
      signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    },
    {
      constant: true,
      inputs: [],
      name: 'DELEGATION_TYPEHASH',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xe7a324dc'
    },
    {
      constant: true,
      inputs: [],
      name: 'DOMAIN_TYPEHASH',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x20606b70'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' }
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xdd62ed3e'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'rawAmount', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x095ea7b3'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x70a08231'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint32', name: '', type: 'uint32' }
      ],
      name: 'checkpoints',
      outputs: [
        { internalType: 'uint32', name: 'fromBlock', type: 'uint32' },
        { internalType: 'uint96', name: 'votes', type: 'uint96' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xf1127ed8'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x313ce567'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'delegatee', type: 'address' }],
      name: 'delegate',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x5c19a95c'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'delegatee', type: 'address' },
        { internalType: 'uint256', name: 'nonce', type: 'uint256' },
        { internalType: 'uint256', name: 'expiry', type: 'uint256' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' }
      ],
      name: 'delegateBySig',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xc3cda520'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'delegates',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x587cde1e'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'getCurrentVotes',
      outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xb4b5ea57'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'uint256', name: 'blockNumber', type: 'uint256' }
      ],
      name: 'getPriorVotes',
      outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x782d6fe1'
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x06fdde03'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'nonces',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x7ecebe00'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'numCheckpoints',
      outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x6fcfff45'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x95d89b41'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x18160ddd'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'dst', type: 'address' },
        { internalType: 'uint256', name: 'rawAmount', type: 'uint256' }
      ],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xa9059cbb'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'src', type: 'address' },
        { internalType: 'address', name: 'dst', type: 'address' },
        { internalType: 'uint256', name: 'rawAmount', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x23b872dd'
    }
  ],
  GovernorAlpha: [
    {
      inputs: [
        { internalType: 'address', name: 'timelock_', type: 'address' },
        { internalType: 'address', name: 'comp_', type: 'address' },
        { internalType: 'address', name: 'guardian_', type: 'address' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
      signature: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256'
        }
      ],
      name: 'ProposalCanceled',
      type: 'event',
      signature: '0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'proposer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address[]',
          name: 'targets',
          type: 'address[]',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'values',
          type: 'uint256[]',
        },
        {
          indexed: false,
          internalType: 'string[]',
          name: 'signatures',
          type: 'string[]',
        },
        {
          indexed: false,
          internalType: 'bytes[]',
          name: 'calldatas',
          type: 'bytes[]',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'startBlock',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'endBlock',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
      ],
      name: 'ProposalCreated',
      type: 'event',
      signature: '0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256'
        }
      ],
      name: 'ProposalExecuted',
      type: 'event',
      signature: '0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'eta',
          type: 'uint256',
        },
      ],
      name: 'ProposalQueued',
      type: 'event',
      signature: '0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'voter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'support',
          type: 'bool',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'votes',
          type: 'uint256',
        },
      ],
      name: 'VoteCast',
      type: 'event',
      signature: '0x877856338e13f63d0c36822ff0ef736b80934cd90574a3a5bc9262c39d217c46'
    },
    {
      constant: true,
      inputs: [],
      name: 'BALLOT_TYPEHASH',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xdeaaa7cc'
    },
    {
      constant: true,
      inputs: [],
      name: 'DOMAIN_TYPEHASH',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x20606b70'
    },
    {
      constant: false,
      inputs: [],
      name: '__abdicate',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x760fbc13'
    },
    {
      constant: false,
      inputs: [],
      name: '__acceptAdmin',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xb9a61961'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'newPendingAdmin', type: 'address' },
        { internalType: 'uint256', name: 'eta', type: 'uint256' }
      ],
      name: '__executeSetTimelockPendingAdmin',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x21f43e42'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'newPendingAdmin', type: 'address' },
        { internalType: 'uint256', name: 'eta', type: 'uint256' }
      ],
      name: '__queueSetTimelockPendingAdmin',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x91500671'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
      name: 'cancel',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x40e58ee5'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
        { internalType: 'bool', name: 'support', type: 'bool' }
      ],
      name: 'castVote',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x15373e3d'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
        { internalType: 'bool', name: 'support', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' }
      ],
      name: 'castVoteBySig',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x4634c61f'
    },
    {
      constant: true,
      inputs: [],
      name: 'comp',
      outputs: [{ internalType: 'contract CompInterface', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x109d0af8'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
      name: 'execute',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
      signature: '0xfe0d94c1'
    },
    {
      constant: true,
      inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
      name: 'getActions',
      outputs: [
        { internalType: 'address[]', name: 'targets', type: 'address[]' },
        { internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
        { internalType: 'string[]', name: 'signatures', type: 'string[]' },
        { internalType: 'bytes[]', name: 'calldatas', type: 'bytes[]' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x328dd982'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
        { internalType: 'address', name: 'voter', type: 'address' }
      ],
      name: 'getReceipt',
      outputs: [
        {
          components: [
            { internalType: 'bool', name: 'hasVoted', type: 'bool' },
            { internalType: 'bool', name: 'support', type: 'bool' },
            { internalType: 'uint96', name: 'votes', type: 'uint96' }
          ],
          internalType: 'struct GovernorAlpha.Receipt',
          name: '',
          type: 'tuple'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xe23a9a52'
    },
    {
      constant: true,
      inputs: [],
      name: 'guardian',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x452a9320'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'latestProposalIds',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x17977c61'
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x06fdde03'
    },
    {
      constant: true,
      inputs: [],
      name: 'proposalCount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xda35c664'
    },
    {
      constant: true,
      inputs: [],
      name: 'proposalMaxOperations',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'pure',
      type: 'function',
      signature: '0x7bdbe4d0'
    },
    {
      constant: true,
      inputs: [],
      name: 'proposalThreshold',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'pure',
      type: 'function',
      signature: '0xb58131b0'
    },
    {
      constant: true,
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'proposals',
      outputs: [
        { internalType: 'uint256', name: 'id', type: 'uint256' },
        { internalType: 'address', name: 'proposer', type: 'address' },
        { internalType: 'uint256', name: 'eta', type: 'uint256' },
        { internalType: 'uint256', name: 'startBlock', type: 'uint256' },
        { internalType: 'uint256', name: 'endBlock', type: 'uint256' },
        { internalType: 'uint256', name: 'forVotes', type: 'uint256' },
        { internalType: 'uint256', name: 'againstVotes', type: 'uint256' },
        { internalType: 'bool', name: 'canceled', type: 'bool' },
        { internalType: 'bool', name: 'executed', type: 'bool' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x013cf08b'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address[]', name: 'targets', type: 'address[]' },
        { internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
        { internalType: 'string[]', name: 'signatures', type: 'string[]' },
        { internalType: 'bytes[]', name: 'calldatas', type: 'bytes[]' },
        { internalType: 'string', name: 'description', type: 'string' }
      ],
      name: 'propose',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xda95691a'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
      name: 'queue',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0xddf0b009'
    },
    {
      constant: true,
      inputs: [],
      name: 'quorumVotes',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'pure',
      type: 'function',
      signature: '0x24bc1a64'
    },
    {
      constant: true,
      inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
      name: 'state',
      outputs: [{ internalType: 'enum GovernorAlpha.ProposalState', name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0x3e4f49e6'
    },
    {
      constant: true,
      inputs: [],
      name: 'timelock',
      outputs: [{ internalType: 'contract TimelockInterface', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
      signature: '0xd33219b4'
    },
    {
      constant: true,
      inputs: [],
      name: 'votingDelay',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'pure',
      type: 'function',
      signature: '0x3932abb1'
    },
    {
      constant: true,
      inputs: [],
      name: 'votingPeriod',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'pure',
      type: 'function',
      signature: '0x02a251a3'
    }
  ],
  Comptroller: [
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'action',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'pauseState',
          type: 'bool',
        },
      ],
      name: 'ActionPaused',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newSpeed',
          type: 'uint256',
        },
      ],
      name: 'CompSpeedUpdated',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'compDelta',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'compBorrowIndex',
          type: 'uint256',
        },
      ],
      name: 'DistributedBorrowerComp',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'supplier',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'compDelta',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'compSupplyIndex',
          type: 'uint256',
        },
      ],
      name: 'DistributedSupplierComp',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'error',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'info',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'detail',
          type: 'uint256',
        },
      ],
      name: 'Failure',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'isComped',
          type: 'bool',
        },
      ],
      name: 'MarketComped',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'MarketEntered',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'MarketExited',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
      ],
      name: 'MarketListed',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newBorrowCap',
          type: 'uint256',
        },
      ],
      name: 'NewBorrowCap',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldBorrowCapGuardian',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newBorrowCapGuardian',
          type: 'address',
        },
      ],
      name: 'NewBorrowCapGuardian',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldCloseFactorMantissa',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newCloseFactorMantissa',
          type: 'uint256',
        },
      ],
      name: 'NewCloseFactor',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract CToken',
          name: 'cToken',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldCollateralFactorMantissa',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newCollateralFactorMantissa',
          type: 'uint256'
        }
      ],
      name: 'NewCollateralFactor',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldCompRate',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newCompRate',
          type: 'uint256',
        },
      ],
      name: 'NewCompRate',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldLiquidationIncentiveMantissa',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newLiquidationIncentiveMantissa',
          type: 'uint256'
        }
      ],
      name: 'NewLiquidationIncentive',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldMaxAssets',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newMaxAssets',
          type: 'uint256',
        },
      ],
      name: 'NewMaxAssets',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldPauseGuardian',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newPauseGuardian',
          type: 'address',
        },
      ],
      name: 'NewPauseGuardian',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract PriceOracle',
          name: 'oldPriceOracle',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'contract PriceOracle',
          name: 'newPriceOracle',
          type: 'address'
        }
      ],
      name: 'NewPriceOracle',
      type: 'event'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address[]', name: 'cTokens', type: 'address[]' }],
      name: '_addCompMarkets',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'contract Unitroller', name: 'unitroller', type: 'address' }],
      name: '_become',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: '_borrowGuardianPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'cToken', type: 'address' }],
      name: '_dropCompMarket',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: '_mintGuardianPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'newBorrowCapGuardian', type: 'address' }],
      name: '_setBorrowCapGuardian',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract CToken', name: 'cToken', type: 'address' },
        { internalType: 'bool', name: 'state', type: 'bool' }
      ],
      name: '_setBorrowPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'newCloseFactorMantissa', type: 'uint256' }],
      name: '_setCloseFactor',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract CToken', name: 'cToken', type: 'address' },
        { internalType: 'uint256', name: 'newCollateralFactorMantissa', type: 'uint256' }
      ],
      name: '_setCollateralFactor',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'compRate_', type: 'uint256' }],
      name: '_setCompRate',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'uint256', name: 'newLiquidationIncentiveMantissa', type: 'uint256' }
      ],
      name: '_setLiquidationIncentive',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract CToken[]', name: 'cTokens', type: 'address[]' },
        { internalType: 'uint256[]', name: 'newBorrowCaps', type: 'uint256[]' }
      ],
      name: '_setMarketBorrowCaps',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'newMaxAssets', type: 'uint256' }],
      name: '_setMaxAssets',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract CToken', name: 'cToken', type: 'address' },
        { internalType: 'bool', name: 'state', type: 'bool' }
      ],
      name: '_setMintPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'newPauseGuardian', type: 'address' }],
      name: '_setPauseGuardian',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'contract PriceOracle', name: 'newOracle', type: 'address' }],
      name: '_setPriceOracle',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'bool', name: 'state', type: 'bool' }],
      name: '_setSeizePaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'bool', name: 'state', type: 'bool' }],
      name: '_setTransferPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'contract CToken', name: 'cToken', type: 'address' }],
      name: '_supportMarket',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'accountAssets',
      outputs: [{ internalType: 'contract CToken', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'admin',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'allMarkets',
      outputs: [{ internalType: 'contract CToken', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'cToken', type: 'address' },
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'uint256', name: 'borrowAmount', type: 'uint256' }
      ],
      name: 'borrowAllowed',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'borrowCapGuardian',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'borrowCaps',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'borrowGuardianPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'borrowVerify',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'contract CToken', name: 'cToken', type: 'address' }
      ],
      name: 'checkMembership',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'holder', type: 'address' },
        { internalType: 'contract CToken[]', name: 'cTokens', type: 'address[]' }
      ],
      name: 'claimComp',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address[]', name: 'holders', type: 'address[]' },
        { internalType: 'contract CToken[]', name: 'cTokens', type: 'address[]' },
        { internalType: 'bool', name: 'borrowers', type: 'bool' },
        { internalType: 'bool', name: 'suppliers', type: 'bool' }
      ],
      name: 'claimComp',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'holder', type: 'address' }],
      name: 'claimComp',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'closeFactorMantissa',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'compAccrued',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'compBorrowState',
      outputs: [
        { internalType: 'uint224', name: 'index', type: 'uint224' },
        { internalType: 'uint32', name: 'block', type: 'uint32' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' }
      ],
      name: 'compBorrowerIndex',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'compClaimThreshold',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'compInitialIndex',
      outputs: [{ internalType: 'uint224', name: '', type: 'uint224' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'compRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'compSpeeds',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' }
      ],
      name: 'compSupplierIndex',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'compSupplyState',
      outputs: [
        { internalType: 'uint224', name: 'index', type: 'uint224' },
        { internalType: 'uint32', name: 'block', type: 'uint32' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'comptrollerImplementation',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address[]', name: 'cTokens', type: 'address[]' }],
      name: 'enterMarkets',
      outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'cTokenAddress', type: 'address' }],
      name: 'exitMarket',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'getAccountLiquidity',
      outputs: [
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getAllMarkets',
      outputs: [{ internalType: 'contract CToken[]', name: '', type: 'address[]' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'getAssetsIn',
      outputs: [{ internalType: 'contract CToken[]', name: '', type: 'address[]' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getBlockNumber',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getCompAddress',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'address', name: 'cTokenModify', type: 'address' },
        { internalType: 'uint256', name: 'redeemTokens', type: 'uint256' },
        { internalType: 'uint256', name: 'borrowAmount', type: 'uint256' }
      ],
      name: 'getHypotheticalAccountLiquidity',
      outputs: [
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'isComptroller',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'cTokenBorrowed', type: 'address' },
        { internalType: 'address', name: 'cTokenCollateral', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'uint256', name: 'repayAmount', type: 'uint256' }
      ],
      name: 'liquidateBorrowAllowed',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'liquidateBorrowVerify',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: 'cTokenBorrowed', type: 'address' },
        { internalType: 'address', name: 'cTokenCollateral', type: 'address' },
        { internalType: 'uint256', name: 'actualRepayAmount', type: 'uint256' }
      ],
      name: 'liquidateCalculateSeizeTokens',
      outputs: [
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'liquidationIncentiveMantissa',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'markets',
      outputs: [
        { internalType: 'bool', name: 'isListed', type: 'bool' },
        { internalType: 'uint256', name: 'collateralFactorMantissa', type: 'uint256' },
        { internalType: 'bool', name: 'isComped', type: 'bool' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'maxAssets',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'cToken', type: 'address' },
        { internalType: 'address', name: 'minter', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'mintAllowed',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'mintGuardianPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'mintVerify',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'oracle',
      outputs: [{ internalType: 'contract PriceOracle', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'pauseGuardian',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'pendingAdmin',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'pendingComptrollerImplementation',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'rLenAddress',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'cToken', type: 'address' },
        { internalType: 'address', name: 'redeemer', type: 'address' },
        { internalType: 'uint256', name: 'redeemTokens', type: 'uint256' }
      ],
      name: 'redeemAllowed',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: 'redeemAmount', type: 'uint256' },
        { internalType: 'uint256', name: 'redeemTokens', type: 'uint256' }
      ],
      name: 'redeemVerify',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'refreshCompSpeeds',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'cToken', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'repayBorrowAllowed',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'repayBorrowVerify',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'cTokenCollateral', type: 'address' },
        { internalType: 'address', name: 'cTokenBorrowed', type: 'address' },
        { internalType: 'address', name: 'liquidator', type: 'address' },
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'seizeAllowed',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'seizeGuardianPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'seizeVerify',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'rLenAddress_', type: 'address' }],
      name: 'setCompAddress',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'cToken', type: 'address' },
        { internalType: 'address', name: 'src', type: 'address' },
        { internalType: 'address', name: 'dst', type: 'address' },
        { internalType: 'uint256', name: 'transferTokens', type: 'uint256' }
      ],
      name: 'transferAllowed',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'transferGuardianPaused',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      name: 'transferVerify',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ],
  PriceFeed: ['function price(string symbol) returns (uint256)'],
  RlendingLens: [
    {
      constant: false,
      inputs: [
        { internalType: 'contract CToken', name: 'cToken', type: 'address' },
        { internalType: 'address payable', name: 'account', type: 'address' }
      ],
      name: 'cTokenBalances',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'cToken', type: 'address' },
            { internalType: 'uint256', name: 'balanceOf', type: 'uint256' },
            { internalType: 'uint256', name: 'borrowBalanceCurrent', type: 'uint256' },
            { internalType: 'uint256', name: 'balanceOfUnderlying', type: 'uint256' },
            { internalType: 'uint256', name: 'tokenBalance', type: 'uint256' },
            { internalType: 'uint256', name: 'tokenAllowance', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.CTokenBalances',
          name: '',
          type: 'tuple'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract CToken[]', name: 'cTokens', type: 'address[]' },
        { internalType: 'address payable', name: 'account', type: 'address' }
      ],
      name: 'cTokenBalancesAll',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'cToken', type: 'address' },
            { internalType: 'uint256', name: 'balanceOf', type: 'uint256' },
            { internalType: 'uint256', name: 'borrowBalanceCurrent', type: 'uint256' },
            { internalType: 'uint256', name: 'balanceOfUnderlying', type: 'uint256' },
            { internalType: 'uint256', name: 'tokenBalance', type: 'uint256' },
            { internalType: 'uint256', name: 'tokenAllowance', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.CTokenBalances[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'contract CToken', name: 'cToken', type: 'address' }],
      name: 'cTokenMetadata',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'cToken', type: 'address' },
            { internalType: 'uint256', name: 'exchangeRateCurrent', type: 'uint256' },
            { internalType: 'uint256', name: 'supplyRatePerBlock', type: 'uint256' },
            { internalType: 'uint256', name: 'borrowRatePerBlock', type: 'uint256' },
            { internalType: 'uint256', name: 'reserveFactorMantissa', type: 'uint256' },
            { internalType: 'uint256', name: 'totalBorrows', type: 'uint256' },
            { internalType: 'uint256', name: 'totalReserves', type: 'uint256' },
            { internalType: 'uint256', name: 'totalSupply', type: 'uint256' },
            { internalType: 'uint256', name: 'totalCash', type: 'uint256' },
            { internalType: 'bool', name: 'isListed', type: 'bool' },
            { internalType: 'uint256', name: 'collateralFactorMantissa', type: 'uint256' },
            { internalType: 'address', name: 'underlyingAssetAddress', type: 'address' },
            { internalType: 'uint256', name: 'cTokenDecimals', type: 'uint256' },
            { internalType: 'uint256', name: 'underlyingDecimals', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.CTokenMetadata',
          name: '',
          type: 'tuple'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'contract CToken[]', name: 'cTokens', type: 'address[]' }],
      name: 'cTokenMetadataAll',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'cToken', type: 'address' },
            { internalType: 'uint256', name: 'exchangeRateCurrent', type: 'uint256' },
            { internalType: 'uint256', name: 'supplyRatePerBlock', type: 'uint256' },
            { internalType: 'uint256', name: 'borrowRatePerBlock', type: 'uint256' },
            { internalType: 'uint256', name: 'reserveFactorMantissa', type: 'uint256' },
            { internalType: 'uint256', name: 'totalBorrows', type: 'uint256' },
            { internalType: 'uint256', name: 'totalReserves', type: 'uint256' },
            { internalType: 'uint256', name: 'totalSupply', type: 'uint256' },
            { internalType: 'uint256', name: 'totalCash', type: 'uint256' },
            { internalType: 'bool', name: 'isListed', type: 'bool' },
            { internalType: 'uint256', name: 'collateralFactorMantissa', type: 'uint256' },
            { internalType: 'address', name: 'underlyingAssetAddress', type: 'address' },
            { internalType: 'uint256', name: 'cTokenDecimals', type: 'uint256' },
            { internalType: 'uint256', name: 'underlyingDecimals', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.CTokenMetadata[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'contract CToken', name: 'cToken', type: 'address' }],
      name: 'cTokenUnderlyingPrice',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'cToken', type: 'address' },
            { internalType: 'uint256', name: 'underlyingPrice', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.CTokenUnderlyingPrice',
          name: '',
          type: 'tuple'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'contract CToken[]', name: 'cTokens', type: 'address[]' }],
      name: 'cTokenUnderlyingPriceAll',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'cToken', type: 'address' },
            { internalType: 'uint256', name: 'underlyingPrice', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.CTokenUnderlyingPrice[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'contract ComptrollerLensInterface', name: 'comptroller', type: 'address' },
        { internalType: 'address', name: 'account', type: 'address' }
      ],
      name: 'getAccountLimits',
      outputs: [
        {
          components: [
            { internalType: 'contract CToken[]', name: 'markets', type: 'address[]' },
            { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
            { internalType: 'uint256', name: 'shortfall', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.AccountLimits',
          name: '',
          type: 'tuple'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'contract RLEN', name: 'comp', type: 'address' },
        { internalType: 'address', name: 'account', type: 'address' }
      ],
      name: 'getCompBalanceMetadata',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'balance', type: 'uint256' },
            { internalType: 'uint256', name: 'votes', type: 'uint256' },
            { internalType: 'address', name: 'delegate', type: 'address' }
          ],
          internalType: 'struct RlendingLens.CompBalanceMetadata',
          name: '',
          type: 'tuple'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract RLEN', name: 'comp', type: 'address' },
        { internalType: 'contract ComptrollerLensInterface', name: 'comptroller', type: 'address' },
        { internalType: 'address', name: 'account', type: 'address' }
      ],
      name: 'getCompBalanceMetadataExt',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'balance', type: 'uint256' },
            { internalType: 'uint256', name: 'votes', type: 'uint256' },
            { internalType: 'address', name: 'delegate', type: 'address' },
            { internalType: 'uint256', name: 'allocated', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.CompBalanceMetadataExt',
          name: '',
          type: 'tuple'
        }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'contract RLEN', name: 'comp', type: 'address' },
        { internalType: 'address', name: 'account', type: 'address' },
        { internalType: 'uint32[]', name: 'blockNumbers', type: 'uint32[]' }
      ],
      name: 'getCompVotes',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
            { internalType: 'uint256', name: 'votes', type: 'uint256' }
          ],
          internalType: 'struct RlendingLens.CompVotes[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'contract GovernorAlpha', name: 'governor', type: 'address' },
        { internalType: 'uint256[]', name: 'proposalIds', type: 'uint256[]' }
      ],
      name: 'getGovProposals',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
            { internalType: 'address', name: 'proposer', type: 'address' },
            { internalType: 'uint256', name: 'eta', type: 'uint256' },
            { internalType: 'address[]', name: 'targets', type: 'address[]' },
            { internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
            { internalType: 'string[]', name: 'signatures', type: 'string[]' },
            { internalType: 'bytes[]', name: 'calldatas', type: 'bytes[]' },
            { internalType: 'uint256', name: 'startBlock', type: 'uint256' },
            { internalType: 'uint256', name: 'endBlock', type: 'uint256' },
            { internalType: 'uint256', name: 'forVotes', type: 'uint256' },
            { internalType: 'uint256', name: 'againstVotes', type: 'uint256' },
            { internalType: 'bool', name: 'canceled', type: 'bool' },
            { internalType: 'bool', name: 'executed', type: 'bool' }
          ],
          internalType: 'struct RlendingLens.GovProposal[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'contract GovernorAlpha', name: 'governor', type: 'address' },
        { internalType: 'address', name: 'voter', type: 'address' },
        { internalType: 'uint256[]', name: 'proposalIds', type: 'uint256[]' }
      ],
      name: 'getGovReceipts',
      outputs: [
        {
          components: [
            { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
            { internalType: 'bool', name: 'hasVoted', type: 'bool' },
            { internalType: 'bool', name: 'support', type: 'bool' },
            { internalType: 'uint96', name: 'votes', type: 'uint96' }
          ],
          internalType: 'struct RlendingLens.GovReceipt[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ],
  CToken: [
    {
      inputs: [
        { internalType: 'address', name: 'underlying_', type: 'address' },
        { internalType: 'contract ComptrollerInterface', name: 'comptroller_', type: 'address' },
        { internalType: 'contract InterestRateModel', name: 'interestRateModel_', type: 'address' },
        { internalType: 'uint256', name: 'initialExchangeRateMantissa_', type: 'uint256' },
        { internalType: 'string', name: 'name_', type: 'string' },
        { internalType: 'string', name: 'symbol_', type: 'string' },
        { internalType: 'uint8', name: 'decimals_', type: 'uint8' },
        { internalType: 'address payable', name: 'admin_', type: 'address' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'cashPrior',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'interestAccumulated',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'borrowIndex',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalBorrows',
          type: 'uint256',
        },
      ],
      name: 'AccrueInterest',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'borrowAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'accountBorrows',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalBorrows',
          type: 'uint256',
        },
      ],
      name: 'Borrow',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'error',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'info',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'detail',
          type: 'uint256',
        },
      ],
      name: 'Failure',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'liquidator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'repayAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'cTokenCollateral',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'seizeTokens',
          type: 'uint256',
        },
      ],
      name: 'LiquidateBorrow',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'minter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'mintTokens',
          type: 'uint256',
        },
      ],
      name: 'Mint',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldAdmin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newAdmin',
          type: 'address',
        },
      ],
      name: 'NewAdmin',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract ComptrollerInterface',
          name: 'oldComptroller',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'contract ComptrollerInterface',
          name: 'newComptroller',
          type: 'address'
        }
      ],
      name: 'NewComptroller',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'contract InterestRateModel',
          name: 'oldInterestRateModel',
          type: 'address'
        },
        {
          indexed: false,
          internalType: 'contract InterestRateModel',
          name: 'newInterestRateModel',
          type: 'address'
        }
      ],
      name: 'NewMarketInterestRateModel',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldPendingAdmin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newPendingAdmin',
          type: 'address',
        },
      ],
      name: 'NewPendingAdmin',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldReserveFactorMantissa',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newReserveFactorMantissa',
          type: 'uint256'
        }
      ],
      name: 'NewReserveFactor',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'redeemer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'redeemAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'redeemTokens',
          type: 'uint256',
        },
      ],
      name: 'Redeem',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'payer',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'borrower',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'repayAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'accountBorrows',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalBorrows',
          type: 'uint256',
        },
      ],
      name: 'RepayBorrow',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'benefactor',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'addAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotalReserves',
          type: 'uint256',
        },
      ],
      name: 'ReservesAdded',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'admin',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'reduceAmount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotalReserves',
          type: 'uint256',
        },
      ],
      name: 'ReservesReduced',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event'
    },
    {
      constant: false,
      inputs: [],
      name: '_acceptAdmin',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'addAmount', type: 'uint256' }],
      name: '_addReserves',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'reduceAmount', type: 'uint256' }],
      name: '_reduceReserves',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract ComptrollerInterface', name: 'newComptroller', type: 'address' }
      ],
      name: '_setComptroller',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'contract InterestRateModel',
          name: 'newInterestRateModel',
          type: 'address'
        }
      ],
      name: '_setInterestRateModel',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address payable', name: 'newPendingAdmin', type: 'address' }],
      name: '_setPendingAdmin',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'newReserveFactorMantissa', type: 'uint256' }],
      name: '_setReserveFactor',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'accrualBlockNumber',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'accrueInterest',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'admin',
      outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'address', name: 'spender', type: 'address' }
      ],
      name: 'allowance',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'spender', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'approve',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'balanceOfUnderlying',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'borrowAmount', type: 'uint256' }],
      name: 'borrow',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'borrowBalanceCurrent',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'borrowBalanceStored',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'borrowIndex',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'borrowRatePerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'comptroller',
      outputs: [{ internalType: 'contract ComptrollerInterface', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'exchangeRateCurrent',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'exchangeRateStored',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'getAccountSnapshot',
      outputs: [
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' },
        { internalType: 'uint256', name: '', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'getCash',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'underlying_', type: 'address' },
        { internalType: 'contract ComptrollerInterface', name: 'comptroller_', type: 'address' },
        { internalType: 'contract InterestRateModel', name: 'interestRateModel_', type: 'address' },
        { internalType: 'uint256', name: 'initialExchangeRateMantissa_', type: 'uint256' },
        { internalType: 'string', name: 'name_', type: 'string' },
        { internalType: 'string', name: 'symbol_', type: 'string' },
        { internalType: 'uint8', name: 'decimals_', type: 'uint8' }
      ],
      name: 'initialize',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'contract ComptrollerInterface', name: 'comptroller_', type: 'address' },
        { internalType: 'contract InterestRateModel', name: 'interestRateModel_', type: 'address' },
        { internalType: 'uint256', name: 'initialExchangeRateMantissa_', type: 'uint256' },
        { internalType: 'string', name: 'name_', type: 'string' },
        { internalType: 'string', name: 'symbol_', type: 'string' },
        { internalType: 'uint8', name: 'decimals_', type: 'uint8' }
      ],
      name: 'initialize',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'interestRateModel',
      outputs: [{ internalType: 'contract InterestRateModel', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'isCToken',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'uint256', name: 'repayAmount', type: 'uint256' },
        { internalType: 'contract CTokenInterface', name: 'cTokenCollateral', type: 'address' }
      ],
      name: 'liquidateBorrow',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'mintAmount', type: 'uint256' }],
      name: 'mint',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'pendingAdmin',
      outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'redeemTokens', type: 'uint256' }],
      name: 'redeem',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'redeemAmount', type: 'uint256' }],
      name: 'redeemUnderlying',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'uint256', name: 'repayAmount', type: 'uint256' }],
      name: 'repayBorrow',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'uint256', name: 'repayAmount', type: 'uint256' }
      ],
      name: 'repayBorrowBehalf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'reserveFactorMantissa',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'liquidator', type: 'address' },
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'uint256', name: 'seizeTokens', type: 'uint256' }
      ],
      name: 'seize',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'supplyRatePerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalBorrows',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'totalBorrowsCurrent',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalReserves',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'dst', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'transfer',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'src', type: 'address' },
        { internalType: 'address', name: 'dst', type: 'address' },
        { internalType: 'uint256', name: 'amount', type: 'uint256' }
      ],
      name: 'transferFrom',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'underlying',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ],
  JumpRateModelV2: [
    {
      inputs: [
        { internalType: 'uint256', name: 'baseRatePerYear', type: 'uint256' },
        { internalType: 'uint256', name: 'multiplierPerYear', type: 'uint256' },
        { internalType: 'uint256', name: 'jumpMultiplierPerYear', type: 'uint256' },
        { internalType: 'uint256', name: 'kink_', type: 'uint256' },
        { internalType: 'address', name: 'owner_', type: 'address' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'baseRatePerBlock',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'multiplierPerBlock',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'jumpMultiplierPerBlock',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'kink',
          type: 'uint256',
        },
      ],
      name: 'NewInterestParams',
      type: 'event'
    },
    {
      constant: true,
      inputs: [],
      name: 'baseRatePerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'blocksPerYear',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'uint256', name: 'cash', type: 'uint256' },
        { internalType: 'uint256', name: 'borrows', type: 'uint256' },
        { internalType: 'uint256', name: 'reserves', type: 'uint256' }
      ],
      name: 'getBorrowRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'uint256', name: 'cash', type: 'uint256' },
        { internalType: 'uint256', name: 'borrows', type: 'uint256' },
        { internalType: 'uint256', name: 'reserves', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveFactorMantissa', type: 'uint256' }
      ],
      name: 'getSupplyRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'isInterestRateModel',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'jumpMultiplierPerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'kink',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'multiplierPerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'uint256', name: 'baseRatePerYear', type: 'uint256' },
        { internalType: 'uint256', name: 'multiplierPerYear', type: 'uint256' },
        { internalType: 'uint256', name: 'jumpMultiplierPerYear', type: 'uint256' },
        { internalType: 'uint256', name: 'kink_', type: 'uint256' }
      ],
      name: 'updateJumpRateModel',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'uint256', name: 'cash', type: 'uint256' },
        { internalType: 'uint256', name: 'borrows', type: 'uint256' },
        { internalType: 'uint256', name: 'reserves', type: 'uint256' }
      ],
      name: 'utilizationRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'pure',
      type: 'function'
    }
  ],
  Maximillion: [
    {
      inputs: [{ internalType: 'contract CRBTC', name: 'cRBTC_', type: 'address' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      constant: true,
      inputs: [],
      name: 'cRBTC',
      outputs: [{ internalType: 'contract CRBTC', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'borrower', type: 'address' }],
      name: 'repayBehalf',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'borrower', type: 'address' },
        { internalType: 'contract CRBTC', name: 'cRBTC_', type: 'address' }
      ],
      name: 'repayBehalfExplicit',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function'
    }
  ],
  PriceOracleAdapterMoc: [
    {
      inputs: [
        { internalType: 'address', name: 'guardian_', type: 'address' },
        { internalType: 'address', name: 'priceProvider', type: 'address' },
        { internalType: 'address', name: 'rbtcPriceProvider', type: 'address' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newAddress',
          type: 'address',
        },
      ],
      name: 'PriceOracleAdapterUpdated',
      type: 'event'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'assetPrices',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'guardian',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'priceProviderMoC',
      outputs: [{ internalType: 'contract PriceProviderMoC', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'rBTCPriceProviderMoC',
      outputs: [{ internalType: 'contract PriceProviderMoC', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'priceProviderAddress', type: 'address' }],
      name: 'setPriceProvider',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'rBTCPriceProviderAddress', type: 'address' }],
      name: 'setRBTCPriceProvider',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ],
  PriceOracleProxy: [
    {
      inputs: [{ internalType: 'address', name: 'guardian_', type: 'address' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldGuardian',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newGuardian',
          type: 'address',
        },
      ],
      name: 'NewGuardian',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'oldPendingGuardian',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newPendingGuardian',
          type: 'address',
        },
      ],
      name: 'NewPendingGuardian',
      type: 'event'
    },
    {
      constant: false,
      inputs: [],
      name: '_acceptAdmin',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'newPendingGuardian', type: 'address' }],
      name: '_setPendingAdmin',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'cRBTCAddress',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'cTokenArrayCount',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'cTokensArray',
      outputs: [
        { internalType: 'address', name: 'cToken', type: 'address' },
        { internalType: 'string', name: 'cTokenName', type: 'string' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'contract CToken', name: 'cToken', type: 'address' }],
      name: 'getUnderlyingPrice',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'guardian',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'isPriceOracle',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'pendingGuardian',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { internalType: 'address', name: 'addressToken', type: 'address' },
        { internalType: 'address', name: 'addressAdapter', type: 'address' }
      ],
      name: 'setAdapterToToken',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ internalType: 'address', name: 'addressCRBTC', type: 'address' }],
      name: 'setCRBTCAddress',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'tokenAdapter',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    }
  ],
  WhitePaperInterestRateModel: [
    {
      inputs: [
        { internalType: 'uint256', name: 'baseRatePerYear', type: 'uint256' },
        { internalType: 'uint256', name: 'multiplierPerYear', type: 'uint256' }
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'baseRatePerBlock',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'multiplierPerBlock',
          type: 'uint256',
        },
      ],
      name: 'NewInterestParams',
      type: 'event'
    },
    {
      constant: true,
      inputs: [],
      name: 'baseRatePerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'blocksPerYear',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'uint256', name: 'cash', type: 'uint256' },
        { internalType: 'uint256', name: 'borrows', type: 'uint256' },
        { internalType: 'uint256', name: 'reserves', type: 'uint256' }
      ],
      name: 'getBorrowRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'uint256', name: 'cash', type: 'uint256' },
        { internalType: 'uint256', name: 'borrows', type: 'uint256' },
        { internalType: 'uint256', name: 'reserves', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveFactorMantissa', type: 'uint256' }
      ],
      name: 'getSupplyRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'isInterestRateModel',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'multiplierPerBlock',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [
        { internalType: 'uint256', name: 'cash', type: 'uint256' },
        { internalType: 'uint256', name: 'borrows', type: 'uint256' },
        { internalType: 'uint256', name: 'reserves', type: 'uint256' }
      ],
      name: 'utilizationRate',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'pure',
      type: 'function'
    }
  ],
  RBTCMocOracle: [
    {
      constant: false,
      inputs: [{ name: 'owner_', type: 'address' }],
      name: 'setOwner',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'poke',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'compute',
      outputs: [
        { name: '', type: 'bytes32' },
        { name: '', type: 'bool' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'wat', type: 'address' }],
      name: 'set',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'wat', type: 'address' }],
      name: 'unset',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: '', type: 'address' }],
      name: 'indexes',
      outputs: [{ name: '', type: 'bytes12' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'next',
      outputs: [{ name: '', type: 'bytes12' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'read',
      outputs: [{ name: '', type: 'bytes32' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'peek',
      outputs: [
        { name: '', type: 'bytes32' },
        { name: '', type: 'bool' }
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: true,
      inputs: [{ name: '', type: 'bytes12' }],
      name: 'values',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'min_', type: 'uint96' }],
      name: 'setMin',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'authority_', type: 'address' }],
      name: 'setAuthority',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'owner',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'void',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'has',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [
        { name: 'pos', type: 'bytes12' },
        { name: 'wat', type: 'address' }
      ],
      name: 'set',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'authority',
      outputs: [{ name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'pos', type: 'bytes12' }],
      name: 'unset',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'next_', type: 'bytes12' }],
      name: 'setNext',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: true,
      inputs: [],
      name: 'min',
      outputs: [{ name: '', type: 'uint96' }],
      payable: false,
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [{ indexed: false, name: 'val', type: 'bytes32' }],
      name: 'LogValue',
      type: 'event'
    },
    {
      anonymous: true,
      inputs: [
        { indexed: true, name: 'sig', type: 'bytes4' },
        { indexed: true, name: 'guy', type: 'address' },
        { indexed: true, name: 'foo', type: 'bytes32' },
        { indexed: true, name: 'bar', type: 'bytes32' },
        { indexed: false, name: 'wad', type: 'uint256' },
        { indexed: false, name: 'fax', type: 'bytes' }
      ],
      name: 'LogNote',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'authority', type: 'address' }],
      name: 'LogSetAuthority',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [{ indexed: true, name: 'owner', type: 'address' }],
      name: 'LogSetOwner',
      type: 'event'
    }
  ]
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
  RLEN: 18
}

export const cTokensDetails = [
  {
    symbol: 'cRBTC',
    name: 'ctoken rbtc',
    decimals: decimals.cRBTC,
    underlying: { symbol: 'RBTC', name: 'RSK Smart Bitcoin', decimals: decimals.RBTC }
  },
  {
    symbol: 'cRIF',
    name: 'ctoken rLending Rif',
    decimals: decimals.cRIF,
    underlying: { symbol: 'RIF', name: 'rLending Rif', decimals: decimals.RIF }
  },
  {
    symbol: 'crDAI',
    name: 'ctoken rLending Dai',
    decimals: decimals.crDAI,
    underlying: { symbol: 'rDAI', name: 'rLending Dai', decimals: decimals.rDAI }
  }
]

export const errorCodes = {
  comptroller: {
    codes: {
      0: { error: 'NO_ERROR', description: 'Not a failure.', hint: '' },
      1: {
        error: 'UNAUTHORIZED',
        description: 'The sender is not authorized to perform this action.',
        hint: ''
      },
      2: {
        error: 'COMPTROLLER_MISMATCH',
        description: 'Liquidation cannot be performed in markets with different comptrollers.',
        hint: ''
      },
      3: {
        error: 'INSUFFICIENT_SHORTFALL',
        description: 'The account does not have sufficient shortfall to perform this action.',
        hint: ''
      },
      4: {
        error: 'INSUFFICIENT_LIQUIDITY',
        description: 'The account does not have sufficient liquidity to perform this action.',
        hint: ''
      },
      5: { error: 'INVALID_CLOSE_FACTOR', description: 'The close factor is not valid.', hint: '' },
      6: {
        error: 'INVALID_COLLATERAL_FACTOR',
        description: 'The collateral factor is not valid.',
        hint: ''
      },
      7: {
        error: 'INVALID_LIQUIDATION_INCENTIVE',
        description: 'The liquidation incentive is invalid.',
        hint: ''
      },
      8: {
        error: 'MARKET_NOT_ENTERED',
        description: 'The market has not been entered by the account.',
        hint: ''
      },
      9: {
        error: 'MARKET_NOT_LISTED',
        description: 'The market is not currently listed by the comptroller.',
        hint: ''
      },
      10: {
        error: 'MARKET_ALREADY_LISTED',
        description: 'An admin tried to list the same market more than once.',
        hint: ''
      },
      11: { error: 'MATH_ERROR', description: 'A math calculation error occurred.', hint: '' },
      12: {
        error: 'NONZERO_BORROW_BALANCE',
        description: 'The action cannot be performed since the account carries a borrow balance.',
        hint: ''
      },
      13: {
        error: 'PRICE_ERROR',
        description: 'The comptroller could not obtain a required price of an asset.',
        hint: ''
      },
      14: {
        error: 'REJECTION',
        description: 'The comptroller rejects the action requested by the market.',
        hint: ''
      },
      15: {
        error: 'SNAPSHOT_ERROR',
        description:
          'The comptroller could not get the account borrows and exchange rate from the market.',
        hint: ''
      },
      16: {
        error: 'TOO_MANY_ASSETS',
        description: 'Attempted to enter more markets than are currently supported.',
        hint: ''
      },
      17: {
        error: 'TOO_MUCH_REPAY',
        description: 'Attempted to repay more than is allowed by the protocol.',
        hint: ''
      }
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
      18: { error: 'SUPPORT_MARKET_OWNER_CHECK', description: '', hint: '' }
    }
  }
}
