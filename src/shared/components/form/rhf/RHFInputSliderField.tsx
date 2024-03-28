import { InputHTMLAttributes } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { InputSliderField } from "../inputs/InputSliderField/InputSliderField";

type IProps<T> = {
  name: keyof T;
  rules?: RegisterOptions;
  label?: string;
};

type Props<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export function RHFInputSliderField<T>({
  name,
  rules,
  label,
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <InputSliderField
          label={label}
          {...field}
          value={field.value || 0}
          {...other}
        />
      )}
    />
  );
}
