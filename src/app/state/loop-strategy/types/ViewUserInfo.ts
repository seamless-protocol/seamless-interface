import { ValueSymbolPair } from "../../../../shared";

export interface ViewUserInfo {
  underlyingAssetBalance: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };

  strategyBalance: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };
}
