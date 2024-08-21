import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { Displayable, formatFetchBigIntToViewBigInt, ViewBigInt } from "../../../../shared";
import { disableCacheQueryConfig } from "../../../state/settings/queryConfig";
import { fetchAllUserRewardsByStrategy } from "./UserRewardsByStrategy.fetch";

export interface FormattedUserRewards {
  rewardsAddresses: string[];
  rewardsAmounts: ViewBigInt[];
  rewardsSumAmount: ViewBigInt;
}

export const useAllUserRewardsByStrategy = (): Displayable<FormattedUserRewards> => {
  const { address: user } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: ["fetchAllUserRewardsByStrategy", user],
    queryFn: () =>
      fetchAllUserRewardsByStrategy({
        user: user!,
      }),
    enabled: !!user,
    ...disableCacheQueryConfig,
  });

  return {
    ...rest,
    data: {
      rewardsAddresses: data?.rewardsAddresses,
      rewardsAmounts: data?.rewardsAmounts.map((amount) => formatFetchBigIntToViewBigInt(amount)),
      rewardsSumAmount: formatFetchBigIntToViewBigInt(data?.rewardsSumAmount),
    },
  };
};
