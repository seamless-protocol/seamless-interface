import React from "react";
import { Address } from "viem";
import { TableRow, TableCell, Typography } from "@shared";
import { Link } from "react-router-dom";
import { VaultDesktopRow } from "./VaultDesktopRow";
import { VaultMobileRow } from "./VaultMobileRow";
import { VaultsTableHeader } from "./VaultsTableHeader";
import { useFormattedVaultsInfo } from "../hooks/useFetchAllVaults";
import { RouterConfig } from "@router";
import { configuredVaultAddresses } from "../../../../../../data/settings/config";

const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="w-6 h-6 border-4 border-gray-300 rounded-full border-t-transparent animate-spin" />
  </div>
);

const columnsCount = 6;

export const VaultsTableContainer: React.FC<{
  selectedVault?: Address;
}> = ({ selectedVault }) => {
  const { data: vaults, isLoading, error } = useFormattedVaultsInfo(configuredVaultAddresses);

  return (
    <div className="md:bg-neutral-0 bg-none shadow-card rounded-2xl w-full min-h-[150px] flex flex-col">
      <VaultsTableHeader />

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <TableRow className="hidden md:grid grid-cols-6 min-h-[100px] items-center justify-center">
            <TableCell className={`col-span-${columnsCount}`}>
              <Spinner />
            </TableCell>
          </TableRow>
          {/* Mobile fallback while loading */}
          <div className="md:hidden flex-1 flex items-center justify-center">
            <Spinner />
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="flex-1 flex items-center justify-center">
          <TableRow className="hidden md:grid grid-cols-6 min-h-[100px] items-center justify-center">
            <TableCell className={`col-span-${columnsCount} flex justify-center`}>
              <Typography type="bold3" className="text-red-500">
                Error: {String(error)}
              </Typography>
            </TableCell>
          </TableRow>
          {/* Mobile fallback on error */}
          <div className="md:hidden flex-1 flex items-center justify-center">
            <Typography type="bold3" className="text-red-500">
              Error: {String(error)}
            </Typography>
          </div>
        </div>
      )}

      {/* Data Rows */}
      {!isLoading &&
        !error &&
        vaults?.map((vault, index) => {
          return (
            <Link
              key={vault.vaultAddress}
              to={RouterConfig.Builder.morphoVaultDetails(vault.vaultAddress)}
              className="no-underline text-inherit"
              data-cy={`table-row-${vault.vaultAddress}`}
            >
              <div className="border-b border-b-divider last:border-b-0 hover:bg-neutral-100">
                <VaultDesktopRow
                  {...vault}
                  hideBorder={index === vaults.length - 1}
                  selected={vault.vaultAddress === selectedVault}
                />
                <VaultMobileRow {...vault} selected={vault.vaultAddress === selectedVault} />
              </div>
            </Link>
          );
        })}

      {/* If no error, no loading, but no data */}
      {!isLoading && !error && vaults && vaults.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <TableRow className="hidden md:grid grid-cols-6 min-h-[100px] items-center justify-center">
            <TableCell className={`col-span-${columnsCount} flex justify-center`}>
              <Typography type="bold3">No vaults found</Typography>
            </TableCell>
          </TableRow>
          {/* Mobile fallback for no data */}
          <div className="md:hidden flex-1 flex items-center justify-center">
            <Typography type="bold3">No vaults found</Typography>
          </div>
        </div>
      )}
    </div>
  );
};
