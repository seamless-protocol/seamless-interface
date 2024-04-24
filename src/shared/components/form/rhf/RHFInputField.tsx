import React, { InputHTMLAttributes } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { InputField } from "../inputs/InputField";
import { Typography } from "../../text/Typography/Typography";

// Define the props without generics
export type RHFInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  rules?: RegisterOptions;
  defaultValue?: string | number | null;
  fullWidth?: boolean;
};

// Forward ref implementation
export const RHFInputField = React.forwardRef<HTMLInputElement, RHFInputFieldProps>(
  ({ name, rules, ...other }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <InputField
              {...field}
              value={field.value || ""}
              {...other}
              ref={ref}
              type="text"
            />
            <Typography>{error?.message}</Typography>
          </>
        )}
      />
    );
  }
);

RHFInputField.displayName = "RHFInputField";