import { Heading } from "./Heading";
import { AssetPicker } from "../../../../components/AssetPicker";
import { assetSlugConfig } from "./config/SlugConfig";
import { useAssetPickerState } from "../../../../hooks/useAssetPickerState";
import { StrategyForm } from "../../../../components/forms/earn-forms/deposit-strategy-form/StrategyForm";
import { SupplyForm } from "../../../../components/forms/earn-forms/supply-form/SupplyForm";
import { FormSettingsProvider } from "../../../../components/forms/contexts/FormSettingsContext";
import { AdditionalInfo } from "./AdditionalInfo";

export const EarnTab = () => {
  const { asset, isStrategy } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });

  return (
    <div className="px-4 md:px-0">
      <Heading />
      <div className="flex flex-row gap-6">
        <div className="flex-1 overflow-auto pt-6 hidden md:block">
          <AssetPicker overrideUrlSlug={assetSlugConfig} size="normal" />
        </div>
        <div className="flex-1 flex flex-col gap-4 overflow-auto pt-6">
          <div className="bg-white shadow-card px-8 rounded-card py-6">
            <FormSettingsProvider defaultAsset={asset} overrideUrlSlug={assetSlugConfig}>
              {isStrategy ? <StrategyForm /> : <SupplyForm />}
            </FormSettingsProvider>
          </div>
          <AdditionalInfo asset={asset} isStrategy={isStrategy} />
        </div>
      </div>
    </div>
  );
};
