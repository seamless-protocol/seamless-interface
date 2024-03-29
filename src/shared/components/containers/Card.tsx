import React, { HTMLAttributes } from "react";

import stylesv1 from "./styles/Card.v1.module.css";
import stylesv2 from "./styles/Card.v2.module.css";
import { IS_STYLE_VERSION_2 } from "../../../globals";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the card.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to be applied to the card.
   */
  className?: string;
}

/**
 * Card Component
 *
 * A versatile card component that can be used to display content.
 *
 * @example
 * ```jsx
 * <Card>This is card.</Card>
 * ```
 */

export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  const styles = IS_STYLE_VERSION_2 ? stylesv2 : stylesv1;

  return (
    <div className={`${styles.root} ${className || ""}`} {...props}>
      {children}
    </div>
  );
};
