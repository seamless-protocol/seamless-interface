import { Displayable, ViewBigInt, ViewNumber } from "../../../../shared";
import { baseAssets } from "../../../state/lending-borrowing/config/BaseAssetsConfig";
import { Address } from "viem";
import { useFetchViewSupplyApy } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewBorrowApy } from "../../../state/lending-borrowing/hooks/useFetchViewBorrowApy";
import { useFetchViewSupplyIncentives } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { useFetchViewBorrowIncentives } from "../../../state/lending-borrowing/hooks/useFetchViewBorrowIncentives";
import { useFetchViewDetailTotalSupplied } from "../../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewDetailTotalBorrowed } from "../../../state/lending-borrowing/hooks/useFetchViewDetailTotalBorrowed";

export interface ViewRewardToken {
  symbol: string;
  logo: string;
  apr: number;
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
    totalApr: ViewNumber;
    rewardTokens: ViewRewardToken[];
  };
  borrowVariableIncentives: {
    totalApr: ViewNumber;
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
    data: { totalSupplied },
  } = useFetchViewDetailTotalSupplied(baseAsset.address as Address);

  const {
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    data: { totalBorrowed },
  } = useFetchViewDetailTotalBorrowed(baseAsset.address as Address);

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
    isLoading: isSupplyIncentivesLoading,
    isFetched: isSupplyIncentivesFetched,
    data: supplyIncentives,
  } = useFetchViewSupplyIncentives(baseAsset.address as Address);

  const {
    isLoading: isBorrowVariableIncentivesLoading,
    isFetched: isBorrowVariableIncentivesFetched,
    data: borrowVariableIncentives,
  } = useFetchViewBorrowIncentives(baseAsset.address as Address);

  return {
    isLoading:
      isTotalSuppliedLoading ||
      isTotalBorrowedLoading ||
      isSupplyApyLoading ||
      isBorrowApyLoading ||
      isSupplyIncentivesLoading ||
      isBorrowVariableIncentivesLoading,
    isFetched:
      isTotalSuppliedFetched &&
      isTotalBorrowedFetched &&
      isSupplyApyFetched &&
      isBorrowApyFetched &&
      isSupplyIncentivesFetched &&
      isBorrowVariableIncentivesFetched,
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
