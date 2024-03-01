import { Address, erc20Abi } from "viem";
import { useFetchAssetPrice } from "./useFetchViewAssetPrice";
import { useReadContract } from "wagmi";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { useToken } from "./useToken";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewDetailAssetTotalSupply } from "../types/ViewDetailAssetTotalSupply";
import { Displayable } from "../../../../shared/types/Displayable";

export interface DetailAssetTotalSupply {
  totalSupply: FetchBigInt;
  totalSupplyUsd: FetchBigInt;
}

export const useFetchDetailAssetTotalSupply = (
  asset: Address
): Fetch<DetailAssetTotalSupply> => {
  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    decimals,
  } = useToken(asset);

  let {
    isLoading: isTotalSupplyLoading,
    isFetched: isTotalSupplyFetched,
    data: totalSupply,
  } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "totalSupply",
  });

  const {
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    price,
  } = useFetchAssetPrice(asset);

  totalSupply = totalSupply || 0n;

  return {
    isLoading:
      isTokenDataLoading || isTotalSupplyLoading || isAssetPriceLoading,
    isFetched:
      isTokenDataFetched && isTotalSupplyFetched && isAssetPriceFetched,
    totalSupply: {
      bigIntValue: totalSupply,
      symbol: "",
      decimals,
    },
    totalSupplyUsd: {
      bigIntValue: (totalSupply * price.bigIntValue) / BigInt(10 ** decimals),
      symbol: "$",
      decimals: 8,
    },
  };
};

export const useFetchViewDetailAssetTotalSupply = (
  asset: Address
): Displayable<ViewDetailAssetTotalSupply> => {
  const { isLoading, isFetched, totalSupply, totalSupplyUsd } =
    useFetchDetailAssetTotalSupply(asset);

  return {
    isLoading,
    isFetched,
    data: {
      totalSupply: {
        tokenAmount: formatFetchBigIntToViewBigInt(totalSupply),
        dollarAmount: formatFetchBigIntToViewBigInt(totalSupplyUsd),
      },
    },
  };
};
