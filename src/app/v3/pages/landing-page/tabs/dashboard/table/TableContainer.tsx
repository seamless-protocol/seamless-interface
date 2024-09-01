import { TableRow, TableCell, Typography } from "@shared";
import { TableDesktopRow } from "./TableDesktopRow";
import { TableMobileRow } from "./TableMobileRow";
import { useFetchUserDepositStrategies } from "../../../../../../state/loop-strategy/hooks/useFetchUserDepositStrategies";
import { Link } from "react-router-dom";
import { RouterConfig } from "@router";
import { NoStrategiesTableGuard } from "./NoStrategiesTableGuard";

export const TableContainer = () => {
  const { data: strategies, ...rest } = useFetchUserDepositStrategies();

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

        <NoStrategiesTableGuard
          numberOfStrategiesDisplayable={{
            ...rest,
            data: strategies?.length || 0,
          }}
        >
          {strategies?.map((strategy, index) => (
            <div key={strategy.strategy}>
              <Link to={RouterConfig.Builder.ilmDetailsv3(strategy.strategy)}>
                <TableDesktopRow strategy={strategy.strategy} hideBorder={index === strategies.length - 1} />
                <TableMobileRow strategy={strategy.strategy} />
              </Link>
            </div>
          ))}
        </NoStrategiesTableGuard>
      </div>
    </div>
  );
};
