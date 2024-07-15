import { Address } from "viem";
import { assetsConfig, strategiesConfig } from "./config";
import { StrategyConfig } from "./configTypes";

export const getStrategyBySubStrategyAddress = (subStrategyAddress?: Address): StrategyConfig | undefined => {
  if (!subStrategyAddress) return undefined;

  return Object.values(strategiesConfig).find((strategy) =>
    strategy.subStrategyData.some((sub) => sub.address === subStrategyAddress)
  );
};

export const getStrategyBySubStrategyAddressOrAddress = (address?: Address): StrategyConfig | undefined => {
  if (!address) return undefined;

  if (strategiesConfig[address]) return strategiesConfig[address];

  return Object.values(strategiesConfig).find((strategy) =>
    strategy.subStrategyData.some((sub) => sub.address === address)
  );
};

export const getAllSubStrategies = () => {
  return Object.keys(strategiesConfig).flatMap((key) =>
    strategiesConfig[key].subStrategyData.map((subStrategy) => subStrategy.address)
  );
};

export const hasFaqByAddress = (address?: Address) => {
  if (!address) return false;

  return !!strategiesConfig[address]?.faq || !!assetsConfig[address]?.faq;
};
