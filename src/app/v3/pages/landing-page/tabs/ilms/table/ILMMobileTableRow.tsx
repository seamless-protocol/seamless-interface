import { Address } from "viem";
import { FlexRow, FlexCol, Icon, Typography, DisplayMoney, DisplayNumber } from "@shared";
import { Tag } from "../../../../../components/strategy-data/Tag";
import { useFetchFormattedAvailableStrategyCap } from "../../../../../../statev3/queries/AvailableStrategyCap.hook";
import { useFetchViewStrategyApy } from "../../../../../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { useFetchFormattedEquity } from "../../../../../../statev3/queries/Equity.hook";
import { getColorBasedOnSign, getSvgBasedOnSign } from "../../../../../utils/uiUtils";
import { useFetchTokenData } from "../../../../../../statev3/metadata/TokenData.fetch";

export const ILMMobileTableRow: React.FC<{
  strategy: Address;
  hideBorder?: boolean;
}> = ({ strategy }) => {
  const { data: strategyData, ...strategyDataRest } = useFetchTokenData(strategy);

  const { data: availableStrategyCap, ...availableStrategyCapRest } = useFetchFormattedAvailableStrategyCap(strategy);

  const { data: apy, ...apyRest } = useFetchViewStrategyApy(strategy);

  const { data: tvl, ...tvlRest } = useFetchFormattedEquity(strategy);

  return (
    <div className="flex md:hidden flex-col bg-white shadow rounded-lg p-4 m-2">
      <FlexCol className="items-end mb-[-10px]">
        <FlexRow>
          <Tag key={strategyData?.type} tag={strategyData?.type} {...strategyDataRest} />
        </FlexRow>
      </FlexCol>
      <FlexRow className="items-center mb-4">
        <FlexRow className="gap-4 items-center">
          <Icon width={40} src={strategyData?.icon} alt="logo" {...strategyDataRest} />
          <FlexCol className="gap-1 text-start">
            <Typography type="bold3" {...strategyDataRest}>
              {strategyData?.name}
            </Typography>
            <Typography type="regular1" {...strategyDataRest}>
              {strategyData?.symbol}
            </Typography>
          </FlexCol>
        </FlexRow>
      </FlexRow>

      <FlexRow className="justify-between">
        <FlexCol className="gap-2">
          <DisplayMoney {...availableStrategyCap.dollarAmount} {...availableStrategyCapRest} typography="bold3" />
        </FlexCol>

        <FlexCol className="items-end text-end gap-2">
          <FlexRow className="items-center gap-1">
            <Typography type="regular1">30d historical return: </Typography>
            <FlexRow className="items-center gap-1">
              <Icon src={getSvgBasedOnSign(apy.value)} alt="polygon" width={12} height={12} hidden={!apy.value} />
              <DisplayNumber typography="bold3" className={`${getColorBasedOnSign(apy.value)}`} {...apy} {...apyRest} />
            </FlexRow>
          </FlexRow>
          <FlexRow className="items-center gap-1">
            <Typography type="regular1">TVL: </Typography>
            <DisplayNumber typography="bold3" {...tvl.dollarAmount} {...tvlRest} />
          </FlexRow>
        </FlexCol>
      </FlexRow>
    </div>
  );
};
