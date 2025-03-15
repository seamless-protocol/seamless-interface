import { Address } from "viem";
import { Token } from "@shared";

export interface StakedSeam extends Token {
  address: Address | undefined;
  asset: Token;
}
