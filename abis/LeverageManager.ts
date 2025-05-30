export const LeverageManagerAbi = [
  {
    type: "function",
    name: "BASE_RATIO",
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
    name: "DEFAULT_ADMIN_ROLE",
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
    name: "FEE_MANAGER_ROLE",
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
    name: "UPGRADER_ROLE",
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
    name: "__FeeManager_init",
    inputs: [
      {
        name: "defaultAdmin",
        type: "address",
        internalType: "address",
      },
      {
        name: "treasury",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "chargeManagementFee",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createNewLeverageToken",
    inputs: [
      {
        name: "tokenConfig",
        type: "tuple",
        internalType: "struct LeverageTokenConfig",
        components: [
          {
            name: "lendingAdapter",
            type: "address",
            internalType: "contract ILendingAdapter",
          },
          {
            name: "rebalanceAdapter",
            type: "address",
            internalType: "contract IRebalanceAdapterBase",
          },
          {
            name: "mintTokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "redeemTokenFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "symbol",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getDefaultManagementFeeAtCreation",
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
    name: "getLastManagementFeeAccrualTimestamp",
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
        type: "uint120",
        internalType: "uint120",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenActionFee",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "action",
        type: "uint8",
        internalType: "enum ExternalAction",
      },
    ],
    outputs: [
      {
        name: "fee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenCollateralAsset",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    outputs: [
      {
        name: "collateralAsset",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenConfig",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    outputs: [
      {
        name: "config",
        type: "tuple",
        internalType: "struct LeverageTokenConfig",
        components: [
          {
            name: "lendingAdapter",
            type: "address",
            internalType: "contract ILendingAdapter",
          },
          {
            name: "rebalanceAdapter",
            type: "address",
            internalType: "contract IRebalanceAdapterBase",
          },
          {
            name: "mintTokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "redeemTokenFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenDebtAsset",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    outputs: [
      {
        name: "debtAsset",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenFactory",
    inputs: [],
    outputs: [
      {
        name: "factory",
        type: "address",
        internalType: "contract IBeaconProxyFactory",
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
        name: "ratio",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenLendingAdapter",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    outputs: [
      {
        name: "adapter",
        type: "address",
        internalType: "contract ILendingAdapter",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenRebalanceAdapter",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    outputs: [
      {
        name: "module",
        type: "address",
        internalType: "contract IRebalanceAdapterBase",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLeverageTokenState",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    outputs: [
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
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getManagementFee",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
    outputs: [
      {
        name: "fee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
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
    name: "getTreasury",
    inputs: [],
    outputs: [
      {
        name: "treasury",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTreasuryActionFee",
    inputs: [
      {
        name: "action",
        type: "uint8",
        internalType: "enum ExternalAction",
      },
    ],
    outputs: [
      {
        name: "fee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
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
    name: "initialize",
    inputs: [
      {
        name: "initialAdmin",
        type: "address",
        internalType: "address",
      },
      {
        name: "treasury",
        type: "address",
        internalType: "address",
      },
      {
        name: "leverageTokenFactory",
        type: "address",
        internalType: "contract IBeaconProxyFactory",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "equityInCollateralAsset",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "minShares",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "actionData",
        type: "tuple",
        internalType: "struct ActionData",
        components: [
          {
            name: "collateral",
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
            name: "shares",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "treasuryFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "previewMint",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "equityInCollateralAsset",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ActionData",
        components: [
          {
            name: "collateral",
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
            name: "shares",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "treasuryFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "previewRedeem",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "equityInCollateralAsset",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct ActionData",
        components: [
          {
            name: "collateral",
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
            name: "shares",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "treasuryFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
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
    name: "rebalance",
    inputs: [
      {
        name: "leverageToken",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "actions",
        type: "tuple[]",
        internalType: "struct RebalanceAction[]",
        components: [
          {
            name: "actionType",
            type: "uint8",
            internalType: "enum ActionType",
          },
          {
            name: "amount",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "tokenIn",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "tokenOut",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "amountIn",
        type: "uint256",
        internalType: "uint256",
      },
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
    name: "redeem",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "equityInCollateralAsset",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "maxShares",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "actionData",
        type: "tuple",
        internalType: "struct ActionData",
        components: [
          {
            name: "collateral",
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
            name: "shares",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "treasuryFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "callerConfirmation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDefaultManagementFeeAtCreation",
    inputs: [
      {
        name: "fee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setManagementFee",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "fee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTreasury",
    inputs: [
      {
        name: "treasury",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTreasuryActionFee",
    inputs: [
      {
        name: "action",
        type: "uint8",
        internalType: "enum ExternalAction",
      },
      {
        name: "fee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
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
    name: "DefaultManagementFeeAtCreationSet",
    inputs: [
      {
        name: "fee",
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
    name: "LeverageManagerInitialized",
    inputs: [
      {
        name: "leverageTokenFactory",
        type: "address",
        indexed: false,
        internalType: "contract IBeaconProxyFactory",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LeverageTokenActionFeeSet",
    inputs: [
      {
        name: "leverageToken",
        type: "address",
        indexed: true,
        internalType: "contract ILeverageToken",
      },
      {
        name: "action",
        type: "uint8",
        indexed: true,
        internalType: "enum ExternalAction",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LeverageTokenCreated",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "contract ILeverageToken",
      },
      {
        name: "collateralAsset",
        type: "address",
        indexed: false,
        internalType: "contract IERC20",
      },
      {
        name: "debtAsset",
        type: "address",
        indexed: false,
        internalType: "contract IERC20",
      },
      {
        name: "config",
        type: "tuple",
        indexed: false,
        internalType: "struct LeverageTokenConfig",
        components: [
          {
            name: "lendingAdapter",
            type: "address",
            internalType: "contract ILendingAdapter",
          },
          {
            name: "rebalanceAdapter",
            type: "address",
            internalType: "contract IRebalanceAdapterBase",
          },
          {
            name: "mintTokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "redeemTokenFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ManagementFeeCharged",
    inputs: [
      {
        name: "leverageToken",
        type: "address",
        indexed: true,
        internalType: "contract ILeverageToken",
      },
      {
        name: "sharesFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ManagementFeeSet",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "contract ILeverageToken",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Mint",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "contract ILeverageToken",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "actionData",
        type: "tuple",
        indexed: false,
        internalType: "struct ActionData",
        components: [
          {
            name: "collateral",
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
            name: "shares",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "treasuryFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Redeem",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "contract ILeverageToken",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "actionData",
        type: "tuple",
        indexed: false,
        internalType: "struct ActionData",
        components: [
          {
            name: "collateral",
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
            name: "shares",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "tokenFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "treasuryFee",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TreasuryActionFeeSet",
    inputs: [
      {
        name: "action",
        type: "uint8",
        indexed: true,
        internalType: "enum ExternalAction",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TreasurySet",
    inputs: [
      {
        name: "treasury",
        type: "address",
        indexed: false,
        internalType: "address",
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
    name: "AccessControlBadConfirmation",
    inputs: [],
  },
  {
    type: "error",
    name: "AccessControlUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
      {
        name: "neededRole",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
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
    name: "FeeTooHigh",
    inputs: [
      {
        name: "fee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "maxFee",
        type: "uint256",
        internalType: "uint256",
      },
    ],
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
    name: "InvalidLeverageTokenAssets",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidLeverageTokenStateAfterRebalance",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
    ],
  },
  {
    type: "error",
    name: "LeverageTokenNotEligibleForRebalance",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "NotRebalancer",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "contract ILeverageToken",
      },
      {
        name: "caller",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
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
    name: "SlippageTooHigh",
    inputs: [
      {
        name: "actual",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "expected",
        type: "uint256",
        internalType: "uint256",
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
    name: "ZeroAddressTreasury",
    inputs: [],
  },
] as const;
