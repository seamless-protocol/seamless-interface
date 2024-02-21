export type TypographyType =
  | "display1"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body1"
  | "body2"
  | "subheader1"
  | "subheader2"
  | "description"
  | "buttonL"
  | "buttonM"
  | "buttonS"
  | "helperText"
  | "tooltip"
  | "main21"
  | "secondary21"
  | "main16"
  | "secondary16"
  | "main14"
  | "secondary14"
  | "main12"
  | "secondary12";

export type TypographyColor =
  | "primary"
  | "secondary"
  | "disabled"
  | "muted"
  | "highlight"
  | "links"
  | "hover"
  | "light"
  | "dark";

export const tailwindStyles = {
  display1: "text-display1",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  body1: "text-body1",
  body2: "text-body2",
  subheader1: "text-subheader1",
  subheader2: "text-subheader2",
  subheader2Light: "text-subheader2Light",
  description: "text-description",
  buttonL: "text-buttonL",
  buttonM: "text-buttonM",
  buttonS: "text-buttonS",
  helperText: "text-helperText",
  tooltip: "text-tooltip",
  main21: "text-main21",
  secondary21: "text-secondary21",
  main16: "text-main16",
  secondary16: "text-secondary16",
  main14: "text-main14",
  secondary14: "text-secondary14",
  main12: "text-main12",
  secondary12: "text-secondary12",
};

export const textColorStyles: { [key in TypographyColor]: string } = {
  primary: "text-text-primary",
  secondary: "text-text-secondary",
  disabled: "text-text-disabled",
  muted: "text-text-muted",
  highlight: "text-text-highlight",
  links: "text-text-links",
  hover: "text-text-hover",
  light: "text-text-light",
  dark: "text-text-dark",
};

export const ComponentMap: { [key in TypographyType]: React.ElementType } = {
  display1: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body1: "p",
  body2: "p",
  subheader1: "p",
  subheader2: "p",
  description: "p",
  buttonL: "p",
  buttonM: "p",
  buttonS: "p",
  main12: "p",
  main14: "p",
  main16: "p",
  main21: "p",
  secondary12: "p",
  secondary14: "p",
  secondary16: "p",
  secondary21: "p",
  helperText: "span",
  tooltip: "span",
};
