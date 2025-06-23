import { Address } from "viem";
import { Displayable, mergeQueryStates } from "../../../../shared";
import { IncentiveApr, parseIncentives } from "../../../../shared/utils/aaveIncentivesHelpers";
import { FetchData } from "../../../../shared/types/Fetch";
import { ViewIncentives } from "../types/ViewIncentives";
import { formatIncentiveAprToViewNumber } from "../../../../shared/utils/helpers";
import { useFetchDetailTotalSupplied } from "./useFetchViewDetailTotalSupplied";
import { useFetchRawReservesIncentivesDataByAsset } from "../queries/useFetchRawReservesIncentivesDataByAsset";

interface SupplyIncentives {
  supplyIncentives: IncentiveApr;
}

export const useFetchSupplyIncentives = (asset?: Address): FetchData<SupplyIncentives> => {
  const { data: incentives, ...rawRest } = useFetchRawReservesIncentivesDataByAsset(asset);

  const {
    data: { totalSuppliedUsd },
    ...totalSuppliedRest
  } = useFetchDetailTotalSupplied(asset);

  let supplyIncentives = { totalApr: 0, rewardTokens: [] } as IncentiveApr;
  if (incentives && totalSuppliedUsd && totalSuppliedUsd?.bigIntValue) {
    if (incentives && incentives.aIncentiveData) {
      supplyIncentives = parseIncentives(incentives?.aIncentiveData, totalSuppliedUsd.bigIntValue);
    }
  }

  return {
    ...mergeQueryStates([totalSuppliedRest, rawRest]),
    data: {
      supplyIncentives,
    },
  };
};

export const useFetchViewSupplyIncentives = (asset?: Address): Displayable<ViewIncentives> => {
  const {
    data: { supplyIncentives },
    ...rest
  } = useFetchSupplyIncentives(asset);

  return {
    ...rest,
    data: {
      totalApr: formatIncentiveAprToViewNumber(supplyIncentives.totalApr),
      rewardTokens: supplyIncentives.rewardTokens,
    },
  };
};
