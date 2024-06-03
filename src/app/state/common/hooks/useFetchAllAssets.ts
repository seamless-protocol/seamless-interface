import { Address } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { lendingAssetToHide } from "../../../../meta";
import { strategiesConfig } from "../../settings/config";
import { AssetState, StrategyState } from "../types/StateTypes";
import { useSeamlessContractRead } from "../../../../shared";
import { lendingPoolAddress, lendingPoolAbi } from "../../../generated";
import { metadataQueryConfig } from "../../settings/queryConfig";

export const useFetchAllAssetsState = (): {
  state: FetchData<(AssetState | StrategyState)[]>,
} => {
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
      isStrategy: false,
      tags: ["LEND"]
    }));

  const ilmMarkets: (StrategyState)[] = [];
  Object.keys(strategiesConfig).forEach((key) => {
    ilmMarkets.push({
      isStrategy: true,
      tags: ["ILM"],
      ...strategiesConfig[key as Address]
    });
  });

  const data = lendingAssets ? [...ilmMarkets, ...(lendingMarkets || [])] : [];

  return {
    state: {
      data,
      ...rest
    },
  };
};

export const useStateAssetByAddress = (address?: Address): FetchData<AssetState | StrategyState | undefined> => {
  const { state } = useFetchAllAssetsState();

  return {
    ...state,
    data: state.data.find(x => x.address === address),
  }
}

export const useStateStrategyByAddress = (address?: Address): FetchData<StrategyState | undefined> => {
  const { state } = useFetchAllAssetsState();

  return {
    ...state,
    data: state.data.find(x => x.address === address && x.isStrategy === true) as StrategyState,
  }
}

export const useStateHasMultipleAPYs = (address?: Address): FetchData<boolean | undefined> => {
  const { state } = useFetchAllAssetsState();

  const strategy = address ? strategiesConfig[address] : undefined;
  return {
    ...state,
    data: strategy ? strategy.subStrategyData.length > 1 : false,
  }
}

