import { Address } from "viem";
import { ViewBigInt, ViewNumber } from "../../../../shared";

export interface ViewStrategy {
  strategyName?: string;
  depositAsset: {
    address?: Address;
    name?: string;
    symbol?: string;
    logo?: string;
  };
  targetMultiple?: ViewBigInt;
  loopApy?: ViewNumber;
  availableToDeposit?: {
    tokenAmount?: ViewBigInt;
    dollarAmount?: ViewBigInt;
  };
  yourPosition?: {
    tokenAmount?: ViewBigInt;
    dollarAmount?: ViewBigInt;
  };
}
