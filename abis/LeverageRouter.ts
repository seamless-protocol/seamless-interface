export const LeverageRouterAbi = [
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
        name: "_swapper",
        type: "address",
        internalType: "contract ISwapAdapter",
      },
    ],
    stateMutability: "nonpayable",
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
      {
        name: "maxSwapCostInCollateralAsset",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "swapContext",
        type: "tuple",
        internalType: "struct ISwapAdapter.SwapContext",
        components: [
          {
            name: "path",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "encodedPath",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "fees",
            type: "uint24[]",
            internalType: "uint24[]",
          },
          {
            name: "tickSpacing",
            type: "int24[]",
            internalType: "int24[]",
          },
          {
            name: "exchange",
            type: "uint8",
            internalType: "enum ISwapAdapter.Exchange",
          },
          {
            name: "exchangeAddresses",
            type: "tuple",
            internalType: "struct ISwapAdapter.ExchangeAddresses",
            components: [
              {
                name: "aerodromeRouter",
                type: "address",
                internalType: "address",
              },
              {
                name: "aerodromePoolFactory",
                type: "address",
                internalType: "address",
              },
              {
                name: "aerodromeSlipstreamRouter",
                type: "address",
                internalType: "address",
              },
              {
                name: "uniswapSwapRouter02",
                type: "address",
                internalType: "address",
              },
              {
                name: "uniswapV2Router02",
                type: "address",
                internalType: "address",
              },
            ],
          },
        ],
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
      {
        name: "maxSwapCostInCollateralAsset",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "swapContext",
        type: "tuple",
        internalType: "struct ISwapAdapter.SwapContext",
        components: [
          {
            name: "path",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "encodedPath",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "fees",
            type: "uint24[]",
            internalType: "uint24[]",
          },
          {
            name: "tickSpacing",
            type: "int24[]",
            internalType: "int24[]",
          },
          {
            name: "exchange",
            type: "uint8",
            internalType: "enum ISwapAdapter.Exchange",
          },
          {
            name: "exchangeAddresses",
            type: "tuple",
            internalType: "struct ISwapAdapter.ExchangeAddresses",
            components: [
              {
                name: "aerodromeRouter",
                type: "address",
                internalType: "address",
              },
              {
                name: "aerodromePoolFactory",
                type: "address",
                internalType: "address",
              },
              {
                name: "aerodromeSlipstreamRouter",
                type: "address",
                internalType: "address",
              },
              {
                name: "uniswapSwapRouter02",
                type: "address",
                internalType: "address",
              },
              {
                name: "uniswapV2Router02",
                type: "address",
                internalType: "address",
              },
            ],
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "swapper",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ISwapAdapter",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "error",
    name: "MaxSwapCostExceeded",
    inputs: [
      {
        name: "actualCost",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "maxCost",
        type: "uint256",
        internalType: "uint256",
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
    name: "Unauthorized",
    inputs: [],
  },
] as const;
