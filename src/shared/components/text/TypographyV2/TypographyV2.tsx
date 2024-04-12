import React from "react";
import { ComponentMap, TypographyColor, TypographyTypeV2, tailwindStyles } from "./mappers";

export interface TypographyPropsv2 {
  type?: TypographyTypeV2;
  className?: string;
  color?: TypographyColor;
  children: React.ReactNode;
  tagOverride?: "span" | "div" | undefined;
}

/**
 * `Typography` Component
 *
 * The `Typography` component is a versatile text styling tool designed to apply consistent typography styles across your application. It allows for easy implementation of various text styles and colors, adhering to a predefined design system.
 *
 * ## Key Features:
 * - **Predefined Typography Styles**: Supports a range of typography styles defined in `TypographyType`.
 * - **Color Customization**: Allows text color to be set using predefined options from `TypographyColor`.
 * - **Tag Flexibility**: Offers the option to override the default HTML tag associated with each typography style.
 * - **Extensibility with Custom Classes**: Accepts custom CSS classes for further styling flexibility.
 *
 * ## Props:
 * - `type`: A `TypographyType` value defining the style of the text (e.g., size, weight).
 * - `className`: Optional string for additional custom CSS classes.
 * - `color`: A `TypographyColor` value to set the text color.
 * - `children`: The text or content to be rendered.
 * - `tagOverride`: Optionally overrides the default HTML tag (like `div`, `span`) or remains undefined for default behavior.
 *
 * ## Usage:
 *
 * ```jsx
 * <Typography type="h1" color="primary">
 *   Hello World
 * </Typography>
 * ```
 *
 * In this example, the `Typography` component renders "Hello World" as a header with the primary color styling.
 *
 * @param props Props for the `Typography` component.
 * @returns The `Typography` component.
 */

export const TypographyV2: React.FC<TypographyPropsv2> = ({
  type = "regular4",
  className = "",
  tagOverride,
  children,
}) => {
  const Tag = tagOverride || ComponentMap[type] || "p";
  const styleClass = tailwindStyles[type] || "";
  const combinedClassNames = `${styleClass} ${className}`;

  // return <Tag className={combinedClassNames}>{children}</Tag>;
  return React.createElement(Tag, { className: combinedClassNames }, children);
};
