import { Address } from "viem";
import { Token } from "@shared";

export interface StakedAsset extends Token {
  address?: Address;
}

export interface StakedSeam extends Token {
  address: Address | undefined;
  asset: StakedAsset;
}
