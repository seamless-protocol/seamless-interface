import React from "react";
import {
  DisplayMoney,
  DisplayPercentage,
  DisplayTokenAmount,
  FlexCol,
  TableCell,
  TableRow,
} from "../../../../../shared";
import { TemporaryButton } from "../../../../components/temporary-components/TemporaryButton";
import { DisplayDepositAsset } from "../DisplayDepositAsset";
import { useNavigate } from "react-router-dom";
import { RouterConfig } from "../../../../router";
import { IncentivesButton } from "./IncentivesButton";
import { ViewBaseAsset } from "../../../../state/lending-borrowing/types/ViewBaseAsset";

export const BaseAssetsDesktopTableRow: React.FC<{
  index: number;
  asset?: ViewBaseAsset;
  isLoading?: boolean;
  hideBorder?: boolean;
}> = ({ index, asset, isLoading, hideBorder }) => {
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
          depositAsset={asset?.depositAsset}
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayTokenAmount
          {...asset?.totalSupplied?.tokenAmount}
          typography="main16"
          isLoading={isLoading}
        />
        <DisplayMoney
          {...asset?.totalSupplied?.dollarAmount}
          typography="subheader2"
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <FlexCol className="">
          <DisplayPercentage
            typography="main16"
            {...asset?.supplyApy}
            isLoading={isLoading}
          />
          {asset?.supplyIncentives.totalApy.value !== "" && (
            <IncentivesButton {...asset?.supplyIncentives} />
          )}
        </FlexCol>
      </TableCell>

      <TableCell className="flex items-center">
        <DisplayTokenAmount
          {...asset?.totalBorrowed?.tokenAmount}
          typography="main16"
          isLoading={isLoading}
        />
        <DisplayMoney
          {...asset?.totalBorrowed?.dollarAmount}
          typography="subheader2"
          isLoading={isLoading}
        />
      </TableCell>
      <TableCell>
        <DisplayPercentage
          typography="main16"
          {...asset?.borrowApyVariable}
          isLoading={isLoading}
        />
        {asset?.borrowVariableIncentives.totalApy.value !== "" && (
          <IncentivesButton {...asset?.borrowVariableIncentives} />
        )}
      </TableCell>

      <TableCell>
        <DisplayPercentage
          typography="main16"
          {...asset?.borrowApyStable}
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <TemporaryButton />
      </TableCell>
    </TableRow>
  );
};
