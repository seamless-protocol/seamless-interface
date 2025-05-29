import { SeamlessWriteAsyncParams } from "@shared";
import { type RewardItem } from "../contexts/RewardsProvider";

import fuulIcon from "@assets/logos/logo-fuul.svg";
import { useMutateClaimFuulRewards } from "../../../../../../statev3/fuul/mutations/useMutateClaimFuulRewards";
import { useFetchUserBalances } from "../../../../../../statev3/fuul/queries/fetch-user-balances/FetchUserBalances.hook";
import { IS_DEV_MODE } from "../../../../../../../globals";
import { useAccount } from "wagmi";
import { Address } from "viem";

const config = {
  id: "3",
  icon: fuulIcon,
  name: "Fuul rewards",
  description: "Fuul rewards",
};

export const useFuulRewardsWrapper = ({ settings }: { settings: SeamlessWriteAsyncParams }): RewardItem => {
  const { address } = useAccount();
  const { claimFuulRewardsAsync, isClaiming } = useMutateClaimFuulRewards({ ...settings });
  const { data } = useFetchUserBalances({
    where: {
      owner: IS_DEV_MODE ? "0x0019de95fa9953074432f7e66a8c5e8f043c8218" : address,
      //   project: "seamless", todo: not working?
    },
  });

  const rewards = data?.userBalances?.map((b) => ({
    tokenAmount: b.availableToClaimFormatted,
    logo: b.currencyToken.logo || "",
    address: b.currency as Address,
  }));

  return {
    ...config,
    claimAllAsync: claimFuulRewardsAsync,
    isClaiming,
    rewards: rewards || [],
  };
};
