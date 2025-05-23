import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  TableRow,
  TableCell,
  FlexRow,
  Icon,
  FlexCol,
  DisplayMoney,
  DisplayText,
  Displayable,
  DisplayTokenAmount,
} from "@shared";

import { IncentivesButton } from "@app/v3/components/tooltip/AprTooltip";
import { IncentivesDetailCard } from "@app/v3/components/tooltip/IncentivesDetailCard";

import { LeverageToken } from "@app/data/leverage-tokens/queries/all-leverage-tokens/FetchAllLeverageTokens";
import { Tag } from "../../../../../components/strategy-data/Tag";

export const LeverageTokenDesktopTableRow: React.FC<{
  leverageToken: Displayable<LeverageToken>;
  hideBorder?: boolean;
  selected?: boolean;
}> = ({ leverageToken, hideBorder, selected }) => {
  const {
    data: {
      tokenData: { name, symbol, logo },
      additionalData: { description },
      availableSupplyCap,
      tvl,
      type,
      apy,
    },
    ...rest
  } = leverageToken;

  return (
    <div
      className={`hidden cursor-pointer md:grid items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      } ${selected ? "bg-neutral-100" : ""}`}
    >
      <TableRow className="md:grid grid-cols-6 relative">
        <TableCell alignItems="items-start col-span-2 pr-6">
          <FlexRow className="gap-4 items-center">
            <Icon width={64} src={logo} alt="logo" isLoading={rest.isLoading} isFetched={rest.isFetched} />
            <FlexCol className="gap-2 text-start">
              <FlexCol className="gap-[2px]">
                <DisplayText typography="bold3" viewValue={name} {...rest} />
                <DisplayText typography="regular1" viewValue={description} {...rest} />
              </FlexCol>
            </FlexCol>
          </FlexRow>
        </TableCell>

        <TableCell className="col-span-1">
          <div>{rest.isLoading ? <span className="w-10 h-6 skeleton flex" /> : <Tag tag={type} />}</div>
        </TableCell>

        <TableCell className="col-span-1">
          <DisplayTokenAmount typography="bold3" {...tvl.tokenAmount} {...rest} />

          <DisplayMoney typography="medium1" {...tvl.dollarAmount} {...rest} className="text-primary-600" />
        </TableCell>
        <TableCell className="col-span-1">
          <IncentivesButton
            totalApr={{
              ...apy.estimatedAPY,
            }}
            rewardTokens={apy.rewardTokens}
            {...rest}
          >
            <IncentivesDetailCard
              assetSymbol={symbol}
              totalApr={{
                ...apy.estimatedAPY,
              }}
              rewardTokens={apy.rewardTokens}
              {...rest}
            />
          </IncentivesButton>
        </TableCell>
        <TableCell className="col-span-1">
          <DisplayMoney
            typography="bold3"
            className={`${!availableSupplyCap.dollarAmount.bigIntValue ? "text-primary-600" : ""}`}
            {...availableSupplyCap.dollarAmount}
            {...rest}
          />
        </TableCell>

        <ChevronRightIcon width={20} className="absolute right-6" />
      </TableRow>
    </div>
  );
};
