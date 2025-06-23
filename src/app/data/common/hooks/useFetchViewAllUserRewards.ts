import { Address } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { useAccount } from "wagmi";
import { readContractQueryOptions } from "wagmi/query";
import { rewardsControllerAbi } from "@generated";
import { useQuery } from "@tanstack/react-query";
import {
  Displayable,
  FetchBigInt,
  fFetchBigIntStructured,
  fUsdValueStructured,
  fetchToken,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared";
import { cValueInUsd } from "../math/cValueInUsd";
import { safetyModuleRewardController } from "@meta";
import { ViewAllUserRewards } from "../../lending-deprecated/types/ViewAllUserRewards";
import { fetchAssetPriceInBlock } from "../queries/AssetPrice.hook";
import { getConfig } from "../../../utils/queryContractUtils";

export interface AllRewards {
  totalRewardsUsd: FetchBigInt | undefined;
  rewards: {
    tokenAmount: FetchBigInt | undefined;
    dollarAmount: FetchBigInt | undefined;
    logo: string;
    address: Address;
  }[];
}

export const fetchGetAllUserRewardsQueryOptions = (user: Address, rewardsAccruingAssets: Address[]) => ({
  ...readContractQueryOptions(getConfig(), {
    address: safetyModuleRewardController,
    abi: rewardsControllerAbi,
    functionName: "getAllUserRewards",
    args: [rewardsAccruingAssets, user],
  }),
});

export async function fetchAllUserRewards(user: Address, rewardsAccruingAssets: Address[]): Promise<AllRewards> {
  const queryClient = getQueryClient();

  const [rewardTokenList, unclaimedBalances] = await queryClient.fetchQuery({
    ...fetchGetAllUserRewardsQueryOptions(user, rewardsAccruingAssets),
  });

  const rewardDataPromises = rewardTokenList.map(async (rewardToken, i) => {
    if (!unclaimedBalances[i]) return null;

    const [rewardTokenPrice, rewardTokenData] = await Promise.all([
      fetchAssetPriceInBlock(rewardToken),
      fetchToken(rewardToken),
    ]);
    const { decimals: rewardTokenDecimals, symbol: rewardTokenSymbol, logo: rewardTokenLogo } = rewardTokenData;

    const unclaimedBalanceUsd = cValueInUsd(unclaimedBalances[i], rewardTokenPrice?.bigIntValue, rewardTokenDecimals);

    return {
      tokenAmount: fFetchBigIntStructured(unclaimedBalances[i], rewardTokenDecimals, rewardTokenSymbol),
      dollarAmount: fUsdValueStructured(unclaimedBalanceUsd),
      logo: rewardTokenLogo,
      unclaimedBalanceUsd,
      address: rewardToken,
    };
  });

  const rewardData = (await Promise.all(rewardDataPromises)).filter((item) => item !== null) as {
    tokenAmount: FetchBigInt | undefined;
    dollarAmount: FetchBigInt | undefined;
    logo: string;
    unclaimedBalanceUsd: bigint;
    address: Address;
  }[];

  const totalRewardsUsd = rewardData.reduce((sum, reward) => sum + (reward.unclaimedBalanceUsd || 0n), 0n);

  return {
    totalRewardsUsd: fUsdValueStructured(totalRewardsUsd),
    rewards: rewardData.map(({ tokenAmount, dollarAmount, logo, address }) => ({
      tokenAmount,
      dollarAmount,
      logo,
      address,
    })),
  };
}

export const fetchGetAllUserRewardsHookQK = (rewardsAccruingAssets: Address[], user?: Address) => [
  "fetchAllUserRewards",
  rewardsAccruingAssets,
  user,
];

export const useFetchAllRewards = (rewardsAccruingAssets: Address[]) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: fetchGetAllUserRewardsHookQK(rewardsAccruingAssets, address),
    queryFn: () => fetchAllUserRewards(address!, rewardsAccruingAssets),
    enabled: !!address,
  });
};

export const useFetchViewAllUserRewards = (rewardsAccruingAssets: Address[]): Displayable<ViewAllUserRewards> => {
  const { data, ...rest } = useFetchAllRewards(rewardsAccruingAssets);

  return {
    ...rest,
    data: {
      totalRewards: formatFetchBigIntToViewBigInt(data?.totalRewardsUsd),
      rewards: data?.rewards?.map((reward) => ({
        tokenAmount: formatFetchBigIntToViewBigInt(reward.tokenAmount),
        dollarAmount: formatFetchBigIntToViewBigInt(reward.dollarAmount),
        logo: reward.logo,
        address: reward.address,
      })),
    },
  };
};
