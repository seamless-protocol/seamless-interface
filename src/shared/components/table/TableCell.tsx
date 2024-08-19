import { IS_STYLE_VERSION_2 } from "../../../globals";

/**
 * `TableCell` Component
 *
 * The `TableCell` component is a flexible and reusable component for rendering individual cells in a table. It is designed to be used within table rows (`<tr>` elements) as part of a larger table structure.
 *
 * ## Key Features:
 * - **Customizable Content**: Can contain any React node as children, allowing for versatile content rendering inside the cell.
 * - **Styling Flexibility**: Accepts a `className` prop for custom styling, making it adaptable to various design requirements.
 * - **Extensible HTML Attributes**: Supports additional standard HTML table cell attributes through the `rest` prop for further customization.
 * - **Center Text Alignment by Default**: The text within the cell is centered by default, but this can be overridden with custom styling.
 *
 * ## Props:
 * - `children`: The content to be rendered inside the table cell. Can be any valid React node.
 * - `className`: Optional string for custom CSS classes. Useful for applying specific styling to the cell.
 * - `rest`: An object containing any additional HTML attributes specific to table cell elements. These are spread onto the `<td>` element.
 *
 * ## Usage:
 *
 * ```jsx
 * <tr>
 *   <TableCell className="custom-cell-style">
 *     Cell Content
 *   </TableCell>
 *   <TableCell>
 *     More Content
 *   </TableCell>
 * </tr>
 * ```
 *
 * In the above example, the first `TableCell` includes custom styling through the `className` prop, while the second one uses the default styling.
 *
 * @param props Props for the `TableCell` component.
 * @returns The `TableCell` component.
 */
export const TableCell: React.FC<{
  children?: React.ReactNode;
  className?: string;
  rest?: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>;
  alignItems?: string;
}> = ({ children, className, rest, alignItems = (IS_STYLE_VERSION_2 ? "text-center" : "text-start") }) => {
  return (
    <div className={`flex flex-col ${IS_STYLE_VERSION_2 ? "text-center" : "text-start"} ${alignItems} ${className || ""}`} {...rest}>
      {children}
    </div>
  );
};
