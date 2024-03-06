import { Displayable, ViewBigInt, ViewNumber } from "../../../../shared";
import { baseAssets } from "../../../state/lending-borrowing/config/BaseAssetsConfig";
import { Address } from "viem";
import { useFetchViewDetailAssetTotalSupply } from "../../../state/asset/hooks/useFetchViewDetailAssetTotalSupply";
import { useFetchViewSupplyApy } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewBorrowApy } from "../../../state/lending-borrowing/hooks/useFetchViewBorrowApy";
import { useFetchViewIncentives } from "../../../state/lending-borrowing/hooks/useFetchIncentives";

export interface ViewRewardToken {
  symbol: string;
  logo: string;
  apy: number;
}
export interface ViewBaseAsset {
  depositAsset: {
    name?: string;
    symbol?: string;
    logo?: string;
  };
  totalSupplied: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  totalBorrowed: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  supplyApy: ViewNumber;
  borrowApyVariable: ViewNumber;
  borrowApyStable: ViewNumber;

  supplyIncentives: {
    totalApy: ViewNumber;
    rewardTokens: ViewRewardToken[];
  };
  borrowVariableIncentives: {
    totalApy: ViewNumber;
    rewardTokens: ViewRewardToken[];
  };
}

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
