import { Address } from "viem";
import { Link } from "react-router-dom";
import { RouterConfig } from "@router";

import { TableRow, TableCell, Typography, FlexRow } from "@shared";

import { isNullableAddressEqual } from "@app/v3/utils/utils";
import { LoadingTableGuard } from "./LoadingTableGuard";

import { LeverageTokenDesktopTableRow } from "./ILMDesktopTableRow";
import { LeverageTokenMobileTableRow } from "./ILMMobileTableRow";
import { LoadingLeverageTokenDesktopTableRows } from "./loading-state/LoadingLeverageTokenDesktopTableRows";
import { LoadingLeverageTokenMobileTableRows } from "./loading-state/LoadingLeverageTokenMobileTableRows";
import { useFetchAllLeverageTokens } from "../../../../../../data/leverage-tokens/queries/all-leverage-tokens/fetch-leverage-tokens.all";

export const LeverageTokensTableContainer: React.FC<{
  selectedLeverageToken?: Address;
}> = ({ selectedLeverageToken }) => {
  const { data: leverageTokens, ...rest } = useFetchAllLeverageTokens();

  return (
    <div className="bg-neutral-0 shadow-card rounded-2xl w-full">
      <TableRow className="hidden md:grid grid-cols-4 py-[9px] bg-neutral-0 mt-0 max-h-9 justify-center rounded-t-2xl border-solid border-b border-b-divider">
        <TableCell className="col-span-2 justify-center" alignItems="items-start">
          <Typography type="bold1">Name</Typography>
        </TableCell>
        <TableCell className="col-span-1">
          <Typography type="bold1">TVL</Typography>
        </TableCell>
        <FlexRow className="items-center gap-1">
          <Typography type="bold1">Estimated APY</Typography>
        </FlexRow>
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
            <Link data-cy={`table-row-${lvrgToken}`} to={RouterConfig.Builder.leverageTokenDetails(lvrgToken.address)}>
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
