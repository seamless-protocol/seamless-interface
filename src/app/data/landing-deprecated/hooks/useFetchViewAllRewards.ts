import { Address, erc20Abi } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { Config, useAccount, useConfig } from "wagmi";
import { readContractQueryOptions } from "wagmi/query";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";
import { useQuery } from "@tanstack/react-query";
import {
  Displayable,
  FetchBigInt,
  fFetchBigIntStructured,
  fUsdValueStructured,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { assetLogos } from "../../../../meta";
import { ViewAllUserRewards } from "../types/ViewAllUserRewards";
import { fetchAssetPriceInBlock } from "../../common/queries/useFetchViewAssetPrice";
import { fetchAllRewardsAccruingAssets } from "../../common/hooks/useFetchAllRewardsAccruingAssets";

export interface AllRewards {
  totalRewardsUsd: FetchBigInt | undefined;
  rewards: {
    tokenAmount: FetchBigInt | undefined;
    dollarAmount: FetchBigInt | undefined;
    logo: string;
    address: Address;
  }[];
}

async function fetchAllUserRewards(user: Address, config: Config): Promise<AllRewards> {
  const rewardsAccruingAssets = await fetchAllRewardsAccruingAssets(config);
  const queryClient = getQueryClient();

  const [rewardTokenList, unclaimedBalances] = await queryClient.fetchQuery(
    readContractQueryOptions(config, {
      address: rewardsControllerAddress,
      abi: rewardsControllerAbi,
      functionName: "getAllUserRewards",
      args: [rewardsAccruingAssets, user],
    })
  );

  const rewardDataPromises = rewardTokenList.map(async (rewardToken, i) => {
    if (!unclaimedBalances[i]) return null;

    const [rewardTokenPrice, rewardTokenDecimals, rewardTokenSymbol] = await Promise.all([
      fetchAssetPriceInBlock(config, rewardToken),
      queryClient.fetchQuery(
        readContractQueryOptions(config, {
          address: rewardToken,
          abi: erc20Abi,
          functionName: "decimals",
        })
      ),
      queryClient.fetchQuery(
        readContractQueryOptions(config, {
          address: rewardToken,
          abi: erc20Abi,
          functionName: "symbol",
        })
      ),
    ]);

    const unclaimedBalanceUsd = cValueInUsd(unclaimedBalances[i], rewardTokenPrice, rewardTokenDecimals);

    return {
      tokenAmount: fFetchBigIntStructured(unclaimedBalances[i], rewardTokenDecimals, rewardTokenSymbol),
      dollarAmount: fUsdValueStructured(unclaimedBalanceUsd),
      logo: assetLogos.get(rewardTokenSymbol) || "",
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

export const useFetchAllRewards = () => {
  const config = useConfig();
  const account = useAccount();

  return useQuery({
    queryKey: ["fetchAllUserRewards", account.address],
    queryFn: () => fetchAllUserRewards(account!.address!, config),
    enabled: !!account.address && !!config,
  });
};

export const useFetchViewAllUserRewards = (): Displayable<ViewAllUserRewards> => {
  const { data, ...rest } = useFetchAllRewards();

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
