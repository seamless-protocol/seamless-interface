import { ValueSymbolPair, ViewBigInt, ViewNumber } from "../../../../shared";

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
    tokenAmount: ViewBigInt;
    dollarAmount: ViewNumber;
  };
  totalBorrowed: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewNumber;
  };
  supplyApy: ViewNumber;
  borrowApyVariable: ViewNumber;
  borrowApyStable: ViewNumber;

  supplyIncentives: {
    totalApy: ValueSymbolPair;
    rewardTokens: ViewRewardToken[];
  };
  borrowVariableIncentives: {
    totalApy: ValueSymbolPair;
    rewardTokens: ViewRewardToken[];
  };
}
