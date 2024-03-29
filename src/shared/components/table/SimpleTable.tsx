import { FlexCol } from "../containers/FlexCol";
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
  subtitle: string;
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

export const SimpleTable = ({
  isLoading,
  columns,
  bodyComponent,
  title,
  subtitle,
  filterComponent,
  footerComponent,
  settings = { skeletonRowCount: 5 },
}: GenericSimpleTableProps) => {
  return (
    <div className="text-text-secondary">
      <FlexCol className="p-1 px-6 ">
        <FlexRow className="justify-between ">
          <Typography type="h2" color="secondary">
            {title}
          </Typography>

          {filterComponent}
        </FlexRow>
        <Typography type="description" color="light">
          {subtitle}
        </Typography>
      </FlexCol>
      <div className="mt-4">
        <FlexRow className="hidden md:flex px-6 pt-4 pb-1 min-w-full  border-b border-b-divider">
          {columns.map((column) => (
            <FlexCol
              key={column.id}
              className={`flex-1 ${column.align ? `${column.align}` : "text-center"} text-sm font-medium text-gray-500`}
            >
              <Typography type="subheader2">{column.label}</Typography>
            </FlexCol>
          ))}
        </FlexRow>
        <div>
          {isLoading ? (
            <TableSkeleton
              colCount={columns.length}
              rowCount={settings.skeletonRowCount ? settings.skeletonRowCount : DefaultSettings.skeletonRowCount}
            />
          ) : (
            bodyComponent || <EmptyTable />
          )}
        </div>
      </div>
      {footerComponent && <div className="mt-4">{footerComponent}</div>}
    </div>
  );
};
