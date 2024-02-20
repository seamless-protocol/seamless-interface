import { ViewBigInt } from "../../../../shared";

export interface ViewUserInfo {
  underlyingAssetBalance: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };

  strategyBalance: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
