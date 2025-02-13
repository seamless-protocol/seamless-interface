import { Address, isAddressEqual } from "viem";
import { WETH_ADDRESS } from "@meta";

export const isWETH = (address?: Address) => {
  if (!address) return false;
  return isAddressEqual(address, WETH_ADDRESS);
};
