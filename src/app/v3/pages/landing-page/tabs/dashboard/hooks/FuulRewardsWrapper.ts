import { FetchData, SeamlessWriteAsyncParams } from "@shared";
import type { Reward, RewardItem } from "../contexts/RewardsProvider";

import seamlessIcon from "@assets/logos/logo-seamless.svg";
import { useMutateClaimFuulRewards } from "../../../../../../data/fuul/mutations/useMutateClaimFuulRewards";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { useFetchUserBalances } from "../../../../../../data/fuul/queries/fetch-user-balances/FetchUserBalances.hook";

const config = {
  id: "3",
  icon: seamlessIcon,
  name: "Leverage Token Rewards",
  description: "",
};

export const useFuulRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): FetchData<RewardItem> => {
  const { address } = useAccount();
  const { claimFuulRewardsAsync, isClaiming } = useMutateClaimFuulRewards({ ...settings });
  const { data, ...rest } = useFetchUserBalances({
    where: {
      owner_: {
        address: address?.toLowerCase(),
      },
      project_: { deployedAddress: import.meta.env.VITE_FUUL_DEPLOYED_ADDRESS },
    },
  });

  const rewards: Reward[] =
    data?.userBalances?.map((b) => ({
      tokenAmount: b.availableToClaimFormatted,
      dollarAmount: b.availableToClaimDollarAmountFormatted,
      logo: b.currencyToken.logo || "",
      address: b.currency as Address,
    })) || [];

  return {
    ...rest,
    data: {
      ...config,
      claimAllAsync: claimFuulRewardsAsync,
      isClaiming,
      rewards: rewards || [],
    },
  };
};
