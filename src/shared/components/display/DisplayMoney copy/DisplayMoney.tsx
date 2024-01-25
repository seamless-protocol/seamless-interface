import { TypographyColor, TypographyType } from "../../text/Typography/mappers";
import { DisplayableAmount } from "../../../types/Displayable";
import { DisplayValue } from "../DisplayValue/DisplayValue";

export interface DisplayMoneyProps extends DisplayableAmount {
  typography?: TypographyType;
  symbolColor?: TypographyColor;
  loaderSkeleton?: boolean;
}

export const DisplayMoney: React.FC<DisplayMoneyProps> = ({
  symbol = "$",
  ...props
}) => {
  return <DisplayValue symbol={symbol} symbolPosition="before" {...props} />;
};
