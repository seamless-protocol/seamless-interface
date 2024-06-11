import { FlexCol, FlexRow, DisplayMoney, Tooltip, Typography } from "@shared";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { useFetchViewAssetPrice } from "../../../../../../state/common/queries/useFetchViewAssetPrice";
import { AssetApy } from "../../../../../components/asset-data/AssetApy";
import { AssetTvl } from "../../../../../components/asset-data/AssetTvl";
import { useFetchViewSupplyIncentives } from "../../../../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { IncentivesButton } from "../../../../../components/incentives/IncentivesButton";
import { IncentivesDetailCard } from "../../../../../components/incentives/IncentivesDetailCard";
import { AssetHeading } from "./AssetHeading";
import { CapRemaining } from "../../../../../components/asset-data/CapRemaining";
import { useFetchViewLendingPoolInfo } from "../../../hooks/useFetchViewLendingPoolInfo";
import { StrategyGuard } from "../../../../../components/guards/StrategyGuard";
import { useFullTokenData } from "../../../../../../state/common/meta-data-queries/useFullTokenData";
import { StrategyState } from "../../../../../../state/common/types/StateTypes";
import { useFormSettingsContext } from "../../../../../components/forms/contexts/useFormSettingsContext";
import { useAssetPickerState } from "../../../../../hooks/useAssetPickerState";
import { assetSlugConfig } from "../config/SlugConfig";
import { useFetchAssetByAddress } from "../../../../../../state/common/hooks/useFetchAssetByAddress";
import { useFetchStrategyByAddress } from "../../../../../../state/common/hooks/useFetchStrategyByAddress";

export const Heading = () => {
  const { asset, isStrategy } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { subStrategy } = useFormSettingsContext();
  const { data: assetState } = useFetchAssetByAddress(asset);
  const { data: strategyState } = useFetchStrategyByAddress(asset);
  const { data: tokenData } = useFullTokenData(asset);

  const {
    data: oraclePrice,
    isLoading: isOraclePriceLoading,
    isFetched: isOraclePriceFetched,
  } = useFetchViewAssetPrice({ asset: isStrategy ? (assetState as StrategyState).underlyingAsset.address : asset });

  const { data: supplyIncentives, ...incentivesRest } = useFetchViewSupplyIncentives(asset);

  const { data, ...rest } = useFetchViewLendingPoolInfo();

  return (
    <div className="">
      {!asset && (
        <div
          className="flex md:flex-row flex-wrap w-full mt-2
            rounded-2xl shadow-card bg-neutral-0 p-6 gap-2"
        >
          <div className="min-h-12 text-left items-start justify-start">
            <Typography type="bold5">Seamless stats</Typography>
          </div>
          <div className="bg-neutral-100 rounded-2xl py-4 px-4 flex flex-wrap md:flex-row justify-evenly items-start w-full">
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular2">Total market size</Typography>
              <DisplayMoney {...data?.totalMarketSizeUsd} {...rest} typography="bold4" />
            </FlexCol>
            <div className="divider divider-horizontal" />
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular2">Total available</Typography>
              <DisplayMoney {...data?.totalAvailableUsd} {...rest} typography="bold4" />
            </FlexCol>
            <div className="divider divider-horizontal" />
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular2">Total borrows</Typography>
              <DisplayMoney {...data?.totalBorrowsUsd} {...rest} typography="bold4" />
            </FlexCol>
          </div>
        </div>
      )}
      {asset && (
        <div
          className="flex md:flex-row flex-wrap md:justify-center w-full mt-2
            rounded-2xl shadow-card bg-neutral-0 p-6 gap-2"
        >
          {asset && <AssetHeading asset={asset} />}

          <div className="bg-neutral-100 rounded-2xl py-4  px-4 md:gap-0 gap-3 flex flex-col md:flex-row justify-evenly items-start w-full">
            {/* item 1 */}
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular2">TVL</Typography>
              <AssetTvl isStrategy={isStrategy} asset={asset} subStrategy={subStrategy} typography="bold4" />
              <CapRemaining asset={asset} subStrategy={subStrategy} />
            </FlexCol>
            <div className="divider divider-horizontal" />
            {/* item 2 */}
            <FlexCol className="gap-1 md:text-center md:items-center">
              <FlexRow className="gap-2">
                <Typography type="regular2">Est. APY</Typography>
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
              <AssetApy
                asset={asset}
                isStrategy={isStrategy}
                subStrategy={subStrategy}
                typography="bold4"
                showWarning={false}
              />
              {!isStrategy && (
                <div className="max-w-40 md:max-w-full">
                  <IncentivesButton {...supplyIncentives} {...incentivesRest}>
                    <IncentivesDetailCard {...supplyIncentives} assetSymbol={tokenData.symbol} />
                  </IncentivesButton>
                </div>
              )}
            </FlexCol>
            <div className="divider divider-horizontal" />
            {/* item 3 */}
            <FlexCol className="gap-1 md:text-center">
              <Typography type="regular2">Oracle price</Typography>
              <DisplayMoney
                typography="bold4"
                {...oraclePrice}
                isLoading={isOraclePriceLoading}
                isFetched={isOraclePriceFetched}
              />
              <Typography type="medium1" className="text-primary-600">
                Updated ~1min ago
              </Typography>
            </FlexCol>
          </div>
        </div>
      )}
    </div>
  );
};
