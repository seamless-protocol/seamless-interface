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
  ViewOracleContract,
  SmallWatchAssetButton,
  ViewTokenContract,
} from "@shared";
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
          <FlexRow className="gap-2">
            <DisplayText
              typography="main21"
              text={strategyConfig.underlyingAsset?.name}
            />
            <ViewTokenContract
              address={strategyConfig.underlyingAsset.address}
            />
            <SmallWatchAssetButton
              address={strategyConfig.underlyingAsset.address}
            />
          </FlexRow>
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
            symbolColor="light"
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
            symbolColor="light"
            isLoading={isApyLoading}
            isFetched={isApyFetched}
          />
        </FlexCol>
        <FlexCol>
          <Typography type="description" color="light">
            Oracle price
          </Typography>
          <FlexRow className="gap-2">
            <DisplayMoney
              symbolColor="light"
              typography="main21"
              {...oraclePrice}
              isLoading={isOraclePriceLoading}
              isFetched={isOraclePriceFetched}
            />
            <ViewOracleContract
              address={strategyConfig.underlyingAsset.address}
            />
          </FlexRow>
        </FlexCol>
      </FlexRow>
    </div>
  );
};
