import { ViewBigInt } from "../../../../shared";

export interface ViewDetailUserReserveData {
  supplied: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  borrowed: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  usageAsCollateralEnabled?: boolean;
}
