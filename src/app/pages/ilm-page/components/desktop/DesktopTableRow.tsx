import React from "react";
import {
  DisplayMoney,
  DisplayPercentage,
  DisplayText,
  DisplayTokenAmount,
  FlexCol,
  FlexRow,
  Icon,
  TableCell,
  TableRow,
} from "../../../../../shared";
import { ViewStrategy } from "../../../../state/ILM/types/ViewStrategy";
import { TemporaryButton } from "../../../../components/temporary-components/TemporaryButton";

export const DesktopTableRow: React.FC<{
  index: number;
  strategy?: ViewStrategy;
  isLoading?: boolean;
  hideBorer?: boolean;
}> = ({ index, strategy, isLoading, hideBorer }) => {
  return (
    <TableRow
      rest={{ onClick: () => window.alert("Clicked:" + index) }}
      hideBorder={hideBorer}
      key={index}
      className="hidden md:grid grid-cols-8"
    >
      <TableCell
        className="overflow-hidden col-span-2"
        alignItems="items-start"
      >
        <FlexRow className="gap-2 text-start">
          <Icon
            src={strategy?.depositAsset.logo}
            alt={strategy?.depositAsset.name || "asset"}
            isLoading={isLoading}
          />
          <FlexCol>
            <DisplayText
              typography="h4"
              text={strategy?.depositAsset.name}
              isLoading={isLoading}
            />
            <DisplayText
              typography="subheader2"
              text={strategy?.depositAsset.description}
              isLoading={isLoading}
            />
          </FlexCol>
        </FlexRow>
      </TableCell>
      <TableCell>
        <DisplayText
          typography="h4"
          text={strategy?.strategyName}
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayText
          typography="main16"
          text={strategy?.targetMultiple}
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayPercentage
          {...strategy?.LoopAPY}
          typography="main16"
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayTokenAmount
          {...strategy?.availableToDeposit?.tokenAmount}
          typography="main16"
          isLoading={isLoading}
        />
        <DisplayMoney
          {...strategy?.availableToDeposit?.dollarAmount}
          typography="subheader2"
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <DisplayTokenAmount
          {...strategy?.yourPosition?.tokenAmount}
          typography="main16"
          isLoading={isLoading}
        />
        <DisplayMoney
          {...strategy?.yourPosition?.dollarAmount}
          typography="subheader2"
          isLoading={isLoading}
        />
      </TableCell>

      <TableCell>
        <TemporaryButton />
      </TableCell>
    </TableRow>
  );
};
