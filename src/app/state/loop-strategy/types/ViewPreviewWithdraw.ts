import { ViewBigInt } from "../../../../shared";

export interface ViewPreviewWithdraw {
  assetsToReceive: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  cost: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
