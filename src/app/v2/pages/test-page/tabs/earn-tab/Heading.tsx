import { FlexCol, Typography, FlexRow, DisplayMoney, Tooltip } from "@shared";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { useAssetPickerState } from "../../../../hooks/useAssetPickerState";
import { useFetchViewAssetPrice } from "../../../../../state/common/queries/useFetchViewAssetPrice";
import { assetSlugConfig } from "./config/SlugConfig";
import { AssetApy } from "../../../../components/AssetApy";
import { AssetTvl } from "../../../../components/AssetTvl";
import { useFetchViewSupplyIncentives } from "../../../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { IncentivesButton } from "../../../../components/IncentivesButton";
import { IncentivesDetailCard } from "../../../../components/IncentivesDetailCard";
import { AssetHeading } from "./AssetHeading";
import { CapRemaining } from "./CapRemaining";
import { useFetchViewLendingPoolInfo } from "../../hooks/useFetchViewLendingPoolInfo";
import { StrategyGuard } from "../../../../components/guards/StrategyGuard";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";
import {
  useStateHasMultipleAPYs,
  useStateStrategyByAddress,
} from "../../../../../state/common/hooks/useFetchAllAssetsState";
import { StrategyState } from "../../../../../state/common/types/StateTypes";

export const Heading = () => {
  const { asset, isStrategy, assetState } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { data: hasMultipleAPYs } = useStateHasMultipleAPYs(asset);
  const { data: strategyState } = useStateStrategyByAddress(asset);
  const { data: tokenData } = useFullTokenData(asset);

  const {
    data: oraclePrice,
    isLoading: isOraclePriceLoading,
    isFetched: isOraclePriceFetched,
  } = useFetchViewAssetPrice({ asset: isStrategy ? (assetState as StrategyState).underlyingAsset.address : asset });

  const { data: supplyIncentives, ...incentivesRest } = useFetchViewSupplyIncentives(asset);

  const { data, ...rest } = useFetchViewLendingPoolInfo();

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 gap-6">
      <div className="col-span-6">
        <FlexCol className="gap-3">
          {asset ? (
            <AssetHeading asset={asset} />
          ) : (
            <FlexCol className="gap-2 min-h-24">
              <Typography type="bold5">Choose your strategy to earn APY</Typography>
              <Typography type="regular1">
                Seamless offers a wide range of options, from simple lending to advanced integrated strategies (ILM)
              </Typography>
            </FlexCol>
          )}
        </FlexCol>
      </div>
      {!asset && (
        <div className="col-span-6">
          <div className="flex md:flex-row flex-col gap-12 md:gap-20 justify-between md:justify-center w-full mt-2">
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular3">Total market size</Typography>
              <DisplayMoney {...data?.totalMarketSizeUsd} {...rest} typography="bold5" />
            </FlexCol>
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular3">Total available</Typography>
              <DisplayMoney {...data?.totalAvailableUsd} {...rest} typography="bold5" />
            </FlexCol>
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular3">Total borrows</Typography>
              <DisplayMoney {...data?.totalBorrowsUsd} {...rest} typography="bold5" />
            </FlexCol>
          </div>
        </div>
      )}
      {asset && (
        <div className="col-span-6">
          <div className="flex md:flex-row flex-wrap gap-12 md:gap-16 justify-between md:justify-center w-full mt-2">
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular3">TVL</Typography>
              <AssetTvl asset={asset} isStrategy={isStrategy} typography="bold5" />
              <FlexRow className="max-w-40 md:max-w-full bg-background-capacity items-center border border-solid gap-1 px-2 py-1.5 rounded-[100px] border-metallicBorder">
                <CapRemaining assetState={assetState} />
              </FlexRow>
            </FlexCol>
            <FlexCol className="gap-1 md:text-center">
              <FlexRow className="gap-2">
                {hasMultipleAPYs ? (
                  <Typography type="regular3">APY, Up To</Typography>
                ) : (
                  <Typography type="regular3">Est. APY</Typography>
                )}
                <StrategyGuard asset={asset}>
                  <Tooltip
                    tooltip={
                      <Typography type="description">
                        30 day moving average denominated in
                        {strategyState?.debtAsset?.symbol}
                      </Typography>
                    }
                    size="small"
                    theme="dark"
                  >
                    <InformationCircleIcon className="cursor-pointer" width={15} />
                  </Tooltip>
                </StrategyGuard>
              </FlexRow>

              <AssetApy asset={asset} isStrategy={isStrategy} typography="bold5" showWarning={false} />
              {!isStrategy && (
                <div className="max-w-40 md:max-w-full">
                  <IncentivesButton {...supplyIncentives} {...incentivesRest}>
                    <IncentivesDetailCard {...supplyIncentives} assetSymbol={tokenData.symbol} />
                  </IncentivesButton>
                </div>
              )}
            </FlexCol>
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular3">Oracle price</Typography>
              <DisplayMoney
                typography="bold5"
                {...oraclePrice}
                isLoading={isOraclePriceLoading}
                isFetched={isOraclePriceFetched}
              />
            </FlexCol>
          </div>
        </div>
      )}
    </div>
  );
};
