import { ValueSymbolPair } from "../../../../shared";

export interface ViewRewardToken {
  symbol: string;
  logo: string;
  apy: number;
}
export interface ViewBaseAsset {
  depositAsset: {
    name: string;
    symbol: string;
    logo: string;
  };
  totalSupplied: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };
  totalBorrowed: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };
  supplyApy: ValueSymbolPair;
  borrowApyVariable: ValueSymbolPair;
  borrowApyStable: ValueSymbolPair;

  supplyIncentives: {
    totalApy: ValueSymbolPair;
    rewardTokens: ViewRewardToken[];
  };
  borrowVariableIncentives: {
    totalApy: ValueSymbolPair;
    rewardTokens: ViewRewardToken[];
  };
}
