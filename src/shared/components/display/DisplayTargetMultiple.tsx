import { DisplayValue, DisplayValueProps } from "./DisplayValue";

export interface DisplayTargetMultipleProps extends DisplayValueProps {
}

export const DisplayTargetMultiple: React.FC<DisplayTargetMultipleProps> = ({ loaderSkeleton = true, ...props }) => {
  return <DisplayValue {...props} symbol=""
    viewValue={props.viewValue + (props.symbol || "")}
    loaderSkeleton={loaderSkeleton}
  />;
};
