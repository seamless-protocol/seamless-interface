import { TypographyColor, TypographyType } from "../text/Typography/mappers";
import { DisplayableAmount } from "../../types/Displayable";
import { DisplayValue } from "./DisplayValue";

export interface DisplayTokenAmountProps extends DisplayableAmount {
  typography?: TypographyType;
  symbolColor?: TypographyColor;
  loaderSkeleton?: boolean;
  symbolPosition?: "before" | "after" | undefined;
  className?: string;
}
/**
 * `DisplayTokenAmount` Component
 *
 * The `DisplayTokenAmount` component is specifically designed for displaying token amounts, typically in cryptocurrency or similar applications. It extends the functionality of the `DisplayValue` component, allowing for additional customization specific to token amounts.
 *
 * ## Key Features:
 * - **Flexible Symbol Positioning**: By default, places the symbol after the value but can be customized to appear before.
 * - **Inherits DisplayValue Features**: Inherits all the features of `DisplayValue`, such as loading states, typography customization, and symbol coloring.
 * - **Simplified API for Token Display**: Provides a more straightforward way to display token amounts, abstracting the more generic `DisplayValue` component.
 *
 * ## Props:
 * - `typography`: The typography style to be used (inherited from `DisplayValue`).
 * - `symbolColor`: The color of the symbol (inherited from `DisplayValue`).
 * - `loaderSkeleton`: Displays a loader if the value is loading (inherited from `DisplayValue`).
 * - `symbolPosition`: Can be 'before' or 'after', defaults to 'after'. Determines the placement of the symbol relative to the value.
 * - Inherits all props from `DisplayableAmount`.
 *
 * ## Usage:
 *
 * ```jsx
 * <DisplayTokenAmount
 *   value="1000"
 *   symbol="ETH"
 *   typography="main16"
 *   symbolColor="primary"
 *   isLoading={loadingState}
 *   isFetched={fetchState}
 * />
 * ```
 *
 * In the example above, `DisplayTokenAmount` will display "1000 ETH" with the specified typography and symbol color. If the data is loading, it will show a loader instead.
 *
 * @param props Props for the `DisplayTokenAmount` component.
 * @returns The `DisplayTokenAmount` component.
 */
export const DisplayTokenAmount: React.FC<DisplayTokenAmountProps> = ({
  symbolPosition = "after",
  loaderSkeleton = true,
  ...props
}) => {
  return (
    <DisplayValue
      symbolPosition={symbolPosition}
      loaderSkeleton={loaderSkeleton}
      {...props}
    />
  );
};
