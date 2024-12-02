import { Address } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { lendingAssetToHide } from "../../../../meta";
import { strategiesConfig } from "../../settings/config";
import { LendMarketState, StrategyState } from "../types/StateTypes";
import { lendingPoolAddress, lendingPoolAbi } from "../../../generated";
import { metadataQueryConfig } from "../../../statev3/settings/queryConfig";
import { useReadContract } from "wagmi";

/**
 * This hook combines data from multiple sources: the lending pool and configured strategies.
 * It filters out assets that are specified to be hidden and categorizes assets as lending or ILM (Investment Lending Market).
 *
 * @returns An object containing a `state` with a combined list of `LendMarketState` and `StrategyState` along with additional properties for managing the fetch state.
 */
export const useFetchAllAssets = (): {
  state: FetchData<(LendMarketState | StrategyState)[]>;
} => {
  // todo: use existing raw query?
  const { data: lendingAssets, ...rest } = useReadContract({
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

  // todo: fetch rest of the things for strategies?
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
