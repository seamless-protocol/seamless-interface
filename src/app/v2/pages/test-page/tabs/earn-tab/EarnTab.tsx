import { Heading } from "./heading/Heading";
import { assetSlugConfig } from "./config/SlugConfig";
import { useAssetPickerState } from "../../../../hooks/useAssetPickerState";
import { StrategyForm } from "../../../../components/forms/earn-forms/deposit-strategy-form/StrategyForm";
import { SupplyForm } from "../../../../components/forms/earn-forms/supply-form/SupplyForm";
import { FormSettingsProvider } from "../../../../components/forms/contexts/FormSettingsContext";
import { AdditionalInfo } from "./AdditionalInfo";
import { AssetPickerWithFilter } from "../../../../components/asset-picker/AssetPickerWithFilter";
import { FlexCol, Typography } from "../../../../../../shared";

export const EarnTab = () => {
  const { asset, isStrategy } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });

  return (
    <FormSettingsProvider defaultAsset={asset} overrideUrlSlug={assetSlugConfig}>
      <div className="px-4 md:px-0">
        <div className="flex flex-row gap-6">
          <div className="w-[45%] overflow-auto hidden md:block">
            <FlexCol className="gap-3">
              <FlexCol className="gap-2 min-h-24">
                <Typography type="bold5">Earn</Typography>
                <Typography type="regular1">
                  Choose your strategy to earn APY. Seamless offers a wide range of options, from simple lending to
                  advanced integrated strategies (ILM)
                </Typography>
              </FlexCol>
            </FlexCol>
            <AssetPickerWithFilter overrideUrlSlug={assetSlugConfig} size="normal" />
          </div>
          <div className="md:w-[55%] flex flex-col gap-4 overflow-auto">
            <Heading />

            <div className="bg-white shadow-card px-8 rounded-card py-6">
              {isStrategy ? <StrategyForm /> : <SupplyForm />}
            </div>
            <AdditionalInfo asset={asset} isStrategy={isStrategy} />
          </div>
        </div>
      </div>
    </FormSettingsProvider>
  );
};
