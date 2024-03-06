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
import { ViewIncentives } from "../types/ViewIncentives";
import { formatIncentiveApyToViewNumber } from "../../../../shared/utils/helpers";
import { Fetch } from "../../../../shared/types/Fetch";

interface BorrowIncentives {
  borrowIncentives: IncentiveApy;
}

export const useFetchBorrowIncentives = (
  asset: Address
): Fetch<BorrowIncentives> => {
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
    isLoading: isTotalBorrowedLoading,
    isFetched: isTotalBorrowedFetched,
    totalSupplyUsd: totalBorrowedUsd,
  } = useFetchDetailAssetTotalSupply(baseAsset.debtTokenAddress);

  const seamPrice = useFetchCoinGeckoSeamPrice();

  let borrowIncentives = { totalApy: 0, rewardTokens: [] } as IncentiveApy;
  if (data && totalBorrowedUsd && seamPrice) {
    const incentives = data?.find(
      (e: any) => e.underlyingAsset === asset
    ) as Incentives;

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
