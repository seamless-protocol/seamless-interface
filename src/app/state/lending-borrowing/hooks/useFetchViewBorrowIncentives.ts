import { Address } from "viem";
import { Displayable } from "../../../../shared";
import { useFetchCoinGeckoSeamPrice } from "../../common/hooks/useFetchCoinGeckoSeamPrice";
import {
  IncentiveApy,
  parseIncentives,
} from "../../../../shared/utils/aaveIncentivesHelpers";
import { ViewIncentives } from "../types/ViewIncentives";
import { formatIncentiveApyToViewNumber } from "../../../../shared/utils/helpers";
import { Fetch } from "../../../../shared/types/Fetch";
import { useFetchDetailTotalBorrowed } from "./useFetchViewDetailTotalBorrowed";
import { useFetchRawReservesIncentivesDataByAsset } from "../queries/useFetchRawReservesIncentivesDataByAsset";

interface BorrowIncentives {
  borrowIncentives: IncentiveApy;
}

export const useFetchBorrowIncentives = (
  asset: Address
): Fetch<BorrowIncentives> => {
  const {
    isLoading: isIncentivesLoading,
    isFetched: isIncentivesFetched,
    data: incentives,
  } = useFetchRawReservesIncentivesDataByAsset(asset);

  const {
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    data: { totalBorrowedUsd },
  } = useFetchDetailTotalBorrowed(asset);

  const seamPrice = useFetchCoinGeckoSeamPrice();

  let borrowIncentives = { totalApy: 0, rewardTokens: [] } as IncentiveApy;
  if (incentives && totalBorrowedUsd && seamPrice) {
    if (incentives && incentives.vIncentiveData) {
      borrowIncentives = parseIncentives(
        incentives?.vIncentiveData,
        totalBorrowedUsd.bigIntValue,
        seamPrice
      );
    }
  }

  return {
    isLoading: isIncentivesLoading || isTotalBorrowedLoading,
    isFetched: isIncentivesFetched && isTotalBorrowedFetched,
    borrowIncentives,
  };
};

export const useFetchViewBorrowIncentives = (
  asset: Address
): Displayable<ViewIncentives> => {
  const { isLoading, isFetched, borrowIncentives } =
    useFetchBorrowIncentives(asset);

  return {
    isLoading,
    isFetched,
    data: {
      totalApy: formatIncentiveApyToViewNumber(borrowIncentives.totalApy),
      rewardTokens: borrowIncentives.rewardTokens,
    },
  };
};
