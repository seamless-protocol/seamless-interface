import { IRHFAmountInputProps, RHFAmountInput, formatFetchBigIntToViewBigInt } from "@shared";
import { useFetchAssetPrice } from "../../state/common/queries/useFetchViewAssetPrice";
import { useAssetPickerState } from "../hooks/useAssetPickerState";
import { useFetchViewAssetBalance } from "../../state/common/queries/useFetchViewAssetBalance";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { useMemo } from "react";
import { AssetButton } from "./AssetButton";
import { walletBalanceDecimalsOptions } from "@meta";

interface IProps<T>
  extends Omit<IRHFAmountInputProps<T>, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> {
  noAssetButton?: boolean;
}

export function RHFAmountInputWrapper<T>({ ...other }: IProps<T>) {
  const { asset } = useAssetPickerState({});

  const { data: price, ...otherPrice } = useFetchAssetPrice(asset);
  const { data: viewBalance, ...otherViewBalance } = useFetchViewAssetBalance(asset, walletBalanceDecimalsOptions);

  const { watch } = useFormContext();
  const value = watch(other.name);

  const dollarValueData = useMemo(() => {
    const valueBigInt = parseUnits(value, price.decimals);
    const dollarBigIntValue = (valueBigInt * price.bigIntValue) / BigInt(10 ** price.decimals);

    return formatFetchBigIntToViewBigInt({
      bigIntValue: dollarBigIntValue,
      decimals: price.decimals,
      symbol: "~$",
    });
  }, [value, price.decimals, price.bigIntValue]);

  return (
    <RHFAmountInput
      assetAddress={asset}
      {...other}
      dollarValue={{
        ...otherPrice,
        data: dollarValueData,
      }}
      walletBalance={{
        ...otherViewBalance,
        data: {
          ...viewBalance.balance,
        },
      }}
      assetButton={!other.noAssetButton ? <AssetButton /> : null}
    />
  );
}
