import { Address } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { lendingAssetToHide } from "../../../../meta";
import { strategiesConfig } from "../../settings/config";
import { LendMarketState, StrategyState } from "../types/StateTypes";
import { useSeamlessContractRead } from "../../../../shared";
import { lendingPoolAddress, lendingPoolAbi } from "../../../generated";
import { metadataQueryConfig } from "../../settings/queryConfig";

export const useFetchAllAssetsState = (): {
  state: FetchData<(LendMarketState | StrategyState)[]>;
} => {
  // todo: use existing raw query?
  const { data: lendingAssets, ...rest } = useSeamlessContractRead({
    address: lendingPoolAddress,
    abi: lendingPoolAbi,
    functionName: "getReservesList",
    query: {
      ...metadataQueryConfig,
    },
  });

  const lendingMarkets: LendMarketState[] | undefined = lendingAssets
    ?.filter((asset) => {
      return lendingAssetToHide.indexOf(asset?.toLowerCase()) === -1;
    })
    .map((asset) => ({
      address: asset,
      isStrategy: false,
      tags: ["LEND"],
    }));

  // todo: fetch this
  const ilmMarkets: StrategyState[] = [];
  Object.keys(strategiesConfig).forEach((key) => {
    ilmMarkets.push({
      isStrategy: true,
      tags: ["ILM"],
      ...strategiesConfig[key as Address],
    });
  });

  const data = lendingAssets ? [...ilmMarkets, ...(lendingMarkets || [])] : [];

  return {
    state: {
      data,
      ...rest,
    },
  };
};

export const useStateAssetByAddress = (address?: Address): FetchData<LendMarketState | StrategyState | undefined> => {
  const { state } = useFetchAllAssetsState();

  return {
    ...state,
    data: state.data.find((x) => x.address === address),
  };
};

export const useStateStrategyByAddress = (address?: Address): FetchData<StrategyState | undefined> => {
  const { state } = useFetchAllAssetsState();

  return {
    ...state,
    data: state.data.find((x) => x.address === address && x.isStrategy === true) as StrategyState,
  };
};

export const useStateHasMultipleAPYs = (address?: Address): FetchData<boolean | undefined> => {
  const { state } = useFetchAllAssetsState();

  // todo, replace with fatched state
  const strategy = address ? strategiesConfig[address] : undefined;
  return {
    ...state,
    data: strategy ? strategy.subStrategyData.length > 1 : false,
  };
};
