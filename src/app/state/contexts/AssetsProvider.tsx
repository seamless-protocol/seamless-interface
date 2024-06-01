import { createContext, ReactNode, useState } from "react";
import { Address } from "viem";
import { Asset, Strategy } from "../types/AssetTypes";

export type AssetType = "Asset" | "Strategy";
export type TagType = "LEND" | "ILM";

export interface AssetBase {
  address?: string
  type: AssetType;
  tags: TagType[];
}
export interface AssetState {
  address?: string
  type: AssetType;
}
export interface StrategyState {
  address?: string
}


export interface AssetsContextType {
  assets: { [key: Address]: AssetState };
  strategies: { [key: Address]: StrategyState };
}

export const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export const AssetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets] = useState<AssetState[]>([]);
  const [strategies] = useState<StrategyState[]>([]);

  function getAssetTypeByAddress(address?: Address): AssetType | undefined {
    if (!address) return undefined;
    if (assets.find(x => x.address === address)) {
      return "Asset";
    }
    if (strategies.find(x => x.address === address) || getStrategyBySubStrategy(address)) {
      return "Strategy";
    }
    return undefined;
  }

  function getAssetsAndStrategiesArray(): (Asset | Strategy)[] {
    return [...Object.values(strategies), ...Object.values(assets)];
  }

  function getAssetByAddress(address?: Address): Asset | Strategy | undefined {
    if (!address) return undefined;

    const directMatch = strategies[address] || assets[address];
    if (directMatch) {
      return directMatch;
    }

    const matchingStrategy = getStrategyBySubStrategy(address);

    return matchingStrategy;
  }

  function getStrategyByAddress(address?: Address): Strategy | undefined {
    if (!address) return undefined;

    const directMatch = strategies[address];
    if (directMatch) {
      return directMatch;
    }

    const matchingStrategy = getStrategyBySubStrategy(address);

    return matchingStrategy;
  }

  function getStrategyBySubStrategy(address?: Address): Strategy | undefined {
    if (!address) return undefined;

    const matchingStrategy = Object.values(strategies).find((strategy) =>
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
        getStrategyByAddress,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};
