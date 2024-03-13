import { Address, erc20Abi } from "viem";
import { Displayable, useSeamlessContractRead } from "../../../../shared";
import {
  DecimalsOptions,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared/utils/helpers";
import { useToken } from "../../../../shared/state/meta-data-queries/useToken";
import { ViewAssetBalance } from "../types/ViewAssetBalance";
import { useAccount } from "wagmi";

export const useFetchAssetBalance = (asset: Address) => {
  const account = useAccount();

  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    data: { symbol, decimals },
  } = useToken(asset);

  const {
    data: balance,
    isLoading: isBalanceLoading,
    isFetched: isBalanceFetched,
    ...rest
  } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });

  return {
    isLoading: isTokenDataLoading || isBalanceLoading,
    isFetched: isTokenDataFetched && isBalanceFetched,
    ...rest,
    data: {
      bigIntValue: balance || 0n,
      symbol: symbol,
      decimals: decimals,
    },
  };
};

export const useFetchViewAssetBalance = (
  asset: Address,
  decimalsOptions?: Partial<DecimalsOptions>
): Displayable<ViewAssetBalance> => {
  const { isLoading, isFetched, data: balance } = useFetchAssetBalance(asset);

  return {
    isLoading,
    isFetched,
    data: {
      balance: formatFetchBigIntToViewBigInt(balance, decimalsOptions),
    },
  };
};
