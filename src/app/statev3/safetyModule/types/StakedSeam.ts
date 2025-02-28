import { Address } from "viem";
import { TokenData} from "./TokenData";

export interface StakedSeam {
  name?: string;
  decimals?: number;
  logo?: string;
  symbol?: string;
  address: Address | undefined;
  asset: TokenData;
}