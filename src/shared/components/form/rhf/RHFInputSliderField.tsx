import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { InputSliderField, InputSliderFieldProps } from "../inputs/InputSliderField/InputSliderField";

type RHFInputSliderFieldProps = InputSliderFieldProps & {
  name: string;
  rules?: RegisterOptions;
};

export const RHFInputSliderField = React.forwardRef<HTMLInputElement, RHFInputSliderFieldProps>(
  ({ name, rules, label, ...other }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <InputSliderField label={label} {...field} value={field.value || 0} {...other} ref={ref} />
        )}
      />
    );
  }
);

RHFInputSliderField.displayName = "RHFInputSliderField";
