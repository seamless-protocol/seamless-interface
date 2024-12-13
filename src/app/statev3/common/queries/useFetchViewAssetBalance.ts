import { Address, erc20Abi } from "viem";
import { Displayable, mergeQueryStates, useToken, FetchData, FetchBigInt } from "@shared";
import { DecimalsOptions, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { useAccount, useReadContract } from "wagmi";
import { ViewAssetBalance } from "../types/ViewAssetBalance";

export const useFetchAssetBalance = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  const account = useAccount();

  const { data: tokenData, ...restToken } = useToken(asset);

  const { data: balance, ...restBalance } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
    query: {
      enabled: !!account.address && !!asset,
    },
  });

  return {
    ...mergeQueryStates([restToken, restBalance]),
    data: {
      bigIntValue: balance,
      symbol: tokenData?.symbol,
      decimals: tokenData?.decimals,
    },
  };
};

export const useFetchViewAssetBalance = (
  asset?: Address,
  decimalsOptions?: Partial<DecimalsOptions>
): Displayable<ViewAssetBalance> => {
  const { data: balance, ...rest } = useFetchAssetBalance(asset);

  return {
    ...rest,
    data: {
      balance: formatFetchBigIntToViewBigInt(balance, decimalsOptions),
    },
  };
};
