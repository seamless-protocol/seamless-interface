import { Address, isAddressEqual } from "viem";
import { WETH_ADDRESS } from "@meta";

export const isWETH = (address?: Address) => {
  if (!address) return false;
  return isAddressEqual(address, WETH_ADDRESS);
};

export const isNullableAddressEqual = (address1?: Address, address2?: Address) => {
  if (!address1 || !address2) return false;
  return isAddressEqual(address1, address2);
};
