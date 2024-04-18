import { Address } from "viem";
import { useFullTokenData, DisplayValue, FlexRow, Icon, Typography, FlexCol } from "@shared";
import { TokenDescriptionDict } from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { findILMStrategyByAddress, StrategyConfig } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewTargetMultiple } from "../../../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { AssetApr } from "../../../AssetApr";
import { StrategyApy } from "../../../AssetApy";
import { useEarnFormContext } from "../contexts/useEarnFormContext";

export const Summary: React.FC<{
  asset: Address;
}> = ({ asset }) => {
  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <SummaryLocal strategy={strategy} />;
};

const SummaryLocal: React.FC<{
  strategy: StrategyConfig;
}> = ({ strategy }) => {
  const { asset } = useEarnFormContext();

  const { data: tokenData } = useFullTokenData(asset);

  const { data: strategyTokenData } = useFullTokenData(strategy.address);


  const {
    data: targetMultiple,
    isLoading: isTargetMultipleLoading,
    isFetched: isTargetMultipleFetched,
  } = useFetchViewTargetMultiple(strategy.address);



  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4 cursor-default">
      <Typography type="bold3">Summary</Typography>
      <LocalRow label="Estimated APY">
        {asset && (
          <StrategyApy asset={asset} className="text-navy-1000" typography="medium2" />
        )}
      </LocalRow>
      <FlexRow className="text-navy-600 justify-between">
        <Typography type="bold2">Rewards APR</Typography>
        {asset && <AssetApr asset={asset} className="text-navy-1000" typography="medium2" />}
      </FlexRow>
      <LocalRow label="Action">Deposit</LocalRow>
      <LocalRow label="Strategy">{TokenDescriptionDict[asset]?.strategyTitle}</LocalRow>
      <LocalRow label="Multiplier">
        <DisplayValue {...targetMultiple} isLoading={isTargetMultipleLoading} isFetched={isTargetMultipleFetched} loaderSkeleton />
      </LocalRow>
      <LocalRow label="Starting Asset">
        <FlexRow className="gap-2 items-center">
          {`${tokenData.symbol}`}
          <Icon src={tokenData?.logo} alt={tokenData?.shortName || ""} width={16} />
        </FlexRow>
      </LocalRow>
      <LocalRow label="Ending Asset">{strategyTokenData.symbol}</LocalRow>
    </FlexCol>
  );
};

const LocalRow: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <FlexRow className="text-navy-600 justify-between">
      <Typography type="bold2">{label}</Typography>
      <Typography type="medium2" className="text-navy-1000">
        {children}
      </Typography>
    </FlexRow>
  );
};
