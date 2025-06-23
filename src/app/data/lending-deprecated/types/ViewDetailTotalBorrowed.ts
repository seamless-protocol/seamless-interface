import { ViewBigInt } from "../../../../shared";

export interface ViewDetailTotalBorrowed {
  totalBorrowed: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
