import { Address } from "viem";

export interface MorphoAsset {
  name: string;
  decimals: number;
  logoURI?: string | null;
  symbol: string;
  address: Address;
}