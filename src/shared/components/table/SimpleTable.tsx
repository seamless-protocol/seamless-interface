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
