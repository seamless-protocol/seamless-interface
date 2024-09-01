import { TableRow, TableCell, Typography } from "@shared";
import { ILMDesktopTableRow } from "./ILMDesktopTableRow";
import { ILMMobileTableRow } from "./ILMMobileTableRow";
import { useFetchAllStrategies } from "../../../../../../statev3/queries/Strategies.hook";
import { Address } from "viem";
import { Link } from "react-router-dom";
import { RouterConfig } from "@router";
import { LoadingTableGuard } from "./LoadingTableGuard";

export const IlmTableContainer: React.FC<{
  selectedStrategy?: Address;
}> = ({ selectedStrategy }) => {
  const { data: strategies, ...rest } = useFetchAllStrategies();

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

      <LoadingTableGuard
        loadingState={{
          ...rest,
          data: undefined,
        }}
      >
        {strategies?.map((strategy, index) => (
          <div key={index}>
            <Link to={RouterConfig.Builder.ilmDetailsv3(strategy)}>
              <ILMDesktopTableRow
                strategy={strategy}
                hideBorder={index === strategies.length - 1}
                selected={strategy === selectedStrategy}
              />
              <ILMMobileTableRow
                strategy={strategy}
                hideBorder={index === strategies.length - 1}
                selected={strategy === selectedStrategy}
              />
            </Link>
          </div>
        ))}
      </LoadingTableGuard>
    </div>
  );
};
