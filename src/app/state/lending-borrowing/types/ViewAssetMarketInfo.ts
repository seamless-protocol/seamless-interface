import { ValueSymbolPair } from "../../../../shared";

export interface ViewAssetMarketInfo {
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
}
