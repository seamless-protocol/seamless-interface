import { FetchData } from "../../../../shared/types/Fetch";
import { useMemo } from "react";
import { Incentives, RewardTokenInformation } from "../../../../shared/utils/aaveIncentivesHelpers";
import { useFetchRawReservesIncentivesData } from "./useFetchRawReservesIncentivesData";
import { mergeQueryStates } from "@shared";
import { MOCK_PRICE_ORACLE } from "@meta";
import { useFetchCoinGeckoPricesByAddress } from "../../common/hooks/useFetchCoinGeckoPrice";
import { assetsConfigAsCoingGeckoPriceParams } from "../../settings/landingMarketConfig";

/**
 * Fetches incentives data for given asset from smart contract. Data is not formatted to be used directly in UI.
 * Fetches data for all assets in lending pool and filters out the one for given asset
 * @param asset Asset to fetch incentives for
 * @returns Returns raw incentives data for given asset from smart contract. Data is not formatted due to complexity of structure
 */
export const useFetchRawReservesIncentivesDataByAsset = (asset?: string): FetchData<Incentives | undefined> => {
  const { data: cgPriceResults, ...cgPriceResultsRest } = useFetchCoinGeckoPricesByAddress(
    assetsConfigAsCoingGeckoPriceParams
  );

  const { data, ...rest } = useFetchRawReservesIncentivesData();

  const incentives: Incentives | undefined = useMemo(() => {
    const incentives = data?.find((e: { underlyingAsset: string | undefined }) => e.underlyingAsset === asset);
    if (!incentives) {
      return undefined;
    }

    const cgPriceResultsObject = cgPriceResults?.reduce<cgPriceMapping>((acc, result, index) => {
      acc[assetsConfigAsCoingGeckoPriceParams[index].address.toLowerCase()] = result;
      return acc;
    }, {});

    return {
      ...incentives,
      aIncentiveData: {
        ...incentives?.aIncentiveData,
        rewardsTokenInformation: incentives?.aIncentiveData?.rewardsTokenInformation.map(
          mapCGPriceData(cgPriceResultsObject)
        ),
      },
      sIncentiveData: {
        ...incentives?.sIncentiveData,
        rewardsTokenInformation: incentives?.sIncentiveData?.rewardsTokenInformation.map(
          mapCGPriceData(cgPriceResultsObject)
        ),
      },
      vIncentiveData: {
        ...incentives?.vIncentiveData,
        rewardsTokenInformation: incentives?.vIncentiveData?.rewardsTokenInformation.map(
          mapCGPriceData(cgPriceResultsObject)
        ),
      },
    };
  }, [data, asset, cgPriceResults]);

  return {
    ...mergeQueryStates([rest, cgPriceResultsRest]),
    data: incentives,
  };
};

interface cgPriceMapping {
  [address: string]: bigint | undefined;
}

export const mapCGPriceData =
  (cgPriceResultsObject?: cgPriceMapping) =>
  ({
    rewardOracleAddress,
    priceFeedDecimals,
    rewardPriceFeed,
    rewardTokenAddress,
    ...rest
  }: RewardTokenInformation) => {
    if (!rewardTokenAddress) {
      return undefined;
    }

    return {
      ...rest,
      rewardTokenAddress,
      rewardOracleAddress,
      rewardPriceFeed:
        rewardTokenAddress && rewardOracleAddress?.toLowerCase() === MOCK_PRICE_ORACLE.toLowerCase()
          ? cgPriceResultsObject?.[rewardTokenAddress.toLowerCase()] || 0n
          : rewardPriceFeed,
      priceFeedDecimals: rewardOracleAddress?.toLowerCase() === MOCK_PRICE_ORACLE.toLowerCase() ? 8 : priceFeedDecimals,
    };
  };
