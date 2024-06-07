import { Address } from "viem";
import { strategiesConfig } from "./config";
import { StrategyConfig } from "./configTypes";

export const getStrategyBySubStrategyAddress = (subStrategyAddress?: Address): StrategyConfig | undefined => {
  if (!subStrategyAddress) return undefined;

  return Object.values(strategiesConfig).find((strategy) =>
    strategy.subStrategyData.some((sub) => sub.address === subStrategyAddress)
  );
};
