import { TypographyType } from "../text/Typography/mappers";
import { DisplayValue } from "./DisplayValue";

export interface DisplayTextProps {
  text?: string;
  typography?: TypographyType;
  loaderSkeleton?: boolean;
  isLoading?: boolean;
  isFetched?: boolean;
  skeletonFitParentMaxWidth?: boolean;
}

export const DisplayText: React.FC<DisplayTextProps> = ({
  text,
  loaderSkeleton = true,
  ...props
}) => {
  return (
    <DisplayValue value={text} loaderSkeleton={loaderSkeleton} {...props} />
  );
};
