import { NumericFormat } from "react-number-format";
import React from "react";
import { InputFieldProps, CustomInput } from "./CustomInput";

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({ value, onChange, ...props }, ref) => {
  const MAX_VAL = props.max !== undefined ? props.max : Number.MAX_SAFE_INTEGER;
  const MIN_VAL = props.min !== undefined ? props.min : Number.MIN_SAFE_INTEGER;

  // todo: resolve this properly

  const withValueCap = (inputObj: { floatValue: any }) => {
    const { floatValue } = inputObj;
    return floatValue === undefined || (floatValue <= MAX_VAL && floatValue >= MIN_VAL);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = event.target.value.replace(/,/g, "");
    if (onChange) {
      onChange({
        ...event,
        target: {
          ...event.target,
          value: cleanedValue,
          name: event.target.name,
        },
      });
    }
  };

  return (
    <NumericFormat
      type="text"
      value={value}
      allowLeadingZeros
      thousandSeparator=","
      customInput={CustomInput}
      onChange={handleChange}
      isAllowed={withValueCap}
      getInputRef={ref}
      {...props}
    />
  );
});

InputField.displayName = "InputField";
