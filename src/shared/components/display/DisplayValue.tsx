import { DisplayableAmount } from "../../types/Displayable";
import { TypographyColor } from "../text/TypographyV1/mappers";
import { CombinedTypographyType, Typography } from "../text/Typography/Typography";
import { fontSizes } from "./mapper";

export interface DisplayValueProps extends DisplayableAmount {
  typography?: CombinedTypographyType;
  symbolColor?: TypographyColor;
  loaderSkeleton?: boolean;
  symbolPosition?: "before" | "after";
  className?: string;
}
/**
 * `DisplayValue` Component
 *
 * The `DisplayValue` component is a versatile utility for displaying values with an optional symbol (like currency or unit), in a formatted manner.
 *
 * ## Key Features:
 * - **Value Formatting**: Displays the provided `value` with an optional `symbol` before or after the value.
 * - **Loading State**: Supports a loading state, which can be indicated with a spinner or a skeleton loader.
 * - **Custom Typography**: Allows for different typography styles and colors through `typography` and `symbolColor` props.
 *
 * ## Props:
 * - `value`: The value to be displayed.
 * - `symbol`: Optional symbol to display alongside the value (e.g., $, %, etc.).
 * - `isFetched`: Indicates if the data is fetched; used to control the display of the loader.
 * - `isLoading`: Indicates if the data is currently loading.
 * - `symbolColor`: Optional color for the symbol.
 * - `loaderSkeleton`: Toggles between a spinner and a skeleton loader.
 * - `symbolPosition`: Positions the symbol either 'before' or 'after' the value.
 * - `typography`: The typography style to be used for displaying the value.
 *
 * ## Usage:
 *
 * ```jsx
 * <DisplayValue
 *   value="100"
 *   symbol="$"
 *   typography="main16"
 *   symbolColor="secondary"
 *   isLoading={dataLoading}
 *   isFetched={dataFetched}
 *   symbolPosition="before"
 * />
 * ```
 *
 * In the example above, the component will display "$100" with the main16 typography style and the symbol in secondary color. If the data is loading, it will show a loader instead.
 *
 * @param props Props for the component.
 * @returns The `DisplayValue` component.
 */

export const DisplayValue: React.FC<DisplayValueProps> = ({
  viewValue,
  symbol,
  isFetched,
  isLoading,
  loaderSkeleton,
  typography = "secondary12",
  symbolColor,
  symbolPosition = "before",
  className = "",
}) => {
  if ((!isFetched && isFetched != null) || (isLoading && isLoading != null)) {
    if (loaderSkeleton) {
      const { width, height } = getTypographySkeletonSize(typography, viewValue);

      return <span style={{ width, height }} className="skeleton flex mb-[0.5px]" />;
    }
    return <div className="loading loading-spinner flex self-center" />;
  }
  return (
    <Typography type={typography} className={`truncate hover:text-clip ${className}`}>
      {symbolPosition === "before" && symbol && (
        <Typography type={typography} tagOverride="span" color={symbolColor}>
          {symbol}
        </Typography>
      )}
      {viewValue}
      {symbolPosition === "after" && symbol && (
        <>
          {" "}
          <Typography type={typography} tagOverride="span" color={symbolColor}>
            {symbol}
          </Typography>
        </>
      )}
    </Typography>
  );
};

/**
 * Calculates the width and height for a skeleton loader based on typography type and text value.
 *
 * @param {TypographyType} typographyType - The typography style of the text.
 * @param {string} [value=""] - The text value to determine the width (default is an empty string).
 * @returns {{ width: string, height: string }} - An object containing the calculated width and height as CSS values.
 */
const getTypographySkeletonSize = (typographyType: CombinedTypographyType, viewValue = "") => {
  const fontSize = fontSizes[typographyType] || "1rem";
  const height = `calc(${fontSize} * 1.5)`;

  const avgCharWidthInRem = 150 / 23 / 16;

  let widthInRem = viewValue.length * avgCharWidthInRem;

  const minWidthMultiplier = 10;
  if (viewValue.length < 10) {
    widthInRem = minWidthMultiplier * avgCharWidthInRem;
  }
  const width = `calc(${fontSize} * ${widthInRem})`;

  return { width, height };
};
