export const LendingAdapterAbi = [
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
        name: "debt",
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
        name: "collateral",
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
        name: "collateral",
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
        name: "collateralAsset",
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
        name: "collateral",
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
        name: "debt",
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
        name: "debtAsset",
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
        name: "equity",
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
        name: "equity",
        type: "uint256",
        internalType: "uint256",
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
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
] as const;
