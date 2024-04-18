import React, { CSSProperties, ChangeEventHandler, InputHTMLAttributes } from "react";

import styles from "./InputSliderField.module.css";

export interface InputSliderFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  label?: string;
  enabledMin?: number;
  enabledMax?: number;
}

interface CustomStyle extends CSSProperties {
  "--slider-percentage": string;
}

const renderMarkers = (
  min: number,
  max: number,
  enabledMin: number,
  enabledMax: number,
  onChange?: ChangeEventHandler<HTMLInputElement>,
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
        className={`bottom-3.5 w-3 h-3 absolute rounded-full border-2 
                    ${i >= enabledMin && i <= enabledMax ? "border-navy-1000" : "border-gray-400 cursor-default"}
                    ${(Number(value) || 0) >= i ? "bg-navy-1000" : "bg-neutral-0"}`}
        onClick={() => {
          if (i >= enabledMin && i <= enabledMax) {
            onChange?.({ target: { value: i.toString() } } as any);
          }
        }}
        disabled={i < enabledMin || i > enabledMax}
      />
    );
  }
  return markers;
};

export const InputSliderField = React.forwardRef<HTMLInputElement, InputSliderFieldProps>(
  ({ min, max, enabledMin = min, enabledMax = max, value, label, onChange, ...rest }, ref) => {
    const classes = styles.sliderContainer;
    const sliderClasses = styles.sliderInput;

    const sliderPercentage = `${((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100}%`;
    const sliderStyle: CustomStyle = {
      "--slider-percentage": sliderPercentage,
    };

    return (
      <div className={classes} style={sliderStyle as React.CSSProperties}>
        {renderMarkers(Number(min), Number(max), Number(enabledMin), Number(enabledMax), onChange, value)}
        <input
          ref={ref}
          className={sliderClasses}
          type="range"
          title={label || ""}
          min={enabledMin}
          max={enabledMax}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>
    );
  }
);

InputSliderField.displayName = "InputSliderField";

InputSliderField.displayName = "InputSliderField";
