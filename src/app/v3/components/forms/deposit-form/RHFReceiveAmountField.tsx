import {
  IRHFAmountInputProps,
  RHFAmountInput,
  fParseUnits,
  formatFetchBigIntToViewBigInt,
  mergeQueryStates,
} from "@shared";
import { useMemo } from "react";
import { useFetchAssetPrice } from "../../../../state/common/queries/useFetchViewAssetPrice";
import { cValueInUsd } from "../../../../state/common/math/cValueInUsd";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { useFetchDepositSharesToReceive } from "../../../../state/loop-strategy/hooks/useFetchDepositSharesToReceive";
import { formatUnits } from "viem";
import { useFullTokenData } from "../../../../state/common/meta-data-queries/useFullTokenData";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
  debouncedAmount: string;
};

export function RHFReceiveAmountField<T>({ debouncedAmount, ...other }: IProps<T>) {
  // *** strategy *** //
  const { strategy } = useFormSettingsContext();

  // *** shares to receive *** //
  const {
    data: { sharesToReceive },
    ...sharesRest
  } = useFetchDepositSharesToReceive(debouncedAmount, strategy);
  const value =
    sharesToReceive?.bigIntValue && sharesToReceive?.decimals
      ? formatUnits(sharesToReceive.bigIntValue, sharesToReceive.decimals)
      : "0";

  // *** metadata *** //
  const {
    data: { decimals },
  } = useFullTokenData(strategy);

  // *** price *** //
  const { data: price, ...otherPrice } = useFetchAssetPrice({ asset: strategy });

  const dollarValueData = useMemo(() => {
    const valueBigInt = fParseUnits(value || "", decimals);
    const dollarBigIntValue = cValueInUsd(valueBigInt, price?.bigIntValue, decimals);

    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigIntValue,
      decimals: price.decimals,
      symbol: "~$",
    });
  }, [value, price.decimals, price.bigIntValue]);

  // *** rest *** //
  const rest = mergeQueryStates([sharesRest, otherPrice]);

  // *** JSX *** //
  return (
    <RHFAmountInput
      {...other}
      assetAddress={strategy}
      dollarValue={{
        ...rest,
        data: dollarValueData,
      }}
      disabled
      value={value}
      hideMaxButton
    />
  );
}
