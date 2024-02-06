import React from "react";
import {
  DisplayMoney,
  DisplayPercentage,
  DisplayTokenAmount,
  TableCell,
  TableRow,
} from "../../../../../shared";
import { TemporaryButton } from "../../../../components/temporary-components/TemporaryButton";
import { DisplayDepositAsset } from "../DisplayDepositAsset";
import { useNavigate } from "react-router-dom";
import { RouterConfig } from "../../../../router";
import { ViewAssetMarketInfo } from "../../../../state/lending-borrowing/types/ViewAssetMarketInfo";

export const AssetsMarketDesktopTableRow: React.FC<{
  index: number;
  strategy?: ViewAssetMarketInfo;
  isLoading?: boolean;
  hideBorder?: boolean;
}> = ({ index, strategy, isLoading, hideBorder }) => {
  const navigate = useNavigate();

  return (
    <TableRow
      rest={{
        onClick: () => navigate(RouterConfig.Builder.ilmDetails(index)),
      }}
      hideBorder={hideBorder}
      key={index}
      className="hidden md:grid grid-cols-7"
    >
      <TableCell
        className="overflow-hidden col-span-1"
        alignItems="items-start"
      >
        <DisplayDepositAsset
          depositAsset={strategy?.depositAsset}
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayTokenAmount
          {...strategy?.totalSupplied?.tokenAmount}
          typography="main16"
          isLoading={isLoading}
        />
        <DisplayMoney
          {...strategy?.totalSupplied?.dollarAmount}
          typography="subheader2"
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayPercentage
          typography="main16"
          {...strategy?.supplyApy}
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayTokenAmount
          {...strategy?.totalBorrowed?.tokenAmount}
          typography="main16"
          isLoading={isLoading}
        />
        <DisplayMoney
          {...strategy?.totalBorrowed?.dollarAmount}
          typography="subheader2"
          isLoading={isLoading}
        />
      </TableCell>
      <TableCell>
        <DisplayPercentage
          typography="main16"
          {...strategy?.borrowApyVariable}
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayPercentage
          typography="main16"
          {...strategy?.borrowApyStable}
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <TemporaryButton />
      </TableCell>
    </TableRow>
  );
};
