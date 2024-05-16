import { ViewBigInt } from "../../../../shared";

export interface ViewDetailTotalSupplied {
  totalSupplied: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  capacityPercentage: ViewBigInt | undefined;
  noSupplyCap?: boolean;
  capacityRemainingPercentage: ViewBigInt | undefined;
}
