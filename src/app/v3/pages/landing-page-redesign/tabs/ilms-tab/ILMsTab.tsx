import { Typography, TableRow, TableCell } from "../../../../../../shared";
import { useFetchAllStrategies } from "../../../../../statev3/common/hooks/useFetchAllStrategies";
import { MyStrategiesDesktopTableRow } from "./table/MyStrategiesDesktopTableRow";
import { MyStrategiesMobileTableRow } from "./table/MyStrategiesMobileTableRow";

export const ILMsTab = () => {
  const { state } = useFetchAllStrategies();

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-2xl">
        <TableRow className="hidden md:grid grid-cols-7 py-[9px] bg-neutral-0 border-solid border-b border-b-navy-100 mt-0 max-h-9 justify-center rounded-t-2xl">
          <TableCell
            className="col-span-2 justify-center"
            alignItems="items-start"
          >
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
            <MyStrategiesDesktopTableRow
              strategy={strategy.address}
              hideBorder={index === state.data.length - 1}
            />
            <MyStrategiesMobileTableRow
              strategy={strategy.address}
              hideBorder={index === state.data.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
