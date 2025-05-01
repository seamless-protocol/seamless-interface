import { TableRow, TableCell, Typography, Tooltip } from "@shared";
import { Address } from "viem";
import { Link } from "react-router-dom";
import { RouterConfig } from "@router";
import { LoadingTableGuard } from "./LoadingTableGuard";
import { useFetchAllLeverageTokens } from "@app/data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { LeverageTokenDesktopTableRow } from "./ILMDesktopTableRow";
import { isNullableAddressEqual } from "@app/v3/utils/utils";
import { LeverageTokenMobileTableRow } from "./ILMMobileTableRow";
import { LoadingLeverageTokenDesktopTableRows } from "./loading-state/LoadingLeverageTokenDesktopTableRows";
import { LoadingLeverageTokenMobileTableRows } from "./loading-state/LoadingLeverageTokenMobileTableRows";

export const LeverageTokensTableContainer: React.FC<{
  selectedLeverageToken?: Address;
}> = ({ selectedLeverageToken }) => {
  const { data: leverageTokens, ...rest } = useFetchAllLeverageTokens();

  return (
    <div className="bg-neutral-0 shadow-card rounded-2xl w-full">
      <TableRow className="hidden md:grid grid-cols-6 py-[9px] bg-neutral-0 mt-0 max-h-9 justify-center rounded-t-2xl border-solid border-b border-b-divider">
        <TableCell className="col-span-2 justify-center" alignItems="items-start">
          <Typography type="bold1">Leverage Tokens</Typography>
        </TableCell>
        <TableCell className="col-span-1">
          <Typography type="bold1">Type</Typography>
        </TableCell>
        <TableCell className="col-span-1">
          <Typography type="bold1">TVL</Typography>
        </TableCell>
        <Tooltip tooltip="Yield APY - Borrow APY">
          <Typography type="bold1">Estimated APY</Typography>
        </Tooltip>
        <TableCell className="col-span-1">
          <Typography type="bold1">Available Supply Cap</Typography>
        </TableCell>
      </TableRow>

      <LoadingTableGuard
        loadingState={{
          ...rest,
          data: undefined,
        }}
        loadingComponent={<LoadingLeverageTokenDesktopTableRows />}
        mobileLoadingComponent={<LoadingLeverageTokenMobileTableRows />}
      >
        {leverageTokens?.map((lvrgToken, index) => (
          <div key={index}>
            <Link data-cy={`table-row-${lvrgToken}`} to={RouterConfig.Builder.ilmDetails(lvrgToken.address)}>
              <LeverageTokenDesktopTableRow
                leverageToken={{
                  data: {
                    ...lvrgToken,
                  },
                  ...rest,
                }}
                hideBorder={index === leverageTokens.length - 1}
                selected={isNullableAddressEqual(lvrgToken.address, selectedLeverageToken)}
              />
              <LeverageTokenMobileTableRow
                leverageToken={{
                  data: {
                    ...lvrgToken,
                  },
                  ...rest,
                }}
                hideBorder={index === leverageTokens.length - 1}
                selected={isNullableAddressEqual(lvrgToken.address, selectedLeverageToken)}
              />
            </Link>
          </div>
        ))}
      </LoadingTableGuard>
    </div>
  );
};
