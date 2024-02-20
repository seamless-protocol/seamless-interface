import React from "react";
import {
  DisplayMoney,
  DisplayPercentage,
  DisplayText,
  DisplayTokenAmount,
  TableCell,
  TableRow,
} from "../../../../../shared";
import { ViewStrategy } from "../../../../state/ILM/types/ViewStrategy";
import { TemporaryButton } from "../../../../components/temporary-components/TemporaryButton";
import { DisplayDepositAsset } from "../DisplayDepositAsset";
import { useNavigate } from "react-router-dom";
import { RouterConfig } from "../../../../router";

export const StrategiesDesktopTableRow: React.FC<{
  index: number;
  strategy: ViewStrategy;
  isLoading?: boolean | undefined;
  isFetched?: boolean | undefined;
  hideBorder?: boolean;
}> = ({ index, strategy, isFetched, hideBorder }) => {
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
      <TableCell alignItems="items-start">
        <DisplayDepositAsset
          depositAsset={strategy?.depositAsset}
          isFetched={isFetched}
        />
      </TableCell>
      <TableCell>
        <DisplayText
          typography="h4"
          text={strategy?.strategyName}
          isFetched={isFetched}
        />
      </TableCell>

      <TableCell>
        <DisplayText
          typography="main16"
          {...strategy?.targetMultiple}
          isFetched={isFetched}
        />
      </TableCell>

      <TableCell>
        <DisplayPercentage
          {...strategy?.loopApy}
          typography="main16"
          isFetched={isFetched}
        />
      </TableCell>

      <TableCell>
        <DisplayTokenAmount
          {...strategy?.availableToDeposit?.tokenAmount}
          typography="main16"
          isFetched={isFetched}
        />
        <DisplayMoney
          {...strategy?.availableToDeposit?.dollarAmount}
          typography="subheader2"
          isFetched={isFetched}
        />
      </TableCell>

      <TableCell>
        <DisplayTokenAmount
          {...strategy?.yourPosition?.tokenAmount}
          typography="main16"
          isFetched={isFetched}
        />
        <DisplayMoney
          {...strategy?.yourPosition?.dollarAmount}
          typography="subheader2"
          isFetched={isFetched}
        />
      </TableCell>

      <TableCell>
        <TemporaryButton />
      </TableCell>
    </TableRow>
  );
};
