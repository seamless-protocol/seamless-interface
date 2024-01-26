import { TypographyType } from "../../text/Typography/mappers";
import { DisplayableAmount } from "../../../types/Displayable";
import { DisplayValue } from "../DisplayValue/DisplayValue";

export interface DisplayPercentageProps extends DisplayableAmount {
  typography?: TypographyType;
  loaderSkeleton?: boolean;
  symbolPosition?: "before" | "after" | undefined;
}

export const DisplayPercentage: React.FC<DisplayPercentageProps> = ({
  symbol = "%",
  symbolPosition = "after",
  ...props
}) => {
  return (
    <DisplayValue symbol={symbol} symbolPosition={symbolPosition} {...props} />
  );
};
