import { Address } from "viem";
import { useFetchUserBalances } from "../../../../../../statev3/fuul/queries/fetch-user-balances/FetchUserBalances.hook";
import type { RewardsInfo } from "../../../../../../statev3/hooks/user-rewards-by-strategy/UserRewardsByStrategy.hook";
import { useSumRewardDollarAmounts } from "./SumRewardDollarAmounts";

export const useFuulRewardsWithDollarAmount = (address: Address) => {
  const { data: allUserRewards, ...allUserRewardsRest } = useFetchUserBalances({
    where: {
      owner: address,
    },
  });
  const rewards: RewardsInfo[] =
    allUserRewards?.userBalances?.map((b) => ({
      tokenAmount: b.availableToClaimFormatted,
      dollarAmount: b.availableToClaimDollarAmountFormatted,
      logo: b.currencyToken.logo || "",
      address: b.currency as Address,
    })) || [];

  const dollarAmount = useSumRewardDollarAmounts(rewards);

  return {
    ...allUserRewardsRest,
    data: {
      ...allUserRewards,
      rewards,
      dollarAmount,
    },
  };
};
