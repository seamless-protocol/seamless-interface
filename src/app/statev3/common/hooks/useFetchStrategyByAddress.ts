import { Address } from "viem";
import { ethLong, multiplyETH_ADDRESS_STRATEGY_ID, WETH_ADDRESS, WSTETH_ADDRESS } from "../../../../meta";
import { assetsConfig, strategiesConfig } from "../../../state/settings/config";

/**
 * Retrieves a strategy state by its address.
 * Similar to `useFetchAssetByAddress` but specifically filters for strategies.
 *
 * @param address The blockchain address of the strategy to find.
 * @returns FetchData object containing the found strategy state or undefined if no strategy matches the address.
 */
export const useFetchStrategyByAddress = (address?: Address) => {
  const strategy = strategiesConfig[multiplyETH_ADDRESS_STRATEGY_ID];

  return {
    data: {
      ...strategy,
      address: ethLong,
      tags: "Short",
    },
    isFetched: true,
  };
};
