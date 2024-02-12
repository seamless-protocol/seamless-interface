import { Address } from "viem";
import { ValueSymbolPair } from "../../../../shared";

export interface ViewStrategy {
  strategyName?: string;
  depositAsset: {
    address?: Address;
    name?: string;
    symbol?: string;
    logo?: string;
  };
  targetMultiple?: string;
  LoopAPY?: ValueSymbolPair;
  availableToDeposit?: {
    tokenAmount?: ValueSymbolPair;
    dollarAmount?: ValueSymbolPair;
  };
  yourPosition?: {
    tokenAmount?: ValueSymbolPair;
    dollarAmount?: ValueSymbolPair;
  };
}
