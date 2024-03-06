import { ViewBigInt } from "../../../../shared";

export interface ViewAssetCaps {
  supplyCap: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  borrowCap: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
