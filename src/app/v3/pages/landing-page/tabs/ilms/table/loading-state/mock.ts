import { Displayable } from "../../../../../../../../shared";
import { LeverageToken } from "../../../../../../../data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";

const emptyViewBigInt = {
  value: undefined,
  viewValue: "-",
  bigIntValue: undefined,
  symbol: "",
  decimals: undefined,
};

export const propsMock: Displayable<LeverageToken> = {
  isLoading: true,
  isFetched: false,
  data: {
    address: "" as any,
    tokenData: {} as any,
    additionalData: {} as any,
    type: "",
    tvl: {} as any,
    availableSupplyCap: {
      dollarAmount: emptyViewBigInt,
      tokenAmount: emptyViewBigInt,
    },
    apy: {
      estimatedAPY: emptyViewBigInt,
      borrowAPY: emptyViewBigInt,
      yieldAPY: emptyViewBigInt,
      rewardTokens: [],
    },
  },
};
