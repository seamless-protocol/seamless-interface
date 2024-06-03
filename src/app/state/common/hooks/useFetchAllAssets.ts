import { Address } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { lendingAssetToHide } from "../../../../meta";
import { strategiesConfig } from "../../settings/config";
import { AssetState, StrategyState } from "../types/StateTypes";
import { useSeamlessContractRead } from "../../../../shared";
import { lendingPoolAddress, lendingPoolAbi } from "../../../generated";
import { metadataQueryConfig } from "../../settings/queryConfig";

export const useFetchAllAssets = (): FetchData<(AssetState | StrategyState)[]> => {
  // todo: use existing raw query?
  const { data: lendingAssets, ...rest } = useSeamlessContractRead({
    address: lendingPoolAddress,
    abi: lendingPoolAbi,
    functionName: "getReservesList",
    query: {
      ...metadataQueryConfig
    }
  });

  // todo: fetch this
  const lendingMarkets: AssetState[] | undefined = lendingAssets
    ?.filter((asset) => {
      return lendingAssetToHide.indexOf(asset?.toLowerCase()) === -1;
    })
    .map((asset) => ({
      address: asset,
      type: "Asset",
      tags: ["LEND"]
    }));

  const ilmMarkets: (AssetState | StrategyState)[] = [];

  const data = lendingAssets ? [...ilmMarkets, ...(lendingMarkets || [])] : [];

  Object.keys(strategiesConfig).forEach((key) => {
    ilmMarkets.push({
      address: strategiesConfig[key as Address].address,
      type: "Strategy",
      tags: ["ILM"]
    });
  });

  const getAssetByAddress = (address?: Address): AssetState | StrategyState | undefined => {
    if (!address) return undefined;
    return data.find(x => x.address === address);
  }

  const getHasMultipleAPYs = (address?: Address): boolean => {
    if (!address) return false;

    const entity = strategiesConfig[address];
    if (!entity) return false;

    return entity.subStrategyData.length > 1;
  };

  return {
    ...rest,
    data
  };
};
