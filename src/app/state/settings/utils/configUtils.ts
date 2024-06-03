import { Address } from "viem";
import { Asset, Strategy } from "../../types/AssetTypes";
import { assetsConfig, strategiesConfig } from "../config";

export function getAssetConfigByAddress(address?: Address): Asset | Strategy | undefined {
  if (!address) return undefined;

  const directMatch = strategiesConfig[address] || assetsConfig[address];

  return directMatch;
}

export function getStrategyConfigByAddress(address?: Address): Strategy | undefined {
  if (!address) return undefined;

  const directMatch = strategiesConfig[address];
  return directMatch;
}
