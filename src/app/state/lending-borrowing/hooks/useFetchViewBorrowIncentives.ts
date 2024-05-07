import { Address } from "viem";
import { Displayable, mergeQueryStates } from "../../../../shared";
import { useFetchCoinGeckoSeamPrice } from "../../common/hooks/useFetchCoinGeckoPrice";
import { ViewIncentives } from "../types/ViewIncentives";
import { formatIncentiveAprToViewNumber } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { useFetchDetailTotalBorrowed } from "./useFetchViewDetailTotalBorrowed";
import { useFetchRawReservesIncentivesDataByAsset } from "../queries/useFetchRawReservesIncentivesDataByAsset";
import { Incentives, IncentiveApr, parseIncentives } from "../../../../shared/utils/aaveIncentivesHelpers";

const cBorrowIncentives = (
  incentivesData: Incentives | undefined,
  totalBorrowedUsd: FetchBigInt | undefined,
  seamPrice: bigint | undefined
): IncentiveApr => {
  if (incentivesData == null || seamPrice == null || totalBorrowedUsd?.bigIntValue == null) {
    return { totalApr: undefined, rewardTokens: [] };
  }
  return parseIncentives(incentivesData.vIncentiveData, totalBorrowedUsd.bigIntValue, seamPrice);
};


interface BorrowIncentives {
  borrowIncentives: IncentiveApr;
}

export const useFetchBorrowIncentives = (asset: Address): FetchData<BorrowIncentives> => {
  const { data: incentives, ...incentivesRest } = useFetchRawReservesIncentivesDataByAsset(asset);
  const { data: { totalBorrowedUsd }, ...totalBorrowedRest } = useFetchDetailTotalBorrowed(asset);
  const { data: seamPrice, ...seamPriceRest } = useFetchCoinGeckoSeamPrice();

  const borrowIncentives = cBorrowIncentives(incentives, totalBorrowedUsd, seamPrice);

  return {
    ...mergeQueryStates([incentivesRest, totalBorrowedRest, seamPriceRest]),
    data: {
      borrowIncentives
    }
  };
};

export const useFetchViewBorrowIncentives = (asset: Address): Displayable<ViewIncentives> => {
  const { data: { borrowIncentives }, ...rest } = useFetchBorrowIncentives(asset);

  return {
    data: {
      totalApr: formatIncentiveAprToViewNumber(borrowIncentives.totalApr),
      rewardTokens: borrowIncentives.rewardTokens,
    },
    ...rest,
  };
};
