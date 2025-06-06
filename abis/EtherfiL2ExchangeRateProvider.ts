export const EtherfiL2ExchangeRateProviderAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "EtherfiL2ExchangeRateProvider__InvalidRate", type: "error" },
  { inputs: [], name: "InvalidInitialization", type: "error" },
  { inputs: [], name: "L2ExchangeRateProvider__DepositFeeExceedsMax", type: "error" },
  { inputs: [], name: "L2ExchangeRateProvider__NoRateOracle", type: "error" },
  { inputs: [], name: "L2ExchangeRateProvider__OutdatedRate", type: "error" },
  { inputs: [], name: "NotInitializing", type: "error" },
  { inputs: [{ internalType: "address", name: "owner", type: "address" }], name: "OwnableInvalidOwner", type: "error" },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint64", name: "version", type: "uint64" }],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "token", type: "address" },
      { indexed: false, internalType: "address", name: "rateOracle", type: "address" },
      { indexed: false, internalType: "uint64", name: "depositFee", type: "uint64" },
      { indexed: false, internalType: "uint32", name: "freshPeriod", type: "uint32" },
    ],
    name: "RateParametersSet",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
    ],
    name: "getConversionAmount",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
    ],
    name: "getConversionAmountUnsafe",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getRateParameters",
    outputs: [
      {
        components: [
          { internalType: "address", name: "rateOracle", type: "address" },
          { internalType: "uint64", name: "depositFee", type: "uint64" },
          { internalType: "uint32", name: "freshPeriod", type: "uint32" },
        ],
        internalType: "struct IL2ExchangeRateProvider.RateParameters",
        name: "parameters",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "rateOracle", type: "address" },
      { internalType: "uint64", name: "depositFee", type: "uint64" },
      { internalType: "uint32", name: "freshPeriod", type: "uint32" },
    ],
    name: "setRateParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default EtherfiL2ExchangeRateProviderAbi;
