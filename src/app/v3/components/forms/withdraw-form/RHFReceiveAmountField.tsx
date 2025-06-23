import { IRHFAmountInputProps, RHFAmountInputV3, useToken } from "@shared";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { useFetchViewWithdrawSharesToReceive } from "../../../../data/ilmv1-deprecated/queries/useFetchWithdrawSharesToReceive";
import { useFetchFullStrategyData } from "../../../../data/ilmv1-deprecated/metadata/FullStrategyData.all";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
  debouncedAmount: string;
};

export function RHFReceiveAmountField<T>({ debouncedAmount, ...other }: IProps<T>) {
  const { strategy } = useFormSettingsContext();

  const { data: { underlying } = {} } = useFetchFullStrategyData(strategy);
  const tokenData = useToken(underlying);

  const { data: sharesToReceive, ...restShares } = useFetchViewWithdrawSharesToReceive(debouncedAmount, strategy);

  return (
    <RHFAmountInputV3
      {...other}
      name={other.name as string}
      assetAddress={underlying}
      dollarValue={{
        ...restShares,
        data: sharesToReceive.assetsToReceive.dollarAmount,
      }}
      disabled
      value={sharesToReceive.assetsToReceive.tokenAmount.value || "0"}
      hideMaxButton
      tokenData={{ ...tokenData }}
    />
  );
}
