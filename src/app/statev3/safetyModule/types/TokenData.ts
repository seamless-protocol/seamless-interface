
import { Address } from "viem";

export interface TokenData {
  address: Address | undefined;
  decimals: number;
  logoURI?: string | null;
  symbol: string;
  name: string; 
}
