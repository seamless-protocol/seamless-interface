import { Address } from "viem";

export const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
export const WETH_ADDRESS: Address =
  "0x4200000000000000000000000000000000000006";
export const CBETH_ADDRESS: Address =
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22";

//TODO: Change to base mainnet addresses
export const WRAPED_CBETH_ADDRESS =
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22";
export const SEAM_WRAPED_CBETH_ADDRESS =
  "0x2c159A183d9056E29649Ce7E56E59cA833D32624";

export const ONE_USD = BigInt(10 ** 8);
export const ONE_ETHER = BigInt(10 ** 18);

export const APY_BLOCK_FRAME = 50n;
