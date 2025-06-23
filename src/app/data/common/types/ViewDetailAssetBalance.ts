import { ViewBigInt } from "../../../../shared";

export interface ViewDetailAssetBalance {
  balance: {
    tokenAmount?: ViewBigInt;
    dollarAmount?: ViewBigInt;
  };
}
