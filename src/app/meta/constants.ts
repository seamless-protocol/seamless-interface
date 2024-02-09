import { Address } from "viem";

export const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
export const COMPOUNDING_PERIODS_APY = 52;

export const WETH_ADDRESS: Address =
  "0x4200000000000000000000000000000000000006";
export const WSTETH_ADDRESS: Address =
  "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";

export const ONE_USD = BigInt(10 ** 8);
export const ONE_ETHER = BigInt(10 ** 18);

export const APY_BLOCK_FRAME = 50n;
