export const RebalanceAdapterAbi = [
  {
    type: "function",
    name: "PRICE_MULTIPLIER_PRECISION",
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
    name: "REWARD_BASE",
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
    name: "UPGRADE_INTERFACE_VERSION",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createAuction",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "endAuction",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAmountIn",
    inputs: [
      {
        name: "amountOut",
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
    name: "getAuction",
    inputs: [],
    outputs: [
      {
        name: "auction",
        type: "tuple",
        internalType: "struct Auction",
        components: [
          {
            name: "isOverCollateralized",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "startTimestamp",
            type: "uint120",
            internalType: "uint120",
          },
          {
            name: "endTimestamp",
            type: "uint120",
            internalType: "uint120",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAuctionDuration",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint120",
        internalType: "uint120",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAuthorizedCreator",
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
    name: "getCollateralRatioThreshold",
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
    name: "getCurrentAuctionMultiplier",
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
    name: "getInitialPriceMultiplier",
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
    name: "getLeverageManager",
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
    name: "getLeverageToken",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenInitialCollateralRatio",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
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
    name: "getLeverageTokenMaxCollateralRatio",
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
    name: "getLeverageTokenMinCollateralRatio",
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
    name: "getLeverageTokenRebalanceStatus",
    inputs: [],
    outputs: [
      {
        name: "isEligible",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "isOverCollateralized",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenTargetCollateralRatio",
    inputs: [],
    outputs: [
      {
        name: "targetCollateralRatio",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMinPriceMultiplier",
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
    name: "getRebalanceReward",
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
        name: "params",
        type: "tuple",
        internalType: "struct RebalanceAdapter.RebalanceAdapterInitParams",
        components: [
          {
            name: "owner",
            type: "address",
            internalType: "address",
          },
          {
            name: "authorizedCreator",
            type: "address",
            internalType: "address",
          },
          {
            name: "leverageManager",
            type: "address",
            internalType: "contract ILeverageManager",
          },
          {
            name: "minCollateralRatio",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "targetCollateralRatio",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxCollateralRatio",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "auctionDuration",
            type: "uint120",
            internalType: "uint120",
          },
          {
            name: "initialPriceMultiplier",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "minPriceMultiplier",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "preLiquidationCollateralRatioThreshold",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "rebalanceReward",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isAuctionValid",
    inputs: [],
    outputs: [
      {
        name: "isValid",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isEligibleForRebalance",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "state",
        type: "tuple",
        internalType: "struct LeverageTokenState",
        components: [
          {
            name: "collateralInDebtAsset",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "debt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "equity",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "collateralRatio",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "caller",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "isStateAfterRebalanceValid",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "stateBefore",
        type: "tuple",
        internalType: "struct LeverageTokenState",
        components: [
          {
            name: "collateralInDebtAsset",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "debt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "equity",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "collateralRatio",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
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
    name: "owner",
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
    name: "postLeverageTokenCreation",
    inputs: [
      {
        name: "creator",
        type: "address",
        internalType: "address",
      },
      {
        name: "leverageToken",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "take",
    inputs: [
      {
        name: "amountOut",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "AuctionCreated",
    inputs: [
      {
        name: "auction",
        type: "tuple",
        indexed: false,
        internalType: "struct Auction",
        components: [
          {
            name: "isOverCollateralized",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "startTimestamp",
            type: "uint120",
            internalType: "uint120",
          },
          {
            name: "endTimestamp",
            type: "uint120",
            internalType: "uint120",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AuctionEnded",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "CollateralRatiosRebalanceAdapterInitialized",
    inputs: [
      {
        name: "minCollateralRatio",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "targetCollateralRatio",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "maxCollateralRatio",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DutchAuctionRebalanceAdapterInitialized",
    inputs: [
      {
        name: "auctionDuration",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "initialPriceMultiplier",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "minPriceMultiplier",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
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
    name: "LeverageTokenSet",
    inputs: [
      {
        name: "leverageToken",
        type: "address",
        indexed: false,
        internalType: "contract ILeverageToken",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PreLiquidationRebalanceAdapterInitialized",
    inputs: [
      {
        name: "collateralRatioThreshold",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "rebalanceReward",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RebalanceAdapterInitialized",
    inputs: [
      {
        name: "authorizedCreator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "leverageManager",
        type: "address",
        indexed: true,
        internalType: "contract ILeverageManager",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Take",
    inputs: [
      {
        name: "taker",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amountIn",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amountOut",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Upgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AuctionNotValid",
    inputs: [],
  },
  {
    type: "error",
    name: "AuctionStillValid",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC1967InvalidImplementation",
    inputs: [
      {
        name: "implementation",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1967NonPayable",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAuctionDuration",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidCollateralRatios",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "LeverageTokenAlreadySet",
    inputs: [],
  },
  {
    type: "error",
    name: "LeverageTokenNotEligibleForRebalance",
    inputs: [],
  },
  {
    type: "error",
    name: "MinPriceMultiplierTooHigh",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "UUPSUnauthorizedCallContext",
    inputs: [],
  },
  {
    type: "error",
    name: "UUPSUnsupportedProxiableUUID",
    inputs: [
      {
        name: "slot",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
] as const;
