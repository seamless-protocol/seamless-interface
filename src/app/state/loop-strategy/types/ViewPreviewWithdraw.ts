import { ValueSymbolPair } from "../../../../shared";

export interface ViewPreviewWithdraw {
  minReceivingAmount: bigint;
  assetsToReceive: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };
  cost: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };
}
