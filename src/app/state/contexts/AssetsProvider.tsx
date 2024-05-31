import { createContext, ReactNode, useState, useContext } from "react";
import { Address } from "viem";
import { Asset, Strategy } from "../types/AssetTypes";
import { assetsConfig, strategiesConfig } from "../settings/config";

export interface AssetState extends Asset {}
export interface StrategyState extends Strategy {}

export type AssetType = "Asset" | "Strategy";

export interface AssetsContextType {
  assets: { [key: Address]: AssetState };
  strategies: { [key: Address]: StrategyState };
  getAssetsAndStrategiesArray(): (Asset | Strategy)[];
  getAssetTypeByAddress(address?: Address): AssetType | undefined;
  getAssetByAddress: (address?: Address) => AssetState | StrategyState | undefined;
  getAssetDescription: (address?: Address) => string | undefined;
  getAssetVaultsFyiLink: (address?: Address) => string | undefined;
  getAssetIsGauntletOptimized: (address?: Address) => boolean | undefined;
  getAssetFAQ: (address?: Address) => React.ReactNode | undefined;
  getAssetUseCoinGeckoPrice: (address?: Address) => boolean | undefined;
}

export const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export const AssetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets] = useState<{ [key: Address]: Asset }>(assetsConfig);
  const [strategies] = useState<{ [key: Address]: Strategy }>(strategiesConfig);

  function getAssetTypeByAddress(address?: Address): AssetType | undefined {
    if (!address) return undefined;

    if (strategiesConfig[address]) {
      return "Strategy";
    }
    if (assetsConfig[address]) {
      return "Asset";
    }
    return undefined;
  }

  function getAssetsAndStrategiesArray(): (Asset | Strategy)[] {
    return [...Object.values(strategiesConfig), ...Object.values(assetsConfig)];
  }

  function getAssetByAddress(address?: Address): Asset | Strategy | undefined {
    if (!address) return undefined;

    const directMatch = strategiesConfig[address] || assetsConfig[address];
    if (directMatch) {
      return directMatch;
    }

    const matchingStrategy = Object.values(strategiesConfig).find((strategy) =>
      strategy.subStrategyData.some((sub) => sub.address === address)
    );

    return matchingStrategy;
  }

  const getAssetDescription = (address?: Address): string | undefined => {
    const entity = getAssetByAddress(address);
    return entity?.additionalData?.description;
  };

  const getAssetVaultsFyiLink = (address?: Address): string | undefined => {
    const entity = getAssetByAddress(address) as Strategy;
    return entity?.additionalData?.vaultsFyiLink;
  };

  const getAssetIsGauntletOptimized = (address?: Address): boolean | undefined => {
    const entity = getAssetByAddress(address);
    return entity?.additionalData?.isGauntletOptimized;
  };

  const getAssetFAQ = (address?: Address): React.ReactNode | undefined => {
    const entity = getAssetByAddress(address);
    return entity?.additionalData?.faq;
  };

  const getAssetUseCoinGeckoPrice = (address?: Address): boolean | undefined => {
    const entity = getAssetByAddress(address);
    return entity?.additionalData?.useCoinGeckoPrice;
  };

  return (
    <AssetsContext.Provider
      value={{
        assets,
        strategies,
        getAssetsAndStrategiesArray,
        getAssetTypeByAddress,
        getAssetByAddress,
        getAssetDescription,
        getAssetVaultsFyiLink,
        getAssetIsGauntletOptimized,
        getAssetFAQ,
        getAssetUseCoinGeckoPrice,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssetsContext = () => useContext(AssetsContext) as AssetsContextType;
