import { ValueSymbolPair } from "../../../../shared";

export interface ViewPreviewDeposit {
  minReceivingShares: bigint;
  sharesToReceive: {
    tokenAmount: ValueSymbolPair;
    dollarAmount: ValueSymbolPair;
  };
}
