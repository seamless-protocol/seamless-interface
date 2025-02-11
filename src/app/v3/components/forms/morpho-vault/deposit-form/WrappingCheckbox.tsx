import { Typography } from "../../../../../../shared";
import { RHFCheckboxField } from "../../../../../../shared/components/form/rhf/RHFCheckboxField";
import { ALLOW_WRAP_FIELD } from "./useIsWrapping";

export const WrappingCheckbox: React.FC<{}> = () => {
  return (
    <div className="mt-1 flex w-full items-center justify-end gap-1">
      <Typography type="bold">Allow Wrap</Typography>
      <RHFCheckboxField name={ALLOW_WRAP_FIELD} />
    </div>
  );
};
