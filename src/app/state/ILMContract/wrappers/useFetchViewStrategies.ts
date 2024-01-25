import { Displayable } from "../../../../shared";
import { ViewStrategy } from "../types/ViewStrategy";

export const useFetchViewStrategies = (): Displayable<ViewStrategy[]> => {
  return {
    isFetched: false,
    isLoading: false,
    data: [
      {
        strategyName: "cbETH Booster",
        depositAsset: {
          name: "Coinbase Staked Ether",
          description: "cbETH",
        },
        targetMultiple: "3.00x",
        LoopAPY: {
          value: "6.57",
          symbol: "%",
        },
        availableToDeposit: {
          tokenAmount: {
            value: "0.00",
            symbol: "ETH",
          },
          dollarAmount: {
            value: "0.00",
            symbol: "$",
          },
        },
        yourPosition: {
          tokenAmount: {
            value: "0.00",
            symbol: "ETH",
          },
          dollarAmount: {
            value: "0.00",
            symbol: "$",
          },
        },
      },
    ],
  };
};
