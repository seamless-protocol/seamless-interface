import { Address } from "viem";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { TableRow, TableCell, FlexRow, Icon, FlexCol, Typography, DisplayNumber, DisplayMoney } from "@shared";
import { Tag } from "../../../../../components/strategy-data/Tag";
import {
  getStrategyDescription,
  getStrategyIcon,
  getStrategyName,
  getStrategyTag,
} from "../../../../../../statev3/settings/config";
import { useFetchViewStrategyApy } from "../../../../../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { useFetchFormattedAvailableStrategyCap } from "../../../../../../statev3/queries/AvailableStrategyCap.hook";
import { useFetchFormattedEquity } from "../../../../../../statev3/queries/Equity.hook";
import { IncentivesButton } from "./IncentivesButton";
import { getApyColor, getApyIndicatorSvg } from "../../../../../utils/uiUtils";

export const ILMDesktopTableRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy, hideBorder }) => {
  const name = getStrategyName(strategy);
  const description = getStrategyDescription(strategy);
  const type = getStrategyTag(strategy);
  const icon = getStrategyIcon(strategy);

  const { data: availableStrategyCap, ...availableStrategyCapRest } = useFetchFormattedAvailableStrategyCap(strategy);

  const { data: apy, ...apyRest } = useFetchViewStrategyApy(strategy);

  const { data: tvl, ...tvlRest } = useFetchFormattedEquity(strategy);

  return (
    <div
      className={`hidden cursor-pointer md:grid items-center border-solid min-h-[148px] ${
        hideBorder ? "" : "border-b border-b-navy-100"
      }`}
    >
      <TableRow className="md:grid grid-cols-7 relative">
        <TableCell alignItems="items-start col-span-2 pr-6">
          <FlexRow className="gap-4 items-center">
            <Icon width={64} src={icon} alt="logo" />
            <FlexCol className="gap-2 text-start">
              <FlexCol className="gap-[2px]">
                <Typography type="bold3">{name}</Typography>
                <Typography type="regular1">{description}</Typography>
              </FlexCol>
            </FlexCol>
          </FlexRow>
        </TableCell>

        <TableCell className="col-span-1">
          <FlexRow>
            <Tag key={type} tag={type} />
          </FlexRow>
        </TableCell>
        <TableCell className="col-span-1">
          <DisplayMoney typography="bold3" {...availableStrategyCap.dollarAmount} {...availableStrategyCapRest} />
        </TableCell>

        <TableCell className="col-span-1">
          <FlexRow className="items-center gap-1">
            <Icon src={getApyIndicatorSvg(apy)} alt="polygon" width={12} height={12} hidden={!apy.value} />
            <DisplayNumber typography="bold3" className={`${getApyColor(apy)}`} {...apy} {...apyRest} />
          </FlexRow>
        </TableCell>
        <TableCell className="col-span-1">
          <IncentivesButton strategy={strategy} />
        </TableCell>
        <TableCell className="col-span-1">
          <DisplayNumber typography="bold3" {...tvl.dollarAmount} {...tvlRest} />
        </TableCell>

        <ChevronRightIcon width={20} className="absolute right-6" />
      </TableRow>
    </div>
  );
};
