import cn from "classnames";
import React, {
  CSSProperties,
  ChangeEventHandler,
  InputHTMLAttributes,
} from "react";

import styles from "./InputSliderField.module.css";

interface InputSliderFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  label?: string;
}

interface CustomStyle extends CSSProperties {
  "--slider-percentage": string;
}

export const InputSliderField = React.forwardRef<
  HTMLInputElement,
  InputSliderFieldProps
>(({ min, max, value, label, onChange, ...rest }, ref) => {
  const classes = cn(styles.sliderContainer);
  const sliderClasses = cn(styles.sliderInput);

  const sliderPercentage = `${((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100}%`;
  const sliderStyle: CustomStyle = {
    "--slider-percentage": sliderPercentage,
  };

  return (
    <div className={classes}>
      <input
        ref={ref}
        className={sliderClasses}
        type="range"
        title={label || ""}
        style={sliderStyle as React.CSSProperties}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
});

InputSliderField.displayName = "InputSliderField";
