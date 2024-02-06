import { Address } from "viem";

export const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
export const COMPOUNDING_PERIODS_APY = 52;

export const WETH_ADDRESS: Address =
  "0x4200000000000000000000000000000000000006";
export const CBETH_ADDRESS: Address =
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22";
export const WSTETH_ADDRESS: Address =
  "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452";

// Lending & Borrowing
export const sWETH_ADDRESS: Address =
  "0x48bf8fCd44e2977c8a9A744658431A8e6C0d866c";
export const variableDebtSeamWETH_ADDRESS: Address =
  "0x4cebC6688faa595537444068996ad9A207A19f13";

//TODO: Change to base mainnet addresses
export const WRAPED_CBETH_ADDRESS =
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22";
export const SEAM_WRAPED_CBETH_ADDRESS =
  "0x2c159A183d9056E29649Ce7E56E59cA833D32624";

export const ONE_USD = BigInt(10 ** 8);
export const ONE_ETHER = BigInt(10 ** 18);

export const APY_BLOCK_FRAME = 50n;
