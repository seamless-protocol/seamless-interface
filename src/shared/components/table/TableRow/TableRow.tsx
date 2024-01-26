export const TableRow: React.FC<{
  children?: React.ReactNode;
  className?: string;
  hideBorder?: boolean;
  rest?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >;
}> = ({ children, className, hideBorder, rest }) => {
  return (
    <tr
      className={`px-6 items-center h-[76px] cursor-pointer hover:bg-action-hover 
      ${hideBorder ? "" : "border-solid border-b border-b-divider"} 
      ${className ? className : ""}`}
      {...rest}
    >
      {children}
    </tr>
  );
};
