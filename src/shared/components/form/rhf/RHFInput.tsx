import React, { InputHTMLAttributes } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { Typography } from "../../text/Typography/Typography";
import { CustomInput } from "../inputs/CustomInput";

// Define the props without generics
export type RHFInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  rules?: RegisterOptions;
  defaultValue?: string | number | null;
  fullWidth?: boolean;
};

// Forward ref implementation
export const RHFInput = React.forwardRef<HTMLInputElement, RHFInputProps>(({ name, rules, ...other }, ref) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <CustomInput {...field} value={field.value || ""} {...other} ref={ref} type="text" />
          <Typography>{error?.message}</Typography>
        </>
      )}
    />
  );
});

RHFInput.displayName = "RHFInput";
