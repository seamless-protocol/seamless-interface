import { Displayable } from "../../../../shared";
import { baseAssets } from "../../../state/lending-borrowing/config/BaseAssetsConfig";
import { Address } from "viem";
import { ViewBaseAsset } from "../../../state/lending-borrowing/types/ViewBaseAsset";
import { useFetchViewDetailAssetTotalSupply } from "../../../state/asset/hooks/useFetchViewDetailAssetTotalSupply";
import { useFetchViewSupplyApy } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewBorrowApy } from "../../../state/lending-borrowing/hooks/useFetchViewBorrowApy";
import { useFetchViewIncentives } from "../../../state/lending-borrowing/hooks/useFetchIncentives";

export const useFetchViewBaseAsset = (
  index: number
): Displayable<ViewBaseAsset> => {
  const baseAsset = baseAssets[index];

  const {
    isLoading: isTotalSuppliedLoading,
    isFetched: isTotalSuppliedFetched,
    data: { totalSupply: totalSupplied },
  } = useFetchViewDetailAssetTotalSupply(baseAsset.sTokenAddress as Address);

  const {
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    data: { totalSupply: totalBorrowed },
  } = useFetchViewDetailAssetTotalSupply(baseAsset.debtTokenAddress as Address);

  const {
    isLoading: isSupplyApyLoading,
    isFetched: isSupplyApyFetched,
    data: { apy: supplyApy },
  } = useFetchViewSupplyApy(baseAsset.address as Address);

  const {
    isLoading: isBorrowApyLoading,
    isFetched: isBorrowApyFetched,
    data: { apy: borrowApyVariable },
  } = useFetchViewBorrowApy(baseAsset.address as Address);

  const {
    isLoading: isIncentivesLoading,
    isFetched: isIncentivesFetched,
    data: { supplyIncentives, borrowVariableIncentives },
  } = useFetchViewIncentives(baseAsset.address as Address);

  return {
    isLoading:
      isTotalSuppliedLoading ||
      isTotalBorrowedLoading ||
      isSupplyApyLoading ||
      isBorrowApyLoading ||
      isIncentivesLoading,
    isFetched:
      isTotalSuppliedFetched &&
      isTotalBorrowedFetched &&
      isSupplyApyFetched &&
      isBorrowApyFetched &&
      isIncentivesFetched,
    data: {
      depositAsset: {
        name: baseAsset.name,
        symbol: baseAsset.symbol,
        logo: baseAsset.logo,
      },
      totalSupplied,
      totalBorrowed,
      supplyApy,
      borrowApyVariable,
      supplyIncentives,
      borrowVariableIncentives,
      borrowApyStable: {
        value: 0,
        viewValue: "—",
        symbol: "",
      },
    },
  };
};
