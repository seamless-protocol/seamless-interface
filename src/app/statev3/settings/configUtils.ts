import { Address } from "viem";
import { strategyConfig } from "./config";

export function isAssetStrategy(asset: Address): boolean {
  return !!strategyConfig[asset];
}
