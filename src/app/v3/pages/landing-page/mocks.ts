import { Address } from "viem";

export const stateMock: {
  data: { name: string; address: Address, description: string }[]
} = {
  data: [
    {
      name: "Strategy 1",
      description: "Strategy 1 description",
      address: "0x0" as Address,
    },
    {
      name: "Strategy 2",
      description: "Strategy 1 description",
      address: "0x1" as Address,
    },
    {
      name: "Strategy 3",
      description: "Strategy 1 description",
      address: "0x2" as Address,
    }
  ]
}