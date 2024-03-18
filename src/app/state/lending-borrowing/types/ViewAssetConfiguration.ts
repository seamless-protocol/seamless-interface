import { ViewBigInt } from "../../../../shared";

export interface ViewAssetConfiguration {
  ltv: ViewBigInt;
  liquidationThreshold: ViewBigInt;
  liquidationPenalty: ViewBigInt;
  reserveFactor: ViewBigInt;
}
