import React, { HTMLAttributes } from "react";
import { Color } from "../../types/Color";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /**
   * @example
   * ```jsx
   * <Divider />
   * ```
   */
  variant?: Color;
}

/**
 * Divider Component
 *
 * @example
 * <Divider />
 */

export const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return <hr className={`bg-divider ${props.className}`} {...props} />;
};
