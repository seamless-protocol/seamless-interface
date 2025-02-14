import { Typography, RHFCheckboxField } from "@shared";
import { DEPOSIT_NATIVE_ETH } from "./useDepositingNativeETH";

export const WrappingCheckbox: React.FC<{}> = () => {
  return (
    <div className="mt-1 flex w-full items-center justify-end gap-1">
      <Typography type="bold">Use ETH</Typography>
      <RHFCheckboxField data-cy="depositNativeETH" name={DEPOSIT_NATIVE_ETH} />
    </div>
  );
};
