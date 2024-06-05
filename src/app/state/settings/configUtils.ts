import { Address } from "viem";
import { strategiesConfig } from "./config";
import { StrategyConfig } from "./configTypes";

export const getStrategyBySubstrategyAddress = (subStrategyAddress: Address): StrategyConfig | undefined => {
  return Object.values(strategiesConfig).find(strategy =>
    strategy.subStrategyData.some(sub => sub.address === subStrategyAddress)
  );
};

