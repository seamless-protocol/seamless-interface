import { TableRow, TableCell, Typography } from "@shared";

export const VaultsTableHeader: React.FC = () => {
  return (
    <TableRow className="hidden md:grid grid-cols-6 py-[9px] bg-neutral-0 mt-0 max-h-9 justify-center rounded-t-2xl border-solid border-b border-b-divider">
      <TableCell className="col-span-2 justify-start">
        <Typography type="bold1">Name</Typography>
      </TableCell>
      <TableCell className="col-span-1">
        <Typography type="bold1">TVL</Typography>
      </TableCell>
      <TableCell className="col-span-1">
        <Typography type="bold1">APY</Typography>
      </TableCell>
      <TableCell className="col-span-1">
        <Typography type="bold1">Curator</Typography>
      </TableCell>
      <TableCell className="col-span-1">
        <Typography type="bold1">Collateral</Typography>
      </TableCell>
    </TableRow>
  );
};
