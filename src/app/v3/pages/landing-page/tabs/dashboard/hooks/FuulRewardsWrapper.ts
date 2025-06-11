import { FetchData, SeamlessWriteAsyncParams } from "@shared";
import type { Reward, RewardItem } from "../contexts/RewardsProvider";

import seamlessIcon from "@assets/logos/logo-seamless.svg";
import { useMutateClaimFuulRewards } from "../../../../../../statev3/fuul/mutations/useMutateClaimFuulRewards";
import { useFetchUserBalances } from "../../../../../../statev3/fuul/queries/fetch-user-balances/FetchUserBalances.hook";
import { useAccount } from "wagmi";
import { Address } from "viem";

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
