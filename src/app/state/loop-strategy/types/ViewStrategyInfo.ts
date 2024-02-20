import { ViewBigInt } from "../../../../shared";

export interface ViewStrategyInfo {
  currentMultiple: ViewBigInt;
  targetMultiple: ViewBigInt;
  collateral: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  equity: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
