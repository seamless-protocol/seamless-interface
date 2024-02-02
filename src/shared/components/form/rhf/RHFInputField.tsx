import { InputHTMLAttributes, ReactNode } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { Typography } from "../../text/Typography/Typography";
import { InputField } from "../inputs/InputField";

type IProps<T> = {
  name: keyof T;
  rightLabel?: ReactNode;
  leftLabel?: ReactNode;
  rules?: RegisterOptions;
  defaultValue?: string | number | null;
  fullWidth?: boolean;
};

type Props<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export function RHFInputField<T>({ name, rules, ...other }: Props<T>) {
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
