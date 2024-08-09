import { IS_STYLE_VERSION_2 } from "../../../globals";

/**
 * `TableRow` Component
 *
 * The `TableRow` component serves as a container for table cells, forming a row in a table structure. It is designed to be used within a `<table>` or similar structures, typically in conjunction with `TableCell` components.
 *
 * ## Key Features:
 * - **Child Content**: Can contain any React nodes as children, usually `TableCell` components, to display row data.
 * - **Customizable Styling**: Accepts a `className` prop for additional CSS classes, allowing for versatile styling.
 * - **Optional Border Hiding**: Provides an option to hide the bottom border of the row for a cleaner look.
 * - **Hover Effect and Clickable Rows**: Includes a hover effect and cursor pointer to indicate interactiveness.
 * - **Extensible HTML Attributes**: Supports additional standard HTML row attributes through the `rest` prop for further customization.
 *
 * ## Props:
 * - `children`: The content of the table row. Typically, this will be a series of `TableCell` components.
 * - `className`: Optional string for custom CSS classes. Useful for applying specific styling to the row.
 * - `hideBorder`: Boolean to control the visibility of the bottom border. If true, the bottom border is hidden.
 * - `rest`: An object containing any additional HTML attributes specific to table row elements. These are spread onto the `<tr>` element.
 *
 * ## Usage:
 *
 * ```jsx
 * <table>
 *   <TableRow className="custom-row-style">
 *     <TableCell>Cell 1</TableCell>
 *     <TableCell>Cell 2</TableCell>
 *   </TableRow>
 *   <TableRow hideBorder>
 *     <TableCell>Cell 3</TableCell>
 *     <TableCell>Cell 4</TableCell>
 *   </TableRow>
 * </table>
 * ```
 *
 * In this example, the first `TableRow` includes custom styling and a visible bottom border, while the second one hides the bottom border.
 *
 * @param props Props for the `TableRow` component.
 * @returns The `TableRow` component.
 */
export const TableRow: React.FC<{
  children?: React.ReactNode;
  className?: string;
  hideBorder?: boolean;
  rest?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
}> = ({ children, className, rest, hideBorder }) => {
  return (
    <div
      className={` px-6 items-center h-[76px] cursor-pointer} 
      ${IS_STYLE_VERSION_2 ? (hideBorder ? "" : "border-solid border-b border-b-divider") : ""} 
      ${className || ""}`}
      {...rest}
    >
      {children}
    </div>
  );
};
