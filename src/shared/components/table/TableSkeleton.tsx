interface TableSkeletonProps {
  rowCount?: number;
  colCount?: number;
}

/**
 * `TableSkeleton` Component
 *
 * The `TableSkeleton` component is designed to provide a placeholder representation of a table's content while the actual data is loading. This component creates a skeleton screen effect, typically used to enhance user experience by indicating that content is in the process of loading.
 *
 * ## Key Features:
 * - **Configurable Rows and Columns**: Allows specifying the number of rows and columns for the skeleton.
 * - **Skeleton Animation**: Each cell contains a skeleton animation to mimic the layout of the actual data.
 * - **Flexible Usage**: Can be used in any table structure where data loading indicators are required.
 *
 * ## Props:
 * - `rowCount`: The number of skeleton rows to display. Defaults to 5.
 * - `colCount`: The number of columns in each skeleton row. Defaults to 6.
 *
 * ## Usage:
 *
 * ```jsx
 * <table>
 *   <thead>
 *     <TableHead />
 *   </thead>
 *   <tbody>
 *     <TableSkeleton rowCount={3} colCount={4} />
 *   </tbody>
 * </table>
 * ```
 *
 * In this example, `TableSkeleton` will render a skeleton with 3 rows and 4 columns. This can be used in a table body while the actual table data is being loaded.
 *
 * @param props Props for the `TableSkeleton` component.
 * @returns The `TableSkeleton` component.
 */

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rowCount = 5,
  colCount = 6,
}) => {
  return (
    <div>
      {[...Array(rowCount)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex animate-pulse">
          {[...Array(colCount)].map((_, colIndex) => (
            <div key={colIndex} className="flex-1 px-4 py-2">
              <div className="flex w-full justify-center items-center">
                <div className="skeleton w-1/2 h-10"></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
