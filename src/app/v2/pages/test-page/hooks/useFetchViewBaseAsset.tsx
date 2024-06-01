import { Displayable, mergeQueryStates, ViewBigInt, ViewNumber } from "../../../../../shared";
import { baseAssets } from "../../../../state/lending-borrowing/config/BaseAssetsConfig";
import { Address } from "viem";
import { useFetchViewSupplyApy } from "../../../../state/lending-borrowing/hooks/useFetchViewSupplyApy";
import { useFetchViewBorrowApy } from "../../../../state/lending-borrowing/hooks/useFetchViewBorrowApy";
import { useFetchViewSupplyIncentives } from "../../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { useFetchViewBorrowIncentives } from "../../../../state/lending-borrowing/hooks/useFetchViewBorrowIncentives";
import { useFetchViewDetailTotalSupplied } from "../../../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewDetailTotalBorrowed } from "../../../../state/lending-borrowing/hooks/useFetchViewDetailTotalBorrowed";

export interface ViewRewardToken {
  symbol: string;
  logo: string;
  apr: ViewNumber;
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
    tokenAmount?: ViewBigInt;
    dollarAmount?: ViewBigInt;
  };
  supplyApy?: ViewNumber;
  borrowApyVariable?: ViewNumber;
  borrowApyStable: ViewNumber;

  supplyIncentives: {
    totalApr?: ViewNumber;
    rewardTokens: ViewRewardToken[];
  };
  borrowVariableIncentives: {
    totalApr?: ViewNumber;
    rewardTokens: ViewRewardToken[];
  };
}

export const useFetchViewBaseAsset = (index: number): Displayable<ViewBaseAsset> => {
  const baseAsset = baseAssets[index];

  const {
    data: { totalSupplied },
    ...totalSuppliedRest
  } = useFetchViewDetailTotalSupplied(baseAsset.address as Address);

  const {
    data: { totalBorrowed },
    ...totalBorrowedRest
  } = useFetchViewDetailTotalBorrowed(baseAsset.address as Address);

  const {
    data: { apy: supplyApy },
    ...supplyRest
  } = useFetchViewSupplyApy(baseAsset.address as Address);

  const {
    data: { apy: borrowApyVariable },
    ...totalBorrowApyRest
  } = useFetchViewBorrowApy(baseAsset.address as Address);

  const { data: supplyIncentives, ...supplyIncentivesRest } = useFetchViewSupplyIncentives(
    baseAsset.address as Address
  );

  const { data: borrowVariableIncentives, ...borrowIncentivesRest } = useFetchViewBorrowIncentives(
    baseAsset.address as Address
  );

  return {
    ...mergeQueryStates([
      borrowIncentivesRest,
      supplyIncentivesRest,
      totalBorrowApyRest,
      supplyRest,
      totalBorrowedRest,
      totalSuppliedRest,
    ]),
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
