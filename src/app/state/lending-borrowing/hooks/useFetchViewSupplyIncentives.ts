import { Address } from "viem";
import { Displayable } from "../../../../shared";
import { useFetchCoinGeckoSeamPrice } from "../../common/hooks/useFetchCoinGeckoSeamPrice";
import {
  IncentiveApy,
  parseIncentives,
} from "../../../../shared/utils/aaveIncentivesHelpers";
import { Fetch } from "../../../../shared/types/Fetch";
import { ViewIncentives } from "../types/ViewIncentives";
import { formatIncentiveApyToViewNumber } from "../../../../shared/utils/helpers";
import { useFetchDetailTotalSupplied } from "./useFetchViewDetailTotalSupplied";
import { useFetchRawReservesIncentivesDataByAsset } from "../queries/useFetchRawReservesIncentivesDataByAsset";

interface SupplyIncentives {
  supplyIncentives: IncentiveApy;
}

export const useFetchSupplyIncentives = (
  asset: Address
): Fetch<SupplyIncentives> => {
  const {
    isLoading: isIncentivesLoading,
    isFetched: isIncentivesFetched,
    data: incentives,
  } = useFetchRawReservesIncentivesDataByAsset(asset);

  const {
    isLoading: isTotalSuppliedLoading,
    isFetched: isTotalSuppliedFetched,
    data: { totalSuppliedUsd },
  } = useFetchDetailTotalSupplied(asset);

  const seamPrice = useFetchCoinGeckoSeamPrice();

  let supplyIncentives = { totalApy: 0, rewardTokens: [] } as IncentiveApy;
  if (incentives && totalSuppliedUsd && seamPrice) {
    if (incentives && incentives.aIncentiveData) {
      supplyIncentives = parseIncentives(
        incentives?.aIncentiveData,
        totalSuppliedUsd.bigIntValue,
        seamPrice
      );
    }
  }

  return {
    isLoading: isIncentivesLoading || isTotalSuppliedLoading,
    isFetched: isIncentivesFetched && isTotalSuppliedFetched,
    supplyIncentives,
  };
};

export const useFetchViewSupplyIncentives = (
  asset: Address
): Displayable<ViewIncentives> => {
  const { isLoading, isFetched, supplyIncentives } =
    useFetchSupplyIncentives(asset);

  return {
    isLoading,
    isFetched,
    data: {
      totalApy: formatIncentiveApyToViewNumber(supplyIncentives.totalApy),
      rewardTokens: supplyIncentives.rewardTokens,
    },
  };
};
