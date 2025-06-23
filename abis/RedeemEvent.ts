// Redeem event from the LeverageManager contract
export const RedeemEventLeverageManagerAbi = [
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
];
