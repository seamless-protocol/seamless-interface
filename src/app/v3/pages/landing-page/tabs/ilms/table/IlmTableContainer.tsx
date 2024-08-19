import { TableRow, TableCell, Typography } from "@shared";
import { stateMock } from "../../../mocks";
import { ILMDesktopTableRow } from "./ILMDesktopTableRow";
import { ILMMobileTableRow } from "./ILMMobileTableRow";

export const IlmTableContainer = () => {
  const state = stateMock;

  return (
    <div className="bg-neutral-0 shadow-card rounded-2xl w-full">
      <TableRow className="hidden md:grid grid-cols-7 py-[9px] bg-neutral-0 mt-0 max-h-9 justify-center rounded-t-2xl border-solid border-b border-b-divider">
        <TableCell className="col-span-2 justify-center" alignItems="items-start">
          <Typography type="bold1">ILM Strategies</Typography>
        </TableCell>
        <TableCell className="col-span-1">
          <Typography type="bold1">Type</Typography>
        </TableCell>
        <TableCell className="col-span-1">
          <Typography type="bold1">Available supply cap</Typography>
        </TableCell>
        <TableCell className="col-span-1">
          <Typography type="bold1">30d historical return</Typography>
        </TableCell>
        <TableCell className="col-span-1">
          <Typography type="bold1">Rewards APY</Typography>
        </TableCell>
        <TableCell className="col-span-1">
          <Typography type="bold1">TVL</Typography>
        </TableCell>
      </TableRow>

      {state.data?.map((strategy, index) => (
        <div key={index}>
          <ILMDesktopTableRow strategy={strategy.address} hideBorder={index === state.data.length - 1} />
          <ILMMobileTableRow strategy={strategy.address} hideBorder={index === state.data.length - 1} />
        </div>
      ))}
    </div>
  );
};
