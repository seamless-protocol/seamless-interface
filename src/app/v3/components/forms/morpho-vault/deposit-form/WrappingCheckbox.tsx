import { Typography } from "../../../../../../shared";
import { RHFCheckboxField } from "../../../../../../shared/components/form/rhf/RHFCheckboxField";
import { DEPOSIT_NATIVE_ETH, useIsETHWrapping } from "./useIsWrapping";

export const WrappingCheckbox: React.FC<{}> = () => {
  const depositNativeETH = useIsETHWrapping();

  return (
    <div className="mt-1 flex w-full items-center justify-end gap-1">
      <Typography type="bold">{depositNativeETH ? "Use ETH" : "Use WETH"}</Typography>
      <RHFCheckboxField name={DEPOSIT_NATIVE_ETH} />
    </div>
  );
};
