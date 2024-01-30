import { ValueSymbolPair } from "../../../../shared";

export interface ViewStrategyInfo {
  currentMultiple: string;
  targetMultiple: string;
  collateral: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };
  equity: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };
}
