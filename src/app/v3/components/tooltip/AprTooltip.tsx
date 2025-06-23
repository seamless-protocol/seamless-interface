import { DisplayPercentage, FlexRow, Tooltip, Icon, ViewNumber, useToken, FlexCol, Typography } from "@shared";
import { IncentivesDetailCard, ViewRewardToken } from "./IncentivesDetailCard";
import { Address } from "viem";
import { useFetchViewSupplyIncentives } from "../../../data/lending-deprecated/hooks/useFetchViewSupplyIncentives";
import { useFetchStrategyIncentives } from "../../../data/ilmv1-deprecated/queries/useFetchViewStrategyIncentives.all";
import { useFetchStrategyAssets } from "../../../data/ilmv1-deprecated/metadata/useFetchStrategyAssets";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface IncentivesButtonProps {
  totalApr?: ViewNumber;
  rewardTokens?: ViewRewardToken[];
  children: React.ReactNode;
  isLoading?: boolean;
  isFetched?: boolean;
  isError?: boolean;
  error?: any;
  errorMessage?: string;
  additionalElement?: React.ReactNode;
}

export const IncentivesButton: React.FC<IncentivesButtonProps> = ({
  totalApr,
  rewardTokens,
  children,
  isLoading = false,
  isFetched = true,
  error,
  errorMessage,
  isError,
  additionalElement,
}) => {
  if (isLoading || !isFetched) {
    return <span className="skeleton mt-[0.2px] flex w-20 h-6" />;
  }

  if (isError) {
    return (
      <div className="flex">
        <Tooltip
          tooltip={
            <Typography type="body1">
              {error?.message || errorMessage || "Could not load this value, try later 😓"}
            </Typography>
          }
        >
          <ExclamationTriangleIcon width={20} height={20} />
        </Tooltip>
      </div>
    );
  }

  if (!totalApr?.viewValue) {
    return null;
  }

  return (
    <div className="flex">
      <Tooltip tooltip={children} hidden={isError}>
        <FlexCol className="md:items-start items-end gap-1">
          <FlexRow className=" bg-smallElements-rewardAPY items-center gap-2 border border-solid px-2 py-1.5 rounded-[100px] border-metallicBorder max-w-max">
            <FlexRow className="object-cover ">
              {rewardTokens
                ?.filter((token, index, array) => index === array.findIndex((t) => t.logo === token.logo))
                .map((rewardToken, index) => (
                  <Icon
                    key={index}
                    className={index > 0 ? "-ml-1 w-4 h-4" : "w-4 h-4"}
                    src={rewardToken.logo}
                    alt="reward-token-logo"
                  />
                ))}
            </FlexRow>
            <DisplayPercentage {...totalApr} typography="medium2" isError={isError} />
          </FlexRow>
          {additionalElement}
        </FlexCol>
      </Tooltip>
    </div>
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

export const StrategyIncentivesButton: React.FC<{ strategy: Address | undefined }> = ({ strategy }) => {
  const { data: strategyAssets } = useFetchStrategyAssets(strategy);

  const {
    data: { symbol: underlyingAssetSymbol },
  } = useToken(strategyAssets?.underlying);

  const { data: incentives, ...incentivesRest } = useFetchStrategyIncentives(strategy);

  return (
    <IncentivesButton {...incentives} {...incentivesRest}>
      <IncentivesDetailCard {...incentives} assetSymbol={underlyingAssetSymbol} />
    </IncentivesButton>
  );
};

interface AprTooltipProps {
  isStrategy?: boolean | undefined;
  asset?: Address | undefined;
  strategy?: Address | undefined;
}

export const AprTooltip: React.FC<AprTooltipProps> = ({ isStrategy, asset }) => {
  return isStrategy ? <StrategyIncentivesButton strategy={asset} /> : <LendingIncentivesButton asset={asset} />;
};
