export const baseBundlerAbi = [
  {
    type: "function",
    name: "initiator",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "multicall",
    inputs: [{ name: "data", type: "bytes[]", internalType: "bytes[]" }],
    outputs: [],
    stateMutability: "payable",
  },
] as const;

