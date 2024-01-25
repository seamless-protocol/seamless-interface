import { TypographyType } from "../../text/Typography/mappers";
import { DisplayableAmount } from "../../../types/Displayable";
import { DisplayValue } from "../DisplayValue/DisplayValue";

export interface DisplayPercentageProps extends DisplayableAmount {
  typography?: TypographyType;
  loaderSkeleton?: boolean;
}

export const DisplayPercentage: React.FC<DisplayPercentageProps> = ({
  symbol = "%",
  ...props
}) => {
  return <DisplayValue symbol={symbol} symbolPosition="after" {...props} />;
};
