export const LendingAdapterAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_leverageManager",
        type: "address",
        internalType: "contract ILeverageManager",
      },
      {
        name: "_morpho",
        type: "address",
        internalType: "contract IMorpho",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addCollateral",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "authorizedCreator",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "borrow",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "convertCollateralToDebtAsset",
    inputs: [
      {
        name: "collateral",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "convertDebtToCollateralAsset",
    inputs: [
      {
        name: "debt",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCollateral",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCollateralAsset",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCollateralInDebtAsset",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDebt",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDebtAsset",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEquityInCollateralAsset",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEquityInDebtAsset",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLiquidationPenalty",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_morphoMarketId",
        type: "bytes32",
        internalType: "Id",
      },
      {
        name: "_authorizedCreator",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isUsed",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "leverageManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ILeverageManager",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "marketParams",
    inputs: [],
    outputs: [
      {
        name: "loanToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "collateralToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "oracle",
        type: "address",
        internalType: "address",
      },
      {
        name: "irm",
        type: "address",
        internalType: "address",
      },
      {
        name: "lltv",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "morpho",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IMorpho",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "morphoMarketId",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "Id",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "postLeverageTokenCreation",
    inputs: [
      {
        name: "creator",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeCollateral",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "repay",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MorphoLendingAdapterInitialized",
    inputs: [
      {
        name: "morphoMarketId",
        type: "bytes32",
        indexed: true,
        internalType: "Id",
      },
      {
        name: "marketParams",
        type: "tuple",
        indexed: false,
        internalType: "struct MarketParams",
        components: [
          {
            name: "loanToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "oracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "irm",
            type: "address",
            internalType: "address",
          },
          {
            name: "lltv",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "authorizedCreator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MorphoLendingAdapterUsed",
    inputs: [],
    anonymous: false,
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "LendingAdapterAlreadyInUse",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
] as const;
