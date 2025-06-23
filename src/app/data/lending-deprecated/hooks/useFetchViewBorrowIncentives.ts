import { Address } from "viem";
import { Displayable, mergeQueryStates } from "../../../../shared";
import { ViewIncentives } from "../types/ViewIncentives";
import { formatIncentiveAprToViewNumber } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchDetailTotalBorrowed } from "./useFetchViewDetailTotalBorrowed";
import { useFetchRawReservesIncentivesDataByAsset } from "../queries/useFetchRawReservesIncentivesDataByAsset";
import { Incentives, IncentiveApr, parseIncentives } from "../../../../shared/utils/aaveIncentivesHelpers";

const cBorrowIncentives = (
  incentivesData: Incentives | undefined,
  totalBorrowedUsd: FetchBigInt | undefined
): IncentiveApr => {
  if (incentivesData == null || totalBorrowedUsd?.bigIntValue == null) {
    return { totalApr: undefined, rewardTokens: [] };
  }
  return parseIncentives(incentivesData.vIncentiveData, totalBorrowedUsd.bigIntValue);
};

interface BorrowIncentives {
  borrowIncentives: IncentiveApr;
}

export const useFetchBorrowIncentives = (asset: Address): FetchData<BorrowIncentives> => {
  const { data: incentives, ...incentivesRest } = useFetchRawReservesIncentivesDataByAsset(asset);
  const {
    data: { totalBorrowedUsd },
    ...totalBorrowedRest
  } = useFetchDetailTotalBorrowed(asset);

  const borrowIncentives = cBorrowIncentives(incentives, totalBorrowedUsd);

  return {
    ...mergeQueryStates([incentivesRest, totalBorrowedRest]),
    data: {
      borrowIncentives,
    },
  };
};

export const useFetchViewBorrowIncentives = (asset: Address): Displayable<ViewIncentives> => {
  const {
    data: { borrowIncentives },
    ...rest
  } = useFetchBorrowIncentives(asset);

  return {
    data: {
      totalApr: formatIncentiveAprToViewNumber(borrowIncentives.totalApr),
      rewardTokens: borrowIncentives.rewardTokens,
    },
    ...rest,
  };
};
