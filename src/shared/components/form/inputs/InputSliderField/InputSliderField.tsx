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

const renderMarkers = (
  min: number,
  max: number,
  onChange: ChangeEventHandler<HTMLInputElement>,
  value?: string | number | readonly string[] | undefined
) => {
  const markers = [];
  const numberOfSteps = max - min;
  for (let i = min; i <= max; i++) {
    const leftPercentage = ((i - min) / numberOfSteps) * 100;
    const adjustment = `calc(${leftPercentage}% + (${leftPercentage} * -12px / 100))`;

    markers.push(
      <button
        key={i}
        style={{
          left: adjustment,
        }}
        className={`bottom-3.5 w-3 h-3 absolute rounded-full border-2 border-navy-1000
          ${(Number(value) || 0) > i ? "bg-navy-1000" : "bg-neutral-0"}`}
        onClick={() => onChange({ target: { value: i.toString() } } as any)}
      />
    );
  }
  return markers;
};

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
    <div className={classes} style={sliderStyle as React.CSSProperties}>
      <div>{renderMarkers(Number(min), Number(max), onChange, value)}</div>
      <input
        ref={ref}
        className={sliderClasses}
        type="range"
        title={label || ""}
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
