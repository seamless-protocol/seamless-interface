import { TableRow, TableCell, Typography } from "@shared";
import { MyTableDesktopRow } from "./MyTableDesktopRow";
import { stateMock } from "../../../mocks";

export const TableContainer = () => {
  const state = stateMock;

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-2xl">
        <TableRow className="hidden md:grid grid-cols-22 py-2 max-h-9 bg-neutral-0 border-solid border-b border-b-navy-100 mt-0 justify-center rounded-t-2xl">
          <TableCell className="col-span-6 justify-center" alignItems="items-start">
            <Typography type="bold1">Strategies</Typography>
          </TableCell>
          <TableCell className="col-span-2">
            <Typography type="bold1">Type</Typography>
          </TableCell>
          <TableCell className="col-span-3">
            <Typography type="bold1">Holdings (LP token)</Typography>
          </TableCell>
          <TableCell className="col-span-3">
            <Typography type="bold1">Unrealized Gain/Loss</Typography>
          </TableCell>
          <TableCell className="col-span-3">
            <Typography type="bold1">Unclaimed Rewards</Typography>
          </TableCell>
          <TableCell className="col-span-5" />
        </TableRow>

        {state.data?.map((strategy, index) => (
          <div key={strategy.address}>
            <MyTableDesktopRow strategy={strategy.address} hideBorder={index === state.data.length - 1} />
          </div>
        ))}
      </div>
    </div>
  );
};
