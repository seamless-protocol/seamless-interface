import { Address, erc20Abi } from "viem";
import { Displayable, mergeQueryStates, useSeamlessContractRead, useToken, FetchData, FetchBigInt } from "@shared";
import { DecimalsOptions, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewAssetBalance } from "../types/ViewAssetBalance";
import { useAccount } from "wagmi";

export const useFetchAssetBalance = (asset?: Address): FetchData<FetchBigInt | undefined> => {
  const account = useAccount();

  const { data: tokenData, ...restToken } = useToken(asset);

  const { data: balance, ...restBalance } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
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
