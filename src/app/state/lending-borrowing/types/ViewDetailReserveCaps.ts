import { ViewBigInt } from "../../../../shared";

export interface ViewDetailReserveCaps {
  supplyCap: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
  borrowCap: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
