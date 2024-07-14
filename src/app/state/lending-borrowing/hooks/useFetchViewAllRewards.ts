import { Address, erc20Abi } from "viem";
import { getQueryClient } from "../../../contexts/CustomQueryClientProvider";
import { Config, useAccount, useConfig } from "wagmi";
import { readContractQueryOptions } from "wagmi/query";
import { rewardsControllerAbi, rewardsControllerAddress } from "../../../generated";
import { useQuery } from "@tanstack/react-query";
import { fetchAssetPriceInBlock } from "../../common/queries/useFetchViewAssetPrice";
import {
  Displayable,
  FetchBigInt,
  fFetchBigIntStructured,
  fUsdValueStructured,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { assetLogos } from "../../../../meta";
import { fetchAllRewardsAccruingAssets } from "../../common/hooks/useFetchAllRewardsAccruingAssets";
import { ViewAllUserRewards } from "../types/ViewAllUserRewards";

export interface AllRewards {
  totalRewardsUsd: FetchBigInt | undefined;
  rewards: {
    tokenAmount: FetchBigInt | undefined;
    dollarAmount: FetchBigInt | undefined;
    logo: string;
  }[];
}

async function fetchAllUserRewards(user: Address, config: Config): Promise<AllRewards> {
  const rewardsAccruingAssets = await fetchAllRewardsAccruingAssets(config);

  const queryClient = getQueryClient();

  const [rewardTokenList, unclaimedBalances] = await queryClient.fetchQuery(
    readContractQueryOptions(config!, {
      address: rewardsControllerAddress,
      abi: rewardsControllerAbi,
      functionName: "getAllUserRewards",
      args: [rewardsAccruingAssets, user],
    })
  );

  const result = [];
  let totalRewardsUsd = 0n;

  for (let i = 0; i < rewardTokenList.length; i++) {
    if (!unclaimedBalances[i]) {
      continue;
    }

    const rewardTokenPrice = await fetchAssetPriceInBlock(config, rewardTokenList[i]);

    const rewardTokenDecimals = await queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: rewardTokenList[i],
        abi: erc20Abi,
        functionName: "decimals",
      })
    );

    const rewardTokenSymbol = await queryClient.fetchQuery(
      readContractQueryOptions(config, {
        address: rewardTokenList[i],
        abi: erc20Abi,
        functionName: "symbol",
      })
    );

    const unclaimedBalanceUsd = cValueInUsd(unclaimedBalances[i], rewardTokenPrice, rewardTokenDecimals);
    totalRewardsUsd += unclaimedBalanceUsd || 0n;

    result.push({
      tokenAmount: fFetchBigIntStructured(unclaimedBalances[i], rewardTokenDecimals, rewardTokenSymbol),
      dollarAmount: fUsdValueStructured(unclaimedBalanceUsd),
      logo: assetLogos.get(rewardTokenSymbol) || "",
    });
  }

  return {
    totalRewardsUsd: fUsdValueStructured(totalRewardsUsd),
    rewards: result,
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
      })),
    },
  };
};
