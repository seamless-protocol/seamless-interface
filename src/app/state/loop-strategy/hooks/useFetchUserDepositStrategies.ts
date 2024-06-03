import { Config, useAccount, useConfig } from "wagmi";
import { ilmAssetStrategiesMap } from "../config/StrategyConfig";
import { readContract } from "wagmi/actions";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { useQuery } from "@tanstack/react-query";
import { strategiesConfig } from "../../settings/config";

interface Strategy {
  asset: Address;
  strategy: Address;
}

const fetchUserDepositStrategies = async (
  config: Config | undefined,
  user: Address | undefined
): Promise<Strategy[]> => {
  if (!config || !user) return [];

  const strategies = Object.values(strategiesConfig);

  const promises = strategies.map(async (strategy) => {
    return Promise.all(strategy.subStrategyData.map(async (subStrategy) => {

      // const promises = Array.from(ilmAssetStrategiesMap.keys()).map(async (depositAsset) => {
      //   const strategy = ilmAssetStrategiesMap.get(depositAsset)?.[0];
      //   if (!strategy) return undefined;

      const balance = await readContract(config, {
        address: subStrategy?.address,
        abi: loopStrategyAbi,
        functionName: "balanceOf",
        args: [user],
      });

      if (balance && balance > 0n) {
        return {
          asset: strategy?.depositAsset,
          strategy: subStrategy,
        };
      }
      return undefined;
    }))
  });

  const strategies = (await Promise.all(promises)).filter((strategy): strategy is Strategy => strategy !== undefined);
  return strategies;
}

export const useFetchUserDepositStrategies = () => {
  const config = useConfig();
  const account = useAccount();

  return useQuery({
    queryKey: ["userDepositStrategies", account?.address],
    queryFn: () => fetchUserDepositStrategies(config, account?.address),
    enabled: !!account?.address && !!config
  });
};
