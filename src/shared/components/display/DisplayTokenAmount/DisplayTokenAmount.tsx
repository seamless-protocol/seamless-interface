import { TypographyColor, TypographyType } from "../../text/Typography/mappers";
import { DisplayableAmount } from "../../../types/Displayable";
import { DisplayValue } from "../DisplayValue/DisplayValue";

export interface DisplayTokenAmountProps extends DisplayableAmount {
  typography?: TypographyType;
  symbolColor?: TypographyColor;
  loaderSkeleton?: boolean;
}

export const DisplayTokenAmount: React.FC<DisplayTokenAmountProps> = ({
  ...props
}) => {
  return <DisplayValue symbolPosition="after" {...props} />;
};
