
import { Address } from "viem";

export interface TokenData {
  address: Address | undefined;
  decimals: number;
  symbol: string;
  name: string; 
}
