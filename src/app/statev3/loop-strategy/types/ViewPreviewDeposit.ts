import { ViewBigInt } from "../../../../shared";

export interface ViewPreviewDeposit {
  sharesToReceive: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  cost: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
