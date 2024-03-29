import { InputHTMLAttributes } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { InputField } from "../inputs/InputField";
import { Typography } from "../../text/Typography/Typography";

type IProps<T> = {
  name: keyof T;
  rules?: RegisterOptions;
  defaultValue?: string | number | null;
  fullWidth?: boolean;
};

export type RHFInputFieldProps<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export function RHFInputField<T>({ name, rules, ...other }: RHFInputFieldProps<T>) {
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
            // todo: resolve this properly

            value={(field.value as any) || ""}
            {...other}
            type="text"
          />
          <Typography>{error?.message}</Typography>
        </>
      )}
    />
  );
}
