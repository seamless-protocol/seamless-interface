import { Address } from "viem";
import { FlexRow, FlexCol, Icon, Typography, DisplayMoney, DisplayNumber } from "@shared";
import { Tag } from "../../../../../components/strategy-data/Tag";
import { useFetchFormattedAvailableStrategyCap } from "../../../../../../statev3/queries/AvailableStrategyCap.hook";
import { useFetchFormattedEquity } from "../../../../../../statev3/queries/Equity.hook";
import { getColorBasedOnSign, getSvgBasedOnSign } from "../../../../../utils/uiUtils";
import { useFetchFullStrategyData } from "../../../../../../statev3/metadata/FullStrategyData.all";
import { useFetchFormattedStrategyHistoricReturn } from "../../../../../../statev3/hooks/StrartegyReturn.hook";
import { StrategyIncentivesButton } from "../../../../../components/tooltip/AprTooltip";

export const ILMMobileTableRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
  selected?: boolean;
}> = ({ strategy, selected }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchFullStrategyData(strategy);

  const { data: availableStrategyCap, ...availableStrategyCapRest } = useFetchFormattedAvailableStrategyCap(strategy);

  const { data: apy, ...apyRest } = useFetchFormattedStrategyHistoricReturn(strategy);

  const { data: tvl, ...tvlRest } = useFetchFormattedEquity(strategy);

  return (
    <div
      className={`flex flex-col md:hidden p-4 m-2 bg-white rounded-lg shadow  ${selected ? "bg-neutral-100" : "bg-white"}`}
    >
      <FlexCol className="items-end mb-[-10px]">
        <FlexRow>
          <Tag key={strategyData?.type} tag={strategyData?.type} {...strategyDataRest} />
        </FlexRow>
      </FlexCol>
      <FlexRow className="items-center mb-4">
        <FlexRow className="gap-4 items-center">
          <Icon width={40} src={strategyData?.logo} alt="logo" />
          <FlexCol className="gap-1 text-start">
            <Typography type="bold3">{strategyData?.name}</Typography>
            <Typography type="regular1">{strategyData?.symbol}</Typography>
          </FlexCol>
        </FlexRow>
      </FlexRow>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Typography type="regular1">TVL:</Typography>
          <FlexCol className="items-end">
            <DisplayMoney typography="bold3" {...tvl.dollarAmount} {...tvlRest} />
          </FlexCol>
        </div>
        <div className="flex justify-between items-center">
          <Typography type="regular1">Rewards APR:</Typography>
          <StrategyIncentivesButton strategy={strategy} />
        </div>
        <div className="flex justify-between items-center">
          <Typography type="regular1">30d historical return:</Typography>
          <FlexRow className="items-center gap-1">
            <Icon src={getSvgBasedOnSign(apy.value)} alt="polygon" width={12} height={12} hidden={!apy.value} />
            <DisplayNumber typography="bold3" className={`${getColorBasedOnSign(apy.value)}`} {...apy} {...apyRest} />
          </FlexRow>
        </div>
        <div className="flex justify-between items-center">
          <Typography type="regular1">Available cap:</Typography>
          <FlexCol className="items-end">
            <DisplayMoney typography="bold3" {...availableStrategyCap.dollarAmount} {...availableStrategyCapRest} />
          </FlexCol>
        </div>
      </div>
    </div>
  );
};
