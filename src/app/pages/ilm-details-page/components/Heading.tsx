import React from "react";
import {
  FlexCol,
  FlexRow,
  Typography,
  DisplayValue,
  DisplayPercentage,
  DisplayMoney,
  DisplayText,
  Icon,
} from "../../../../shared";
import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewTargetMultiple } from "../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { useFetchViewAssetPrice } from "../../../state/common/queries/useFetchViewAssetPrice";
import { useFetchViewStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewStrategyApy";

export const Heading: React.FC<{
  id: number;
}> = ({ id }) => {
  const strategyConfig = ilmStrategies[id];
  const {
    isLoading: isTargetMultipleLoading,
    isFetched: isTargetMultipleFetched,
    data: targetMultiple,
  } = useFetchViewTargetMultiple(strategyConfig.address);

  const {
    isLoading: isOraclePriceLoading,
    isFetched: isOraclePriceFetched,
    data: oraclePrice,
  } = useFetchViewAssetPrice(strategyConfig.underlyingAsset.address);

  const {
    isLoading: isApyLoading,
    isFetched: isApyFetched,
    data: apy,
  } = useFetchViewStrategyApy(id);

  return (
    <div className="gap-10 md:gap-48 text-text-primary flex md:flex-row flex-col">
      <FlexRow className="gap-3 text-start">
        <Icon
          src={strategyConfig.logo}
          alt={strategyConfig.underlyingAsset.symbol || "asset"}
          width={40}
          height={40}
        />
        <FlexCol>
          <DisplayText
            typography="main21"
            text={strategyConfig.underlyingAsset?.name}
          />
          <DisplayText
            typography="description"
            text={strategyConfig.underlyingAsset?.symbol}
          />
        </FlexCol>
      </FlexRow>
      <FlexRow className="gap-8">
        <FlexCol>
          <Typography type="description" color="light">
            Target multiple
          </Typography>
          <DisplayValue
            typography="main21"
            {...targetMultiple}
            isLoading={isTargetMultipleLoading}
            isFetched={isTargetMultipleFetched}
            loaderSkeleton
          />
        </FlexCol>
        <FlexCol>
          <Typography type="description" color="light">
            APY estimate
          </Typography>
          <DisplayPercentage
            typography="main21"
            {...apy}
            isLoading={isApyLoading}
            isFetched={isApyFetched}
          />
        </FlexCol>
        <FlexCol>
          <Typography type="description" color="light">
            Oracle price
          </Typography>
          <DisplayMoney
            typography="main21"
            {...oraclePrice}
            isLoading={isOraclePriceLoading}
            isFetched={isOraclePriceFetched}
          />
        </FlexCol>
      </FlexRow>
    </div>
  );
};
