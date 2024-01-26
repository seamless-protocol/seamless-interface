export const TableCell: React.FC<{
  children?: React.ReactNode;
  className?: string;
  rest?: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >;
}> = ({ children, className, rest }) => {
  return (
    <td className={`text-center ${className ? className : ""}`} {...rest}>
      {children}
    </td>
  );
};
