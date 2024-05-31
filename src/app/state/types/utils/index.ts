import { Address } from "viem";
import { strategies, assets } from "../../settings/config";
import { Asset, Strategy } from "../AssetTypes";

// Determines if a given address is an Asset or a Strategy, or returns undefined if the address is not provided
export function getAssetTypeByAddress(address?: Address): "Asset" | "Strategy" | undefined {
  if (!address) return undefined;

  if (strategies[address]) {
    return "Strategy";
  }
  if (assets[address]) {
    return "Asset";
  }
  return undefined;
}

const arrayOfAll = [...Object.values(strategies), ...Object.values(assets)];
export function getAssetsAndStrategiesArray(): (Asset | Strategy)[] {
  return arrayOfAll;
}

// Retrieves an asset or strategy by address, or undefined if address is not provided or found
export function getAssetByAddress(address?: Address): Asset | Strategy | undefined {
  if (!address) return undefined;
  return strategies[address] || assets[address];
}

// Retrieves the 'description' from additionalData of an asset or strategy
export function getAssetDescription(address?: Address): string | undefined {
  const entity = getAssetByAddress(address);
  return entity?.additionalData?.description;
}

// Retrieves the 'vaultsFyiLink' from additionalData of a strategy
export function getAssetVaultsFyiLink(address?: Address): string | undefined {
  const entity = getAssetByAddress(address) as Strategy;
  return entity?.additionalData?.vaultsFyiLink;
}

// Checks if an asset or strategy is optimized by Gauntlet from additionalData
export function getAssetIsGauntletOptimized(address?: Address): boolean | undefined {
  const entity = getAssetByAddress(address);
  return entity?.additionalData?.isGauntletOptimized;
}

// Retrieves FAQ node if available in additionalData
export function getAssetFAQ(address?: Address): React.ReactNode | undefined {
  const entity = getAssetByAddress(address);
  return entity?.additionalData?.faq;
}

// Determines if the price should be fetched from CoinGecko
export function getAssetUseCoinGeckoPrice(address?: Address): boolean | undefined {
  const entity = getAssetByAddress(address);
  return entity?.additionalData?.useCoinGeckoPrice;
}
