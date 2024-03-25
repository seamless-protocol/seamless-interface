import React, { HTMLAttributes } from "react";

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

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-white transition-shadow duration-300 ease-in-out delay-[0ms] rounded shadow-[rgba(0,0,0,0.05)_0px_2px_1px,rgba(0,0,0,0.25)_0px_0px_1px] border mt-0 border-solid border-[rgb(234,235,239)] ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
};
