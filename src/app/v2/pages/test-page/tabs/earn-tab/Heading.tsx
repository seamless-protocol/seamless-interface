import { FlexCol, Typography, FlexRow, useFullTokenData, DisplayMoney } from "@shared";

import { useAssetPickerState } from "../../../../hooks/useAssetPickerState";
import { useFetchViewAssetPrice } from "../../../../../state/common/queries/useFetchViewAssetPrice";
import {
  TokenDescriptionDict,
  getTokenDescription,
} from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { assetSlugConfig } from "./config/SlugConfig";
import { AssetApy } from "../../../../components/AssetApy";
import { AssetTvl } from "../../../../components/AssetTvl";
import { useFetchViewSupplyIncentives } from "../../../../../state/lending-borrowing/hooks/useFetchViewSupplyIncentives";
import { IncentivesButton } from "../../../../components/IncentivesButton";
import { IncentivesDetailCard } from "../../../../components/IncentivesDetailCard";

export const Heading = () => {
  const { asset, isStrategy } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { data: tokenData } = useFullTokenData(asset);
  const description = getTokenDescription(asset);

  const {
    data: oraclePrice,
    isLoading: isOraclePriceLoading,
    isFetched: isOraclePriceFetched,
  } = useFetchViewAssetPrice({ asset });

  const { data: supplyIncentives, ...incentivesRest } = useFetchViewSupplyIncentives(asset);

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 gap-6">
      <div className="col-span-6">
        <FlexCol className="gap-3">
          <FlexCol className="gap-2 min-h-24">
            <Typography type="bold5">
              {(isStrategy ? TokenDescriptionDict[asset]?.strategyTitle : tokenData?.name) ||
                "Choose your strategy to earn APY"}
            </Typography>
            <Typography type="regular1">{description || "Seamless offers a wide range of options, from simple lending to advanced integrated strategies (ILM)"}</Typography>
          </FlexCol>
        </FlexCol>
      </div>
      {asset && (
        <div className="col-span-6">
          <FlexRow className="gap-5 md:gap-24 justify-between md:justify-center w-full mt-2">
            <FlexCol className="gap-1 text-center">
              <Typography type="regular3">TVL</Typography>
              <AssetTvl asset={asset} isStrategy={isStrategy} typography="bold5" />
            </FlexCol>
            <FlexCol className="gap-1 text-center">
              <Typography type="regular3">Est. APY</Typography>
              <AssetApy asset={asset} isStrategy={isStrategy} typography="bold5" />
              {!isStrategy && <IncentivesButton {...supplyIncentives} {...incentivesRest}>
                <IncentivesDetailCard {...supplyIncentives} assetSymbol={tokenData.symbol} />
              </IncentivesButton>}
            </FlexCol>
            <FlexCol className="gap-1 text-center">
              <Typography type="regular3">Oracle price</Typography>
              <DisplayMoney
                typography="bold5"
                {...oraclePrice}
                isLoading={isOraclePriceLoading}
                isFetched={isOraclePriceFetched}
              />
            </FlexCol>
          </FlexRow>
        </div>
      )}
    </div>
  );
};
