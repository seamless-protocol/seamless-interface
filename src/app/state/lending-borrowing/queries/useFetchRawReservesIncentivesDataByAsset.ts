import { useMemo } from "react";
import { Address } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { Incentives, RewardTokenInformation } from "../../../../shared/utils/aaveIncentivesHelpers";
import { useFetchRawReservesIncentivesData } from "./useFetchRawReservesIncentivesData";
import { assetsConfig } from "../../settings/config";
import { mergeQueryStates } from "../../../../shared";
import { useFetchCoinGeckoPricesByAddress } from "../../common/hooks/useFetchCoinGeckoPrice";

/**
 * Fetches incentives data for given asset from smart contract. Data is not formatted to be used directly in UI.
 * Fetches data for all assets in lending pool and filters out the one for given asset
 * @param asset Asset to fetch incentives for
 * @returns Returns raw incentives data for given asset from smart contract. Data is not formatted due to complexity of structure
 */
export const useFetchRawReservesIncentivesDataByAsset = (asset?: string): FetchData<Incentives | undefined> => {
  const cgPriceParams = Object.keys(assetsConfig)
    .filter((v) => !!assetsConfig[v as Address].useCoinGeckoPrice)
    .map((key) => ({
      address: assetsConfig[key as Address].address,
      precision: 8,
    }));

  const cgPriceResults = useFetchCoinGeckoPricesByAddress(cgPriceParams);

  const { data, ...rest } = useFetchRawReservesIncentivesData();

  const incentives: Incentives | undefined = useMemo(() => {
    const incentives = data?.find((e) => e.underlyingAsset === asset);
    if (!incentives) {
      return undefined;
    }
    const cgPriceResultsObject = cgPriceResults.reduce<cgPriceMapping>((acc, result, index) => {
      acc[cgPriceParams[index].address.toLowerCase()] = result.data;
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
    ...mergeQueryStates([rest, ...cgPriceResults]),
    data: incentives,
  };
};

const MOCK_PRICE_ORACLE = "0x602823807C919A92B63cF5C126387c4759976072";

interface cgPriceMapping {
  [address: string]: bigint | undefined;
}

export const mapCGPriceData =
  (cgPriceResultsObject: cgPriceMapping) =>
  ({
    rewardOracleAddress,
    priceFeedDecimals,
    rewardPriceFeed,
    rewardTokenAddress,
    ...rest
  }: RewardTokenInformation) => ({
    ...rest,
    rewardTokenAddress,
    rewardOracleAddress,
    rewardPriceFeed:
      rewardOracleAddress?.toLowerCase() === MOCK_PRICE_ORACLE.toLowerCase()
        ? cgPriceResultsObject[rewardTokenAddress.toLowerCase()] || 0n
        : rewardPriceFeed,
    priceFeedDecimals: rewardOracleAddress?.toLowerCase() === MOCK_PRICE_ORACLE.toLowerCase() ? 8 : priceFeedDecimals,
  });
