import { DisplayValue, DisplayValueProps } from "./DisplayValue";

export interface DisplayMoneyProps extends DisplayValueProps {}

/**
 * `DisplayMoney` Component
 *
 * The `DisplayMoney` component is specialized for displaying monetary values, such as prices or financial amounts, in a clear and standardized format. It builds upon the `DisplayValue` component, adding specific functionality for handling money-related display features.
 *
 * ## Key Features:
 * - **Default Currency Symbol**: Incorporates the '$' symbol by default, but can be customized to use different currency symbols.
 * - **Customizable Symbol Position**: Allows the placement of the currency symbol either before or after the monetary value, with 'before' as the default position.
 * - **Inherits DisplayValue Features**: Inherits essential features from `DisplayValue`, such as loading states, typography styles, and symbol coloring options.
 * - **Optimized for Monetary Display**: Tailored to present financial amounts, streamlining the usage of the more generic `DisplayValue` component for money-related contexts.
 *
 * ## Props:
 * - `typography`: Specifies the typography style to be used (inherited from `DisplayValue`).
 * - `symbolColor`: Defines the color of the currency symbol (inherited from `DisplayValue`).
 * - `loaderSkeleton`: Shows a loading skeleton animation if the value is still loading (inherited from `DisplayValue`).
 * - `symbolPosition`: Can be set to 'before' or 'after', with 'before' as the default. Determines the placement of the currency symbol in relation to the monetary value.
 * - Inherits all props from `DisplayableAmount`.
 *
 * ## Usage:
 *
 * ```jsx
 * <DisplayMoney
 *   value={amount}
 *   symbol="€"
 *   typography="main16"
 *   symbolColor="primary"
 *   isLoading={loadingState}
 *   isFetched={fetchState}
 * />
 * ```
 *
 * In this example, `DisplayMoney` will display the monetary amount with the Euro symbol '€' preceding it, in the specified typography and symbol color. If the data is still loading, a loader will be displayed instead.
 *
 * @param props Props for the `DisplayMoney` component.
 * @returns The `DisplayMoney` component.
 */
export const DisplayMoney: React.FC<DisplayMoneyProps> = ({
  symbol = "$",
  symbolPosition = "before",
  loaderSkeleton = true,
  ...props
}) => {
  return (
    <DisplayValue
      symbol={symbol}
      symbolPosition={symbolPosition}
      loaderSkeleton={loaderSkeleton}
      {...props}
    />
  );
};
