import { ViewBigInt } from "../../../../shared";

export interface ViewUserAccountData {
  balance: ViewBigInt;
  totalCollateral: ViewBigInt;
  totalDebt: ViewBigInt;
  availableBorrow: ViewBigInt;
  borrowPowerUsed: ViewBigInt;
  currentLiquidationThreshold: ViewBigInt;
  ltv: ViewBigInt;
  healthFactor: ViewBigInt;
}
