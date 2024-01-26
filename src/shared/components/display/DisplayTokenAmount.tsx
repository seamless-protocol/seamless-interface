import { TypographyColor, TypographyType } from "../text/Typography/mappers";
import { DisplayableAmount } from "../../types/Displayable";
import { DisplayValue } from "./DisplayValue";

export interface DisplayTokenAmountProps extends DisplayableAmount {
  typography?: TypographyType;
  symbolColor?: TypographyColor;
  loaderSkeleton?: boolean;
  symbolPosition?: "before" | "after" | undefined;
}

export const DisplayTokenAmount: React.FC<DisplayTokenAmountProps> = ({
  symbolPosition = "after",
  ...props
}) => {
  return <DisplayValue symbolPosition={symbolPosition} {...props} />;
};
