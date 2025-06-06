import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { Displayable, formatFetchBigIntToViewBigInt, ViewBigInt } from "@shared";
import { Address } from "viem";
import { assetLogos, USD_VALUE_DECIMALS } from "@meta";

export interface RewardsByLeverageToken {
  info: RewardsInfo[];
  totalRewardsUsd: ViewBigInt;
}

export interface RewardsInfo {
  address: Address;
  logo: string;
  symbol?: string;
  dollarAmount: ViewBigInt;
  tokenAmount: ViewBigInt;
}

// Shape of the raw (mocked) response
interface RawRewardsInfo {
  rewardsAddress: Address;
  tokenAmount: {
    value: bigint;
    symbol: string;
  };
  dollarAmount: bigint;
}

interface RawRewardsByLeverageToken {
  info: RawRewardsInfo[];
  totalRewardsUsd: bigint;
}

export const useFetchFormattedAllUserRewardsByLeverageToken = (
  leverageToken?: Address
): Displayable<RewardsByLeverageToken> => {
  const { address: user } = useAccount();

  // Tell useQuery that `data` will conform to RawRewardsByLeverageToken
  const { data, ...rest } = useQuery<RawRewardsByLeverageToken>({
    queryKey: ["hookAllUserRewardsByLeverageToken", user, leverageToken],
    // Mocked queryFn returning empty array and zero
    queryFn: async () =>
      Promise.resolve<RawRewardsByLeverageToken>({
        info: [],
        totalRewardsUsd: 0n,
      }),
    enabled: !!user && !!leverageToken,
  });

  const formattedData: RewardsByLeverageToken = {
    info:
      data?.info.map((info) => ({
        address: info.rewardsAddress,
        logo: assetLogos.get(info.tokenAmount.symbol) || "",
        symbol: info.tokenAmount.symbol,
        tokenAmount: formatFetchBigIntToViewBigInt({
          bigIntValue: info.tokenAmount.value,
          decimals: 18,
          symbol: info.tokenAmount.symbol,
        }),
        dollarAmount: formatFetchBigIntToViewBigInt({
          bigIntValue: info.dollarAmount,
          decimals: USD_VALUE_DECIMALS,
        }),
      })) || [],
    totalRewardsUsd: formatFetchBigIntToViewBigInt({
      bigIntValue: data?.totalRewardsUsd ?? 0n,
      decimals: USD_VALUE_DECIMALS,
    }),
  };

  return {
    ...rest,
    data: formattedData,
  };
};
