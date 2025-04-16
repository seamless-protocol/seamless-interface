import { InputHTMLAttributes, ChangeEventHandler, forwardRef } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultChecked" | "checked" | "type"> {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  variant?: "toggle-success" | "toggle-warning" | "toggle-info" | "toggle-error" | "toggle-primary";
}

export const CustomCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, className, variant, ...rest }, ref) => {
    const classes = `toggle toggle-sm ${variant} ${className || ""}`.trim();

    return <input ref={ref} type="checkbox" checked={checked} onChange={onChange} className={classes} {...rest} />;
  }
);

CustomCheckbox.displayName = "CustomCheckbox";
