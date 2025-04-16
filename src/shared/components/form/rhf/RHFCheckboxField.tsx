import { InputHTMLAttributes, forwardRef } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { Typography } from "../../text/Typography/Typography";
import { CustomCheckbox } from "../inputs/CustomCheckbox";

export type RHFCheckboxFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultChecked" | "checked" | "type"
> & {
  name: string;
  rules?: RegisterOptions;
  defaultChecked?: boolean;
  variant?: "toggle-success" | "toggle-warning" | "toggle-info" | "toggle-error" | "toggle-primary";
};

export const RHFCheckboxField = forwardRef<HTMLInputElement, RHFCheckboxFieldProps>(
  ({ name, rules, variant, ...other }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomCheckbox {...field} checked={!!field.value} {...other} ref={ref} variant={variant} />
            {error && <Typography>{error.message}</Typography>}
          </>
        )}
      />
    );
  }
);

RHFCheckboxField.displayName = "RHFCheckboxField";
