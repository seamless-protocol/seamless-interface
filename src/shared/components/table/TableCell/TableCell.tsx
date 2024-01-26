export const TableCell: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <td className={`text-center ${className ? className : ""}`}>{children}</td>
  );
};
