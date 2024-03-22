import { TypographyType } from "../text/Typography/mappers";
import { DisplayValue } from "./DisplayValue";

export interface DisplayTextProps {
  text?: string;
  typography?: TypographyType;
  loaderSkeleton?: boolean;
  isLoading?: boolean;
  isFetched?: boolean;
  skeletonFitParentMaxWidth?: boolean;
  className?: string;
}

export const DisplayText: React.FC<DisplayTextProps> = ({ text, loaderSkeleton = true, ...props }) => {
  return <DisplayValue viewValue={text} loaderSkeleton={loaderSkeleton} {...props} />;
};
