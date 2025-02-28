
import { Address } from "viem";

export interface TokenData {
  address: Address | undefined;
  decimals?: number;
  logo?: string;
  symbol?: string;
  name?: string; 
}
