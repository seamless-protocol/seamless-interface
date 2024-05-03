import { Address, erc20Abi } from "viem";
import { Displayable, ViewBigInt, useSeamlessContractRead, useToken } from "@shared";
import { DecimalsOptions, formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";

export const useFetchAssetTotalSupply = (asset: Address): FetchData<FetchBigInt | undefined> => {
  const { isLoading: isTokenDataLoading, isFetched: isTokenDataFetched, data: tokenData } = useToken(asset);

  const {
    data: totalSupply,
    isLoading: isTotalSupplyLoading,
    isFetched: isTotalSupplyFetched,
    ...rest
  } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "totalSupply",
  });

  return {
    isLoading: isTokenDataLoading || isTotalSupplyLoading,
    isFetched: isTokenDataFetched && isTotalSupplyFetched,
    ...rest,
    data: {
      bigIntValue: totalSupply || 0n,
      symbol: tokenData?.symbol,
      decimals: tokenData?.decimals,
    },
  };
};

export const useFetchViewAssetTotalSupply = (
  asset: Address,
  decimalsOptions?: Partial<DecimalsOptions>
): Displayable<ViewBigInt | undefined> => {
  const { data: balance, ...rest } = useFetchAssetTotalSupply(asset);

  return {
    ...rest,
    data: balance ? formatFetchBigIntToViewBigInt(balance, decimalsOptions) : undefined,
  };
};
