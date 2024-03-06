import { Address } from "viem";
import { baseAssets } from "../config/BaseAssetsConfig";
import { Displayable, useSeamlessContractRead } from "../../../../shared";
import {
  incentiveDataProviderAbi,
  incentiveDataProviderAddress,
} from "../../../generated";
import { AAVE_ADDRESS_PROVIDER } from "../../../meta";
import { useFetchDetailAssetTotalSupply } from "../../asset/hooks/useFetchViewDetailAssetTotalSupply";
import { useFetchCoinGeckoSeamPrice } from "../../common/hooks/useFetchCoinGeckoSeamPrice";
import {
  IncentiveApy,
  Incentives,
  parseIncentives,
} from "../../../../shared/utils/aaveIncentivesHelpers";
import { Fetch } from "../../../../shared/types/Fetch";
import { ViewIncentives } from "../types/ViewIncentives";
import { formatIncentiveApyToViewNumber } from "../../../../shared/utils/helpers";

interface SupplyIncentives {
  supplyIncentives: IncentiveApy;
}

export const useFetchSupplyIncentives = (
  asset: Address
): Fetch<SupplyIncentives> => {
  const baseAsset = baseAssets.find((e) => e.address === asset)!;

  const {
    isLoading: isIncentivesLoading,
    isFetched: isIncentivesFetched,
    data,
  } = useSeamlessContractRead({
    address: incentiveDataProviderAddress,
    abi: incentiveDataProviderAbi,
    functionName: "getReservesIncentivesData",
    args: [AAVE_ADDRESS_PROVIDER],
  });

  const {
    isLoading: isTotalSuppliedLoading,
    isFetched: isTotalSuppliedFetched,
    totalSupplyUsd: totalSuppliedUsd,
  } = useFetchDetailAssetTotalSupply(baseAsset.sTokenAddress);

  const seamPrice = useFetchCoinGeckoSeamPrice();

  let supplyIncentives = { totalApy: 0, rewardTokens: [] } as IncentiveApy;
  if (data && totalSuppliedUsd && seamPrice) {
    const incentives = data?.find((e: any) => e.underlyingAsset === asset) as
      | Incentives
      | undefined;

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
