import { Address } from "viem";
import { multiplyETH_ADDRESS_STRATEGY_ID, ethLong } from "../../../../meta";
import { strategiesConfig } from "../../../state/settings/config";

// TODO replace this mock with real implementation (in next PR)
export const useFetchStrategyByAddress = (_address?: Address) => {
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
