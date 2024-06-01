import { Address } from "viem";
import { Asset, Strategy } from "../../types/AssetTypes";
import { assetsConfig, strategiesConfig } from "../config";

export function getAssetConfigByAddress(address?: Address): Asset | Strategy | undefined {
  if (!address) return undefined;

  const directMatch = strategiesConfig[address] || assetsConfig[address];
  if (directMatch) {
    return directMatch;
  }

  const matchingStrategy = getStrategyConfigBySubStrategy(address);

  return matchingStrategy;
}

export function getStrategyConfigByAddress(address?: Address): Strategy | undefined {
  if (!address) return undefined;

  const directMatch = strategiesConfig[address];
  if (directMatch) {
    return directMatch;
  }

  const matchingStrategy = getStrategyConfigBySubStrategy(address);

  return matchingStrategy;
}

export function getStrategyConfigBySubStrategy(address?: Address): Strategy | undefined {
  if (!address) return undefined;

  const matchingStrategy = Object.values(strategiesConfig).find((strategy) =>
    strategy.subStrategyData.some((sub) => sub.address === address)
  );

  return matchingStrategy;
}