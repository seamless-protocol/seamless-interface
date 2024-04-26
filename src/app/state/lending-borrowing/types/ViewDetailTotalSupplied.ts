import { ViewBigInt } from "../../../../shared";

export interface ViewDetailTotalSupplied {
  totalSupplied: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  capacity: ViewBigInt | undefined;
}
