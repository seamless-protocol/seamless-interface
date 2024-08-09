import React, { HTMLAttributes } from "react";

import styles from "./styles/Card.v2.module.css";

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
  return (
    <div className={`${styles.root} ${className || ""}`} {...props}>
      {children}
    </div>
  );
};
