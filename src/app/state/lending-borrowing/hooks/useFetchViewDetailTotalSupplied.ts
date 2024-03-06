import { Address } from "viem";
import { useFetchViewDetailAssetTotalSupply } from "../../asset/hooks/useFetchViewDetailAssetTotalSupply";
import { baseAssets } from "../config/BaseAssetsConfig";
import { Displayable } from "../../../../shared";
import { ViewDetailTotalSupplied } from "../types/ViewDetailTotalSupplied";

export const useFetchViewDetailTotalSupplied = (
  asset: Address
): Displayable<ViewDetailTotalSupplied> => {
  const baseAssetConfig = baseAssets.find((e) => e.address === asset)!;

  const {
    isLoading: isTotalSuppliedLoading,
    isFetched: isTotalSuppliedFetched,
    data: totalSupplied,
  } = useFetchViewDetailAssetTotalSupply(
    baseAssetConfig.sTokenAddress as Address
  );

  return {
    isLoading: isTotalSuppliedLoading,
    isFetched: isTotalSuppliedFetched,
    data: {
      totalSupplied: {
        ...totalSupplied.totalSupply,
      },
    },
  };
};
