import { IRHFAmountInputProps, RHFAmountInput } from "@shared";
import { useFormSettingsContext } from "../contexts/useFormSettingsContext";
import { useFetchViewWithdrawSharesToReceive } from "../../../../state/loop-strategy/hooks/useFetchWithdrawSharesToReceive";
import { useFetchFullStrategyData } from "../../../../statev3/metadata/StrategyState.all";

type IProps<T> = Omit<IRHFAmountInputProps, "assetPrice" | "walletBalance" | "assetAddress" | "assetButton"> & {
  name: keyof T;
  debouncedAmount: string;
};

export function RHFReceiveAmountField<T>({ debouncedAmount, ...other }: IProps<T>) {
  const { strategy } = useFormSettingsContext();
  const { data: { underlying } = {} } = useFetchFullStrategyData(strategy);
  const { data: sharesToReceive, ...restShares } = useFetchViewWithdrawSharesToReceive(debouncedAmount, strategy);

  return (
    <RHFAmountInput
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
    />
  );
}
