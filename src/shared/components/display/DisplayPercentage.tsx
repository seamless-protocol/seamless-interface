import { TypographyType } from "../text/Typography/mappers";
import { DisplayableAmount } from "../../types/Displayable";
import { DisplayValue } from "./DisplayValue";

export interface DisplayPercentageProps extends DisplayableAmount {
  typography?: TypographyType;
  loaderSkeleton?: boolean;
  symbolPosition?: "before" | "after" | undefined;
}
/**
 * `DisplayPercentage` Component
 *
 * The `DisplayPercentage` component is designed to display percentage values, offering a clear and consistent way to show percentages in your application. This component leverages the core features of the `DisplayValue` component, while focusing on the specific needs for displaying percentage values.
 *
 * ## Key Features:
 * - **Default Percentage Symbol**: Automatically includes the '%' symbol with the value.
 * - **Flexible Symbol Positioning**: The '%' symbol can be positioned either before or after the value, with a default placement of 'after'.
 * - **Inherits DisplayValue Features**: Inherits functionalities from `DisplayValue`, such as loading states and typography customization.
 * - **Simplified Percentage Display**: Offers a straightforward approach to display percentage values, abstracting the more generic functionalities of the `DisplayValue` component.
 *
 * ## Props:
 * - `typography`: The typography style to be used (inherited from `DisplayValue`).
 * - `loaderSkeleton`: If true, displays a loading skeleton animation while the value is being loaded (inherited from `DisplayValue`).
 * - `symbolPosition`: Can be either 'before' or 'after', with a default of 'after'. Determines the position of the '%' symbol relative to the value.
 * - Inherits all props from `DisplayableAmount`.
 *
 * ## Usage:
 * 
 * ```jsx
 * <DisplayPercentage
 *   value={percentageValue}
 *   typography="main16"
 *   isLoading={loadingState}
 *   isFetched={fetchState}
 * />
 * ```
 * 
 * In the above example, `DisplayPercentage` will display the value followed by the '%' symbol, in the specified typography. If the data is loading, it will show a loader instead.
 *
 * @param props Props for the `DisplayPercentage` component.
 * @returns The `DisplayPercentage` component.
 */
export const DisplayPercentage: React.FC<DisplayPercentageProps> = ({
  symbol = "%",
  symbolPosition = "after",
  ...props
}) => {
  return (
    <DisplayValue symbol={symbol} symbolPosition={symbolPosition} {...props} />
  );
};
