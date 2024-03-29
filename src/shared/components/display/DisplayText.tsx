import { DisplayValue, DisplayValueProps } from "./DisplayValue";

export interface DisplayTextProps extends DisplayValueProps {
  text?: string;
}

export const DisplayText: React.FC<DisplayTextProps> = ({ text, loaderSkeleton = true, ...props }) => {
  return <DisplayValue viewValue={text} loaderSkeleton={loaderSkeleton} {...props} />;
};
