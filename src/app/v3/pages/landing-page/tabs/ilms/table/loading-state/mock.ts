import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/leverageTokens";
import { Displayable } from "@shared";

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
    additionalData: {} as any,
    tvl: {} as any,
    availableSupplyCap: {
      dollarAmount: emptyViewBigInt,
      tokenAmount: emptyViewBigInt,
    },
    limitsConfig: {} as any,
  },
};
