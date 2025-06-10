import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/leverageTokens";
import { Displayable } from "@shared";

export const propsMock: Displayable<LeverageToken> = {
  isLoading: true,
  isFetched: false,
  data: {
    address: "" as any,
    additionalData: {} as any,
    tvl: {} as any,
    limitsConfig: {} as any,
  },
};
