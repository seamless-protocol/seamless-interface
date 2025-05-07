import { useMemo } from "react";
import { formatUnits } from "viem";
import { USD_VALUE_DECIMALS } from "../../../../../../../meta";
import { FetchData, Displayable, ViewBigInt, formatFetchBigIntToViewBigInt } from "../../../../../../../shared";
import { SharesToReceiveData } from "../../../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive";
import { cValueInUsd } from "../../../../../../statev3/common/math/cValueInUsd";

// Utility hook: compute shares and USD value of shares to receive
export function useReceiveAmounts(
  preview: FetchData<SharesToReceiveData>,
  assetPrice: Displayable<ViewBigInt>
): {
  receiveAmount: string;
  receiveAmountUsdValue: Displayable<ViewBigInt>;
} {
  const shares = preview.data?.sharesToReceive;
  const receiveAmount = shares?.bigIntValue && shares.decimals ? formatUnits(shares.bigIntValue, shares.decimals) : "0";

  const usdValue = useMemo(() => {
    const valBigInt = shares?.bigIntValue || 0n;
    const dec = shares?.decimals;
    const dollarBigInt = cValueInUsd(valBigInt, assetPrice.data?.bigIntValue, dec);
    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigInt,
      decimals: USD_VALUE_DECIMALS,
      symbol: "~$",
    });
  }, [shares?.bigIntValue, assetPrice.data?.bigIntValue, shares?.decimals]);

  // reuse preview's loading / error states for USD value
  return { receiveAmount, receiveAmountUsdValue: { ...preview, data: usdValue } };
}
