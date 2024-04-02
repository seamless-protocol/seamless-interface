type Text = "bold" | "medium" | "regular";
type Size = "" | "1" | "2" | "3" | "4" | "5" | "6" | "7";

export type TypographyTypeV2 = `${Text}${Size}`;

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
  bold7: "text-bold7",
  bold6: "text-bold6",
  bold5: "text-bold5",
  bold4: "text-bold4",
  bold3: "text-bold3",
  bold2: "text-bold2",
  bold1: "text-bold1",
  bold: "text-bold",
  medium7: "text-medium7",
  medium6: "text-medium6",
  medium5: "text-medium5",
  medium4: "text-medium4",
  medium3: "text-medium3",
  medium2: "text-medium2",
  medium1: "text-medium1",
  medium: "text-medium",
  regular7: "text-regular7",
  regular6: "text-regular6",
  regular5: "text-regular5",
  regular4: "text-regular4",
  regular3: "text-regular3",
  regular2: "text-regular2",
  regular1: "text-regular1",
  regular: "text-regular",
};

export const ComponentMap = {
  bold7: "h1",
  bold6: "h2",
  bold5: "h3",
  bold4: "h4",
  bold3: "h5",
  bold2: "h6",
  bold1: "p",
  bold: "p",

  medium7: "h1",
  medium6: "h2",
  medium5: "h3",
  medium4: "h4",
  medium3: "h5",
  medium2: "h6",
  medium1: "p",
  medium: "p",

  regular7: "h1",
  regular6: "h2",
  regular5: "h3",
  regular4: "h4",
  regular3: "h5",
  regular2: "h6",
  regular1: "p",
  regular: "p",
};
