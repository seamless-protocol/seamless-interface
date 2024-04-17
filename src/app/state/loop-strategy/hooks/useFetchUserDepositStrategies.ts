import { Config, useAccount, useConfig } from "wagmi";
import { ilmAssetStrategiesMap } from "../config/StrategyConfig";
import { readContract } from "wagmi/actions";
import { Address } from "viem";
import { loopStrategyAbi } from "../../../generated";
import { useQuery } from "@tanstack/react-query";

interface Strategy {
  asset: Address;
  strategy: Address;
}

const fetchUserDepositStrategies = async (
  config: Config | undefined,
  user: Address | undefined
): Promise<Strategy[]> => {
  if (!config || !user) return [];

  const strategies: Strategy[] = [];

  // eslint-disable-next-line
  for (const depositAsset of ilmAssetStrategiesMap.keys()) {
    const strategy = ilmAssetStrategiesMap.get(depositAsset)?.[0];

    if (strategy) {
      // eslint-disable-next-line
      const balance = await readContract(config, {
        address: strategy.address,
        abi: loopStrategyAbi,
        functionName: "balanceOf",
        args: [user],
      });

      if (balance && balance > 0n) {
        strategies.push({
          asset: depositAsset,
          strategy: strategy.address,
        });
      }
    }
  }

  return strategies;
};

export const useFetchUserDepositStrategies = () => {
  const config = useConfig();
  const account = useAccount();

  return useQuery({
    queryKey: ["userDepositStrategies", account],
    queryFn: () => fetchUserDepositStrategies(config, account?.address),
  });
};
