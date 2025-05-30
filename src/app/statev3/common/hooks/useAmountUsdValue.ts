import { useMemo } from "react";
import { USD_VALUE_DECIMALS } from "@meta";
import { Displayable, ViewBigInt, fParseUnits, formatFetchBigIntToViewBigInt } from "@shared";
import { cValueInUsd } from "../math/cValueInUsd";

// Utility hook: compute USD value of an entered amount
export function useAmountUsdValue(
  amount: string | undefined,
  assetPrice: Displayable<ViewBigInt>,
  decimals?: number
): Displayable<ViewBigInt> {
  const usdValue = useMemo(() => {
    const valBigInt = fParseUnits(amount || "", decimals);
    const dollarBigInt = cValueInUsd(valBigInt, assetPrice.data?.bigIntValue, decimals);
    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigInt,
      decimals: USD_VALUE_DECIMALS,
      symbol: "~$",
    });
  }, [amount, assetPrice.data?.bigIntValue, decimals]);

  // reuse assetPrice's loading / error states
  return { ...assetPrice, data: usdValue };
}
