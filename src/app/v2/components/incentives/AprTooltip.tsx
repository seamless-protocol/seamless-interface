import { DisplayPercentage, FlexRow, Tooltip, Icon, ViewNumber, useToken } from "@shared";
import { IncentivesDetailCard, ViewRewardToken } from "./IncentivesDetailCard";
import { Address } from "viem";
import { useFetchViewSupplyIncentives } from "../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { useFetchMaxStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewMaxStrategyApy";
import { useFetchStrategyIncentives } from "../../../state/loop-strategy/hooks/useFetchViewStrategyIncentives";
import { useFetchStrategyBySubStrategyAddressOrAddress } from "../../../state/common/hooks/useFetchStrategyBySubStrategyAddress";

interface IncentivesButtonProps {
  totalApr?: ViewNumber;
  rewardTokens?: ViewRewardToken[];
  children: React.ReactNode;
  isLoading?: boolean;
  isFetched?: boolean;
}

export const IncentivesButton: React.FC<IncentivesButtonProps> = ({
  totalApr,
  rewardTokens,
  children,
  isLoading,
  isFetched,
}) => {
  if (isLoading || !isFetched) {
    return <span className="skeleton mt-[0.2px] flex w-20 h-6" />;
  }

  if (!totalApr?.viewValue) {
    return null;
  }

  return (
    <Tooltip tooltip={children}>
      <FlexRow className=" bg-smallElements-rewardAPY items-center gap-2 border border-solid px-2 py-1.5 rounded-[100px] border-metallicBorder">
        <FlexRow className="object-cover ">
          {rewardTokens?.map((rewardToken, index) => {
            return (
              <Icon
                key={index}
                className={index > 0 ? "-ml-1 w-4 h-4" : "w-4 h-4"}
                src={rewardToken.logo}
                alt="reward-token-logo"
              />
            );
          })}
        </FlexRow>
        <DisplayPercentage {...totalApr} typography="medium2" />
      </FlexRow>
    </Tooltip>
  );
};

export const LendingIncentivesButton: React.FC<{ asset: Address | undefined }> = ({ asset }) => {
  const {
    data: { symbol: assetSymbol },
  } = useToken(asset);

  const { data: supplyIncentives, ...supplyRest } = useFetchViewSupplyIncentives(asset);

  return (
    <IncentivesButton {...supplyIncentives} {...supplyRest}>
      <IncentivesDetailCard {...supplyIncentives} assetSymbol={assetSymbol} />
    </IncentivesButton>
  );
};

export const StrategyIncentivesButton: React.FC<{ asset: Address | undefined }> = ({ asset }) => {
  const {
    data: { symbol: assetSymbol },
  } = useToken(asset);

  const { data: strategyConfig } = useFetchStrategyBySubStrategyAddressOrAddress(asset);

  const {
    data: { strategy: strategyWithMaxApy },
  } = useFetchMaxStrategyApy(asset);

  const strategy = strategyConfig?.multiplier
    ? strategyConfig.subStrategyData[strategyConfig.subStrategyData.length - 1].address
    : strategyWithMaxApy;

  const { data: incentives, ...incentivesRest } = useFetchStrategyIncentives(strategy);

  return (
    <IncentivesButton {...incentives} {...incentivesRest}>
      <IncentivesDetailCard {...incentives} assetSymbol={assetSymbol} />
    </IncentivesButton>
  );
};

interface AprTooltipProps {
  isStrategy?: boolean | undefined;
  asset?: Address | undefined;
}

export const AprTooltip: React.FC<AprTooltipProps> = ({ isStrategy, asset }) => {
  return isStrategy ? <StrategyIncentivesButton asset={asset} /> : <LendingIncentivesButton asset={asset} />;
};
