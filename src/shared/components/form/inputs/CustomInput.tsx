import { InputHTMLAttributes, ChangeEventHandler, forwardRef } from "react";

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value" | "type"> {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  type?: "password" | "tel" | "text" | undefined;
  value: string | number | null | undefined;
}

export const CustomInput = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange, name, placeholder, className, type = "text", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={` min-w-0 border-none focus:outline-none focus:ring-0 ${className || ""} *:
          ${rest.disabled ? "bg-action-disabled text-primary-600" : "bg-neutral-0"}`}
        autoComplete="off"
        value={value as any}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        step="any"
        // todo min 0?
        min={rest.min || 0}
        {...rest}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";
