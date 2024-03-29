import { IS_STYLE_VERSION_2 } from "../../../../globals";
import { TypographyPropsV1, TypographyV1 } from "../TypographyV1/Typography";
import { TypographyType } from "../TypographyV1/mappers";
import { TypographyPropsv2, TypographyV2 } from "../TypographyV2/TypographyV2";
import { TypographyTypeV2 } from "../TypographyV2/mappers";

export type CombinedTypographyType = TypographyType | TypographyTypeV2;

interface TypographyVXProps extends Omit<TypographyPropsV1 & TypographyPropsv2, "type"> {
  type?: CombinedTypographyType;
}

// todo rename to main Typography and use it everywhare (next PR)
export const Typography: React.FC<TypographyVXProps> = (props) => {
  if (IS_STYLE_VERSION_2) return <TypographyV2 {...props} type={props.type as any} />;
  return <TypographyV1 {...props} type={props.type as any} />;
};
