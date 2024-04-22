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
  const promises = Array.from(ilmAssetStrategiesMap.keys()).map(async (depositAsset) => {
    const strategy = ilmAssetStrategiesMap.get(depositAsset)?.[0];
    if (!strategy) return undefined;

    const balance = await readContract(config, {
      address: strategy.address,
      abi: loopStrategyAbi,
      functionName: "balanceOf",
      args: [user],
    });

    if (balance && balance > 0n) {
      return {
        asset: depositAsset,
        strategy: strategy.address,
      };
    }
    return undefined;
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
