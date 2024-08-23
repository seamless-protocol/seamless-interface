import { Address } from "viem";

export const stateMock: {
  data: { name: string; address: Address; description: string }[];
} = {
  data: [
    {
      name: "Strategy 1",
      description: "Strategy 1 description",
      address: "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4" as Address,
    },
    {
      name: "Strategy 2",
      description: "Strategy 1 description",
      address: "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4" as Address,
    },
    {
      name: "Strategy 3",
      description: "Strategy 1 description",
      address: "0x2FB1bEa0a63F77eFa77619B903B2830b52eE78f4" as Address,
    },
  ],
};
