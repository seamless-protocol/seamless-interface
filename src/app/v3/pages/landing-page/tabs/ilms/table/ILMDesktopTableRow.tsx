import { Address } from "viem";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { TableRow, TableCell, FlexRow, Icon, FlexCol, DisplayNumber, DisplayMoney, DisplayText } from "@shared";
import { Tag } from "../../../../../components/strategy-data/Tag";
import { useFetchFormattedAvailableStrategyCap } from "../../../../../../statev3/queries/AvailableStrategyCap.hook";
import { useFetchFormattedEquity } from "../../../../../../statev3/queries/Equity.hook";
import { getColorBasedOnSign, getSvgBasedOnSign } from "../../../../../utils/uiUtils";
import { useFetchFormattedStrategyHistoricReturn } from "../../../../../../statev3/hooks/StrartegyReturn.hook";
import { StrategyIncentivesButton } from "../../../../../../v2/components/incentives/AprTooltip";
import { useFetchFullStrategyData } from "../../../../../../statev3/metadata/FullStrategyData.all";

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
            <Icon width={64} src={strategyData?.icon} alt="logo" />
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
          <DisplayMoney typography="bold3" {...availableStrategyCap.dollarAmount} {...availableStrategyCapRest} />
        </TableCell>

        <TableCell className="col-span-1">
          <FlexRow className="items-center gap-1">
            <Icon src={getSvgBasedOnSign(apy.value)} alt="polygon" width={12} height={12} hidden={!apy.value} />
            <DisplayNumber typography="bold3" className={`${getColorBasedOnSign(apy.value)}`} {...apy} {...apyRest} />
          </FlexRow>
        </TableCell>
        <TableCell className="col-span-1">
          <StrategyIncentivesButton strategy={strategy} />
        </TableCell>
        <TableCell className="col-span-1">
          <DisplayNumber typography="bold3" {...tvl.dollarAmount} {...tvlRest} />
        </TableCell>

        <ChevronRightIcon width={20} className="absolute right-6" />
      </TableRow>
    </div>
  );
};
