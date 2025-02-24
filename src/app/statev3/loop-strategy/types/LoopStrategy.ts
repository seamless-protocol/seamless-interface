import { ERC4626Data } from "../../common/types/ERC4626";

export interface LoopStrategy extends ERC4626Data {
  logo?: string;

  assetsCap?: bigint;

  remainingCap?: bigint;
  remainingPercentage?: bigint;

  equity?: bigint;

  equityUsd?: bigint;
}
