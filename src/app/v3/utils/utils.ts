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

export const checkGraphQlResponse = (result: any) => {
  if (result.errors) {
    throw new Error(`Failed to fetch Graphql data: ${result.errors.map((e: any) => e.message).join("; ")}`);
  } else if (result.error) {
    throw new Error(`Failed to fetch Graphql data: ${result.error.message}`);
  }
};
