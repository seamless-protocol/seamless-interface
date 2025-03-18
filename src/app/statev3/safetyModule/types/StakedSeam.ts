import { Address } from "viem";
import { Token } from "@shared";

export interface UnderlyingAsset extends Token {
  address?: Address;
}

export interface StakedSeam extends Token {
  address: Address | undefined;
  underlying: UnderlyingAsset;
}
