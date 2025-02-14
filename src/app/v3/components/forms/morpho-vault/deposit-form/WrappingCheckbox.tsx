import { Typography } from "../../../../../../shared";
import { RHFCheckboxField } from "../../../../../../shared/components/form/rhf/RHFCheckboxField";
import { DEPOSIT_NATIVE_ETH, useDepositingNativeETH } from "./useDepositingNativeETH";

export const WrappingCheckbox: React.FC<{}> = () => {
  const depositNativeETH = useDepositingNativeETH();

  return (
    <div className="mt-1 flex w-full items-center justify-end gap-1">
      <Typography type="bold">{depositNativeETH ? "Use ETH" : "Use WETH"}</Typography>
      <RHFCheckboxField data-cy="depositNativeETH" name={DEPOSIT_NATIVE_ETH} />
    </div>
  );
};
