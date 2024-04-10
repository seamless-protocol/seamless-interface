import { ViewBigInt } from "../../../../shared";

export interface ViewDetailReserveTvl {
  tvl: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
