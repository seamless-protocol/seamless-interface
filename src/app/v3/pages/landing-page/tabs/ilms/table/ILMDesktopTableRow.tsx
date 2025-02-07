import { Address } from "viem";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { TableRow, TableCell, FlexRow, Icon, FlexCol, DisplayNumber, DisplayMoney, DisplayText } from "@shared";
import { Tag } from "../../../../../components/strategy-data/Tag";
import { useFetchFormattedAvailableStrategyCap } from "../../../../../../statev3/queries/AvailableStrategyCap.hook";
import { useFetchFormattedEquity } from "../../../../../../statev3/queries/Equity.hook";
import { useFetchFormattedStrategyHistoricReturn } from "../../../../../../statev3/hooks/StrartegyReturn.hook";
import { StrategyIncentivesButton } from "../../../../../components/tooltip/AprTooltip";
import { useFetchFullStrategyData } from "../../../../../../statev3/metadata/FullStrategyData.all";
import { SignIndicatingElement } from "../../../../../components/other/SignIndicatingElement";

export const ILMDesktopTableRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
  selected?: boolean;
}> = ({ strategy, hideBorder, selected }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchFullStrategyData(strategy);

  const { data: availableStrategyCap, ...availableStrategyCapRest } = useFetchFormattedAvailableStrategyCap(strategy);

  const { data: apy, ...apyRest } = useFetchFormattedStrategyHistoricReturn(strategy);

  const { data: tvl, ...tvlRest } = useFetchFormattedEquity(strategy);

  return (
    <div
      className={`hidden cursor-pointer md:grid items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      } ${selected ? "bg-neutral-100" : ""}`}
    >
      <TableRow className="md:grid grid-cols-7 relative">
        <TableCell alignItems="items-start col-span-2 pr-6">
          <FlexRow className="gap-4 items-center">
            <Icon width={64} src={strategyData?.logo} alt="logo" />
            <FlexCol className="gap-2 text-start">
              <FlexCol className="gap-[2px]">
                <DisplayText typography="bold3" viewValue={strategyData?.name} />
                <DisplayText typography="regular1" viewValue={strategyData?.description} />
              </FlexCol>
            </FlexCol>
          </FlexRow>
        </TableCell>

        <TableCell className="col-span-1">
          <FlexRow>
            {/* todo refactor this */}
            {strategyDataRest?.isFetched ? (
              <Tag key={strategyData?.type} tag={strategyData?.type} />
            ) : (
              <div style={{ width: "60px", height: "30px" }} className="skeleton flex mb-[0.5px]" />
            )}
          </FlexRow>
        </TableCell>
        <TableCell className="col-span-1">
          <DisplayMoney typography="bold3" {...tvl.dollarAmount} {...tvlRest} />
        </TableCell>
        <TableCell className="col-span-1">
          <StrategyIncentivesButton strategy={strategy} />
        </TableCell>
        <TableCell className="col-span-1">
          <SignIndicatingElement
            noBackground
            dislayable={{
              ...apyRest,
              data: apy,
            }}
          >
            <DisplayNumber typography="bold3" {...apy} {...apyRest} />
          </SignIndicatingElement>
        </TableCell>
        <TableCell className="col-span-1">
          <DisplayMoney
            typography="bold3"
            className={`${!availableStrategyCap.dollarAmount.bigIntValue ? "text-primary-600" : ""}`}
            {...availableStrategyCap.dollarAmount}
            {...availableStrategyCapRest}
          />
        </TableCell>

        <ChevronRightIcon width={20} className="absolute right-6" />
      </TableRow>
    </div>
  );
};
