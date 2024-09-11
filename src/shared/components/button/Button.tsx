import React, { ButtonHTMLAttributes } from "react";

import { Color } from "../../types/Color";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specifies the color variant of the button.
   * @example
   * ```jsx
   * <Button variant="primary">Primary Button</Button>
   * ```
   */
  color?: Color;

  /**
   * Specifies the size of the button.
   * @example
   * ```jsx
   * <Button size="big">Big Button</Button>
   * ```
   */
  size?: "small" | "normal" | "big";

  /**
   * If true, the button will take up the full width of its container.
   * @example
   * ```jsx
   * <Button fullWidth={true}>Full Width Button</Button>
   * ```
   */
  fullWidth?: boolean;

  /**
   * Renders spinners and disables button when set to true.
   * @example
   * ```jsx
   * <Button loading>Big Button</Button>
   * ```
   */
  loading?: boolean;

  /**
   * Specifies the style variant of the button: 'text', 'outlined', or 'contained'.
   * @example
   * ```jsx
   * <Button variant="text">Text Button</Button>
   * ```
   */
  variant?: "text" | "outlined" | "contained";

  /**
   * Optional attribute for test selectors.
   * @example
   * ```jsx
   * <Button data-cy="submit-button">Submit</Button>
   * ```
   */
  "data-cy"?: string;
}

/**
 * Button Component
 *
 * A versatile button component that can be used across the application. This component
 * provides flexibility with different sizes, color variants, and text styles. It also
 * provides an optional loading state which displays a spinner and disables the button.
 *
 * @example
 * ```jsx
 * <Button size="big" variant="primary" loading>
 *   Loading Button
 * </Button>
 * ```
 */

// TODO: IMPLEMENT COMPONENT PROPERLY!!!
export const Button: React.FC<ButtonProps> = ({
  color = "primary",

  size = "normal",

  variant = "contained",

  fullWidth = false,
  type = "button",

  className = "",
  loading,
  children,
  ...props
}) => {
  const classes = "";
  // TODO: IMPLEMENT COMPONENT PROPERLY!!!

  return (
    <button
      className={`${props.disabled || loading ? "bg-action-disabled bg-disabled" : "hover:bg-primary-dark bg-primary-main"} 
        flex items-center justify-center space-x-2"  
        rounded-[4px] py-[10px] px-6 
        text-text-primary text-description 
        ${fullWidth ? "w-full" : ""} ${className} ${classes}`}
      type={type}
      disabled={props.disabled || loading}
      {...props}
    >
      {children}
      {loading && <div className="loading loading-spinner loading-xs ml-1.5" />}
    </button>
  );
};
