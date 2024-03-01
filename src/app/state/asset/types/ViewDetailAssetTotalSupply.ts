import { ViewBigInt } from "../../../../shared";

export interface ViewDetailAssetTotalSupply {
  totalSupply: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
