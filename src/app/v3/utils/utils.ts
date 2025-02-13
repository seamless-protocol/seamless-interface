import { Address } from "viem";
import { WETH_ADDRESS } from "@meta";

export const isWETH = (address?: Address) => {
  return address === WETH_ADDRESS;
};
