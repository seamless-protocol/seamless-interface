import { DisplayableAmount } from "../../types/Displayable";
import { TypographyColor, TypographyType } from "../text/Typography/mappers";
import { DisplayValue } from "./DisplayValue";

export interface DisplayMoneyProps extends DisplayableAmount {
  typography?: TypographyType;
  symbolColor?: TypographyColor;
  loaderSkeleton?: boolean;
  symbolPosition?: "before" | "after" | undefined;
}

export const DisplayMoney: React.FC<DisplayMoneyProps> = ({
  symbol = "$",
  symbolPosition = "before",
  ...props
}) => {
  return (
    <DisplayValue symbol={symbol} symbolPosition={symbolPosition} {...props} />
  );
};
