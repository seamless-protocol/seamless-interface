import { ComponentMap, TypographyColor, TypographyType, tailwindStyles, textColorStyles } from "./mappers";

export interface TypographyPropsV1 {
  type?: TypographyType;
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

// todo: rename to typographyV1
export const TypographyV1: React.FC<TypographyPropsV1> = ({
  type = "main16",
  className = "",
  color,
  tagOverride,
  children,
}) => {
  const Tag = tagOverride || ComponentMap[type];
  const styleClass = tailwindStyles[type] || "";
  const colorClass = color ? textColorStyles[color] : "";
  const combinedClassNames = `${styleClass} ${colorClass} ${className}`;

  return <Tag className={combinedClassNames}>{children}</Tag>;
};
