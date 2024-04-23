import { DisplayValue, DisplayValueProps } from "./DisplayValue";

export interface DisplaySymbolProps extends Omit<DisplayValueProps, "viewValue"> {}
/**
 * `DisplaySymbol` Component
 *
 * The `DisplaySymbol` component is specifically designed for displaying token amounts, typically in cryptocurrency or similar applications. It extends the functionality of the `DisplayValue` component, allowing for additional customization specific to token amounts.
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
 * <DisplaySymbol
 *   typography="main16"
 *   symbolColor="primary"
 *   isLoading={loadingState}
 *   isFetched={fetchState}
 * />
 * ```
 *
 * In the example above, `DisplaySymbol` will display "1000 ETH" with the specified typography and symbol color. If the data is loading, it will show a loader instead.
 *
 * @param props Props for the `DisplaySymbol` component.
 * @returns The `DisplaySymbol` component.
 */
export const DisplaySymbol: React.FC<DisplaySymbolProps> = ({
  symbolPosition = "before",
  loaderSkeleton = true,
  ...props
}) => {
  return <DisplayValue symbolPosition={symbolPosition} loaderSkeleton={loaderSkeleton} {...props} />;
};
