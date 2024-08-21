import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { Displayable, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { disableCacheQueryConfig } from "../../../state/settings/queryConfig";
import { fetchAllUserRewardsByStrategy } from "./UserRewardsByStrategy.fetch";
import { Address } from "viem";
import { assetLogos } from "@meta";

export interface RewardsByStrategy {
  info: RewardsInfo[];
  totalRewardsUsd: ViewBigInt;
}

interface RewardsInfo {
  address: Address;
  logo: string;
  symbol: string;
}

export const useAllUserRewardsByStrategy = (strategy?: Address): Displayable<RewardsByStrategy> => {
  const { address: user } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ["fetchAllUserRewardsByStrategy", user, strategy],
    queryFn: () =>
      fetchAllUserRewardsByStrategy({
        user: user!,
        strategy: strategy!,
      }),
    enabled: !!user && !!strategy,
    ...disableCacheQueryConfig,
  });

  const formattedData: RewardsByStrategy = {
    info:
      data?.info.map((info) => ({
        address: info.rewardsAddress,
        logo: assetLogos.get(info.rewardsAddress) || "",
        symbol: info.rewardsSymbol || "",
      })) || [],
    totalRewardsUsd: formatFetchBigIntToViewBigInt(data?.totalRewards),
  };

  return {
    ...rest,
    data: formattedData,
  };
};
