export const EtherFiLeverageRouterAbi = [
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
      {
        name: "_etherFiL2ModeSyncPool",
        type: "address",
        internalType: "contract IEtherFiL2ModeSyncPool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "etherFiL2ModeSyncPool",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IEtherFiL2ModeSyncPool",
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
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "onMorphoFlashLoan",
    inputs: [
      {
        name: "loanAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
