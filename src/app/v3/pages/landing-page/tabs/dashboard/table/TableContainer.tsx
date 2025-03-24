import { TableRow, TableCell, Typography } from "@shared";
import { useFetchUserDepositStrategies } from "../../../../../../state/loop-strategy/hooks/useFetchUserDepositStrategies";
import { Link } from "react-router-dom";
import { RouterConfig } from "@router";
import { EmptyTableGuard } from "../../../../common/components/EmptyTableGuard";
import { useFetchUserVaultPositions } from "../../../../../../statev3/morpho/user-vault-positions/UserVaultPositions.hook";
import { StrategyTableDesktopRowContainer } from "./ilms/StrategyTableDesktopRowContainer";
import { VaultTableDesktopRowContainer } from "./morpho-vaults/VaultTableDesktopRowContainer";
import { StrategyTableMobileRowContainer } from "./ilms/StrategyTableMobileRowContainer";
import { VaultTableMobileRowContainer } from "./morpho-vaults/VaultTableMobileRowContainer";

export const TableContainer = () => {
  const { data: strategies, ...rest } = useFetchUserDepositStrategies();
  const { data: vaults, ...vaultsRest } = useFetchUserVaultPositions();

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-2xl">
        <TableRow className="hidden md:grid grid-cols-20 py-2 max-h-9 bg-neutral-0 border-solid border-b border-b-navy-100 mt-0 justify-center rounded-t-2xl">
          <TableCell className="col-span-6 justify-center" alignItems="items-start">
            <Typography type="bold1">Positions</Typography>
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
          <TableCell className="col-span-2">
            <Typography type="bold1">Claimable Rewards</Typography>
          </TableCell>
          <TableCell className="col-span-4" />
        </TableRow>

        <EmptyTableGuard
          numberOfStrategiesDisplayable={{
            ...rest,
            ...vaultsRest,
            data: (strategies?.length || 0) + (vaults?.vaultPositions?.length || 0),
          }}
        >
          {vaults?.vaultPositions?.map((position) => (
            <div key={position.mappedVaultDetails.vaultAddress}>
              <Link to={RouterConfig.Builder.morphoVaultDetails(position.mappedVaultDetails.vaultAddress)}>
                <VaultTableDesktopRowContainer
                  vaultData={{
                    data: position,
                    ...vaultsRest,
                  }}
                />
                <VaultTableMobileRowContainer vaultData={{ data: position, ...vaultsRest }} />
              </Link>
            </div>
          ))}
          {strategies?.map((strategy, index) => (
            <div key={strategy.strategy}>
              <Link to={RouterConfig.Builder.ilmDetails(strategy.strategy)}>
                <StrategyTableDesktopRowContainer
                  strategy={strategy.strategy}
                  hideBorder={index === strategies.length - 1}
                />
                <StrategyTableMobileRowContainer strategy={strategy.strategy} />
              </Link>
            </div>
          ))}
        </EmptyTableGuard>
      </div>
    </div>
  );
};
