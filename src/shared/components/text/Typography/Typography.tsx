import {
  ComponentMap,
  TypographyColor,
  TypographyType,
  tailwindStyles,
  textColorStyles,
} from "./mappers";

interface TypographyProps {
  type?: TypographyType;
  className?: string;
  color?: TypographyColor;
  children: React.ReactNode;
  tagOverride?: "span" | undefined;
}

export const Typography: React.FC<TypographyProps> = ({
  type = "main16",
  className = "",
  color,
  tagOverride,
  children,
}) => {
  const Tag = tagOverride ? tagOverride : ComponentMap[type];
  const styleClass = tailwindStyles[type] || "";
  const colorClass = color ? textColorStyles[color] : "";
  const combinedClassNames = `${styleClass} ${colorClass} ${className}`;

  return <Tag className={combinedClassNames}>{children}</Tag>;
};
