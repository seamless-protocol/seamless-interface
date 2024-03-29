import { IS_STYLE_VERSION_2 } from "../../../../globals";
import { Typography, TypographyProps } from "../Typography/Typography";
import { TypographyType } from "../Typography/mappers";
import { TypographyPropsv2, TypographyV2 } from "../TypographyV2/TypographyV2";
import { TypographyTypeV2 } from "../TypographyV2/mappers";

export type CombinedTypographyType = TypographyType | TypographyTypeV2;

interface TypographyVXProps extends Omit<TypographyProps & TypographyPropsv2, "type"> {
  type: CombinedTypographyType;
}

// todo rename to main Typography and use it everywhare (next PR)
export const TypographyVX: React.FC<TypographyVXProps> = (props) => {
  if (IS_STYLE_VERSION_2) return <TypographyV2 {...props} type={props.type as any} />;
  return <Typography {...props} type={props.type as any} />;
};
