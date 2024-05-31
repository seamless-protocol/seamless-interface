import { createContext, ReactNode, useState } from "react";
import { Address } from "viem";
import { Asset, Strategy } from "../types/AssetTypes";
import { assetsConfig, strategiesConfig } from "../settings/config";

export interface AssetState extends Asset { }
export interface StrategyState extends Strategy { }

export type AssetType = "Asset" | "Strategy";
export type TagType = "LEND" | "ILM";

export interface AssetsContextType {
  assets: { [key: Address]: AssetState };
  strategies: { [key: Address]: StrategyState };
  getAssetsAndStrategiesArray(): (Asset | Strategy)[];
  getAssetTypeByAddress(address?: Address): AssetType | undefined;
  getAssetByAddress: (address?: Address) => AssetState | StrategyState | undefined;
  getStrategyBySubStrategy(address?: Address): Strategy | undefined;
  getHasMultipleAPYs(address?: Address): boolean;
  getAssetTag(address?: Address): TagType | undefined;
}

export const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export const AssetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets] = useState<{ [key: Address]: Asset }>(assetsConfig);
  const [strategies] = useState<{ [key: Address]: Strategy }>(strategiesConfig);

  function getAssetTypeByAddress(address?: Address): AssetType | undefined {
    if (!address) return undefined;
    if (assetsConfig[address]) {
      return "Asset";
    }
    if (strategiesConfig[address] || getStrategyBySubStrategy(address)) {
      return "Strategy";
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

    const matchingStrategy = getStrategyBySubStrategy(address);

    return matchingStrategy;
  }

  function getStrategyBySubStrategy(address?: Address): Strategy | undefined {
    if (!address) return undefined;

    const matchingStrategy = Object.values(strategiesConfig).find((strategy) =>
      strategy.subStrategyData.some((sub) => sub.address === address)
    );

    return matchingStrategy;
  }

  function getAssetTag(address?: Address): TagType | undefined {
    if (!address) return undefined;

    const types = getAssetTypeByAddress(address);
    if (!types) return undefined;

    if (types === "Asset") {
      return "LEND";
    }
    if (types === "Strategy") {
      return "ILM";
    }

    return undefined;
  }

  const getHasMultipleAPYs = (address?: Address): boolean => {
    if (!address) return false;

    const entity = strategies[address];
    if (!entity) return false;

    return entity.subStrategyData.length > 1;
  };

  return (
    <AssetsContext.Provider
      value={{
        assets,
        strategies,
        getAssetsAndStrategiesArray,
        getAssetTypeByAddress,
        getAssetByAddress,
        getStrategyBySubStrategy,
        getHasMultipleAPYs,
        getAssetTag,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};
