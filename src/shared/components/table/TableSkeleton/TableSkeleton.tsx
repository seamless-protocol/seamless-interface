interface TableSkeletonProps {
  rowCount?: number;
  colCount?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rowCount = 5,
  colCount = 6,
}) => {
  return (
    <>
      {[...Array(rowCount)].map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {[...Array(colCount)].map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-2">
              <div className="flex w-full justify-center items-center">
                <div className="flex skeleton w-1/2 h-10"></div>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
