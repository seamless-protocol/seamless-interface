import { Token } from "@shared";

export interface UnderlyingAsset extends Token {}

export interface StakedSeam extends Token {
  underlying: UnderlyingAsset;
}
