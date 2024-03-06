import { Address } from "viem";
import { useFetchViewDetailAssetTotalSupply } from "../../asset/hooks/useFetchViewDetailAssetTotalSupply";
import { baseAssets } from "../config/BaseAssetsConfig";
import { Displayable } from "../../../../shared";
import { ViewDetailTotalBorrowed } from "../types/ViewDetailTotalBorrowed";

export const useFetchViewDetailTotalBorrowed = (
  asset: Address
): Displayable<ViewDetailTotalBorrowed> => {
  const baseAssetConfig = baseAssets.find((e) => e.address === asset)!;

  const {
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    data: totalBorrowed,
  } = useFetchViewDetailAssetTotalSupply(
    baseAssetConfig.debtTokenAddress as Address
  );

  return {
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    data: {
      totalBorrowed: {
        ...totalBorrowed.totalSupply,
      },
    },
  };
};
