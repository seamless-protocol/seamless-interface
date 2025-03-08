import { Address } from "viem";

export interface Curator {
  name: string;
  address: string;
  icon: string;
}

export interface MorphoAsset {
  name: string;
  decimals: number;
  logoURI?: string | null;
  symbol: string;
  address: Address;
}
