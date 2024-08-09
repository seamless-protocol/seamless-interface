import { useConfig, useAccount, Config } from "wagmi";
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

  const strategiesArray = Object.values(strategiesConfig);
  const promises: Promise<Strategy | undefined>[] = strategiesArray.map(async (strategy) => {
    const balance = await readContract(config, {
      address: strategy.address,
      abi: loopStrategyAbi,
      functionName: "balanceOf",
      args: [user],
    });

    if (balance && balance > 0n) {
      return {
        asset: strategy.underlyingAsset.address,
        strategy: strategy.address,
      };
    }
    return undefined;
  });

  const strategyResults = await Promise.all(promises);
  return strategyResults.filter((strategy): strategy is Strategy => strategy !== undefined);
};

export const useFetchUserDepositStrategies = () => {
  const config = useConfig();
  const account = useAccount();

  return useQuery({
    queryKey: ["userDepositStrategies", account?.address],
    queryFn: () => fetchUserDepositStrategies(config, account?.address),
    enabled: !!account?.address && !!config,
  });
};
