import { ViewBigInt } from "../../../../shared";

export interface ViewTokenBalanceUsd {
  balance: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}
