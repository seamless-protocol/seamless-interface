import { FlexRow } from "../containers/FlexRow";
import { Typography } from "../text/Typography/Typography";
import { EmptyTable } from "./EmptyTable";
import { TableSkeleton } from "./TableSkeleton";

export interface TableLabel {
  id: string;
  label: string;
  align?: "text-left" | "text-center" | "text-right";
}

interface Settings {
  skeletonRowCount?: number;
}

interface GenericSimpleTableProps {
  isLoading?: boolean;
  bodyComponent?: React.ReactNode;
  columns: TableLabel[];
  title: string;
  filterComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  settings?: Settings;
}

const DefaultSettings: Settings = {
  skeletonRowCount: 5,
};
/**
 * `SimpleTable` Component
 *
 * The `SimpleTable` component is designed to render tabular data in a clean and simple format. It provides flexibility in its layout and content rendering, making it suitable for a wide range of applications that require tabular representation of data.
 *
 * ## Key Features:
 * - **Loading State**: Supports a loading state that displays a skeleton of rows, indicating data is being fetched.
 * - **Customizable Columns**: Allows defining columns with options for alignment (left, center, right).
 * - **Flexible Components**: Supports additional components like a filter section, a custom footer, and a custom body component.
 * - **Default and Customizable Settings**: Comes with default settings which can be overridden as needed.
 *
 * ## Props:
 * - `isLoading`: Boolean flag to indicate if data is being loaded.
 * - `columns`: Array of objects defining the columns of the table.
 * - `bodyComponent`: A React node to be rendered as the table body. Used for custom row rendering.
 * - `title`: A string to display as the table's title.
 * - `filterComponent`: A React node for custom filter UI.
 * - `footerComponent`: A React node for custom footer content.
 * - `settings`: Object for customizing default settings like the number of skeleton rows.
 *
 * ## Usage:
 * 
 * ```jsx
 * <SimpleTable
 *   isLoading={dataLoading}
 *   columns={[
 *     { id: 'name', label: 'Name', align: 'text-left' },
 *     { id: 'age', label: 'Age', align: 'text-right' }
 *   ]}
 *   title="Sample Table"
 *   filterComponent={<CustomFilter />}
 *   bodyComponent={<CustomBody />}
 *   footerComponent={<CustomFooter />}
 * />
 * ```
 *
 * In this example, `SimpleTable` displays a table with columns 'Name' and 'Age', a custom filter, and a footer. It shows a skeleton loader if `dataLoading` is true.
 *
 * @param props Props for the `SimpleTable` component.
 * @returns The `SimpleTable` component.
 */

export function SimpleTable({
  isLoading,
  columns,
  bodyComponent,
  title,
  filterComponent,
  footerComponent,
  settings,
}: GenericSimpleTableProps) {
  return (
    <div>
      {/* todo: reconsider this, is this actually tableHead component? */}
      <FlexRow className="p-1 px-6 justify-between">
        <Typography type="h2" color="secondary">
          {title}
        </Typography>
        {/* todo: reconsider this, part of tableHead component? */}
        {filterComponent}
      </FlexRow>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-text-secondary">
          <thead className=" border-b border-b-divider">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-4 py-2 text-center text-sm font-medium text-gray-500 ${column.align ? `${column.align}` : ""}`}
                >
                  <Typography type="subheader2">{column.label}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton
                colCount={columns.length}
                rowCount={
                  settings
                    ? settings.skeletonRowCount
                    : DefaultSettings.skeletonRowCount
                }
              />
            ) : bodyComponent ? (
              bodyComponent
            ) : (
              <EmptyTable />
            )}
          </tbody>
        </table>
      </div>
      {footerComponent && <div className="mt-4">{footerComponent}</div>}
    </div>
  );
}
