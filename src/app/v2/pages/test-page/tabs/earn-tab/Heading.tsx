import { FlexCol, Typography, FlexRow, useFullTokenData, DisplayMoney, DisplayText, Tooltip } from "@shared";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { useAssetPickerState } from "../../../../hooks/useAssetPickerState";
import { useFetchViewAssetPrice } from "../../../../../state/common/queries/useFetchViewAssetPrice";
import { findILMStrategyByAddress } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { assetSlugConfig } from "./config/SlugConfig";
import { AssetApy } from "../../../../components/AssetApy";
import { AssetTvl } from "../../../../components/AssetTvl";
import { useFetchViewSupplyIncentives } from "../../../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { IncentivesButton } from "../../../../components/IncentivesButton";
import { IncentivesDetailCard } from "../../../../components/IncentivesDetailCard";
import { AssetHeading } from "./AssetHeading";
import { useFetchViewDetailTotalSupplied } from "../../../../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewLendingPoolInfo } from "../../../../../v1/pages/ilm-page/hooks/useFetchViewLendingPoolInfo";

export const Heading = () => {
  const { asset, isStrategy } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { data: tokenData } = useFullTokenData(asset);

  const strategy = findILMStrategyByAddress(asset);

  const {
    data: oraclePrice,
    isLoading: isOraclePriceLoading,
    isFetched: isOraclePriceFetched,
  } = useFetchViewAssetPrice({ asset });

  const { data: supplyIncentives, ...incentivesRest } = useFetchViewSupplyIncentives(asset);

  const { data: supplyData, ...supplyDataRest } = useFetchViewDetailTotalSupplied(asset);

  const { data, ...rest } = useFetchViewLendingPoolInfo();
  // data?.totalMarketSizeUsd
  // data?.totalAvailableUsd
  // data?.totalBorrowsUsd
  return (
    <div className="grid grid-cols-6 md:grid-cols-12 gap-6">
      <div className="col-span-6">
        <FlexCol className="gap-3">
          {asset ? (
            <AssetHeading asset={asset} isStrategy={isStrategy} />
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
              {!isStrategy && (
                <FlexRow className="max-w-40 md:max-w-full bg-background-capacity items-center border border-solid gap-1 px-2 py-1.5 rounded-[100px] border-metallicBorder">
                  <DisplayText
                    // eslint-disable-next-line
                    viewValue={supplyData.capacityRemaining?.viewValue + "% capacity remaining"}
                    {...supplyDataRest}
                    typography="medium2"
                  />
                </FlexRow>
              )}
            </FlexCol>
            <FlexCol className="gap-1 md:text-center">
              <FlexRow className="gap-2">
                <Typography type="regular3">Est. APY</Typography>
                {isStrategy && (
                  <Tooltip
                    openOnClick
                    tooltip={
                      <Typography type="description">
                        30 day moving average denominated in {strategy?.debtAsset.symbol}
                      </Typography>
                    }
                    size="small"
                    theme="dark"
                  >
                    <InformationCircleIcon className="cursor-pointer" width={15} />
                  </Tooltip>
                )}
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
