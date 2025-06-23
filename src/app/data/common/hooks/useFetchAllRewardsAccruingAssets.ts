import { Config, useConfig } from "wagmi";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { readContractQueryOptions } from "wagmi/query";
import {
  lendingPoolAbi,
  lendingPoolAddress,
  protocolDataProviderAbi,
  protocolDataProviderAddress,
} from "../../../generated";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { strategyConfig } from "../../settings/config";

// This function returns all assets that are accruing rewards inside RewardsController contract
// This means that this function will return addresses of all strategies + all aTokens + all variableDebtTokens
export async function fetchAllRewardsAccruingAssets(config: Config) {
  const queryClient = getQueryClient();

  const strategies = Object.keys(strategyConfig) as Address[];

  const reservesList = await queryClient.fetchQuery(
    readContractQueryOptions(config, {
      address: lendingPoolAddress,
      abi: lendingPoolAbi,
      functionName: "getReservesList",
    })
  );

  const rewardsAccruingAssets = strategies;

  await Promise.all(
    reservesList.map(async (reserve) => {
      const [aTokenAddress, , variableDebtTokenAddress] = await queryClient.fetchQuery(
        readContractQueryOptions(config, {
          address: protocolDataProviderAddress,
          abi: protocolDataProviderAbi,
          functionName: "getReserveTokensAddresses",
          args: [reserve],
        })
      );

      rewardsAccruingAssets.push(aTokenAddress, variableDebtTokenAddress);
    })
  );

  return rewardsAccruingAssets;
}

// TODO: Staletime
export const useFetchAllRewardsAccruingAssets = () => {
  const config = useConfig();

  return useQuery({
    queryKey: ["fetchAllRewardsAccruingAssets"],
    queryFn: () => fetchAllRewardsAccruingAssets(config),
    enabled: !!config,
  });
};
