import { ViewBigInt } from "../../../../shared";

export interface ViewUserReserveData {
  aTokenBalance: ViewBigInt;
  variableDebtTokenBalance: ViewBigInt;
  usageAsCollateralEnabled?: boolean;
}
