import { TableRow, TableCell, Typography } from "@shared";
import { ILMDesktopTableRow } from "./ILMDesktopTableRow";
import { ILMMobileTableRow } from "./ILMMobileTableRow";
import { useFetchAllStrategies } from "../../../../../../statev3/queries/Strategies.hook";

export const IlmTableContainer = () => {
  const { data: strategies } = useFetchAllStrategies();

  return (
    <div className="bg-neutral-0 shadow-card rounded-2xl w-full">
      <TableRow className="hidden md:grid grid-cols-7 py-[9px] bg-neutral-0 mt-0 max-h-9 justify-center rounded-t-2xl border-solid border-b border-b-divider">
        <TableCell className="col-span-2 justify-center" alignItems="items-start">
          <Typography type="bold1">ILM Strategies</Typography>
        </TableCell>
        <TableCell className="col-span-1 items-center">
          <Typography type="bold1">Type</Typography>
        </TableCell>
        <TableCell className="col-span-1 items-center">
          <Typography type="bold1">Available supply cap</Typography>
        </TableCell>
        <TableCell className="col-span-1 items-center">
          <Typography type="bold1">30d historical return</Typography>
        </TableCell>
        <TableCell className="col-span-1 items-center">
          <Typography type="bold1">Rewards APY</Typography>
        </TableCell>
        <TableCell className="col-span-1 items-center">
          <Typography type="bold1">TVL</Typography>
        </TableCell>
      </TableRow>

      {strategies?.map((strategy, index) => (
        <div key={index}>
          <ILMDesktopTableRow strategy={strategy} hideBorder={index === strategies.length - 1} />
          <ILMMobileTableRow strategy={strategy} hideBorder={index === strategies.length - 1} />
        </div>
      ))}
    </div>
  );
};
