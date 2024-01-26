import { DisplayableAmount } from "../../../types/Displayable";
import { Typography } from "../../text/Typography/Typography";
import { TypographyType, TypographyColor } from "../../text/Typography/mappers";

export interface DisplayValueProps extends DisplayableAmount {
  typography?: TypographyType;
  symbolColor?: TypographyColor;
  loaderSkeleton?: boolean;
  symbolPosition?: "before" | "after";
}

export const DisplayValue: React.FC<DisplayValueProps> = ({
  value,
  symbol,
  isFetched,
  isLoading,
  symbolColor,
  loaderSkeleton,
  typography = "secondary12",
  symbolPosition = "before",
}) => {
  if ((!isFetched && isFetched != null) || (isLoading && isLoading != null)) {
    return (
      <span
        className={
          loaderSkeleton
            ? "skeleton w-full h-full"
            : "loading loading-spinner flex self-center"
        }
      ></span>
    );
  } else {
    return (
      <Typography
        type={typography}
        className="whitespace-nowrap text-overflow-ellipsis"
      >
        {symbolPosition === "before" && symbol && (
          <>
            <Typography
              type={typography}
              tagOverride="span"
              color={symbolColor}
            >
              {symbol}
            </Typography>{" "}
          </>
        )}
        {value}

        {symbolPosition === "after" && symbol && (
          <>
            {" "}
            <Typography
              type={typography}
              tagOverride="span"
              color={symbolColor}
            >
              {symbol}
            </Typography>
          </>
        )}
      </Typography>
    );
  }
};
