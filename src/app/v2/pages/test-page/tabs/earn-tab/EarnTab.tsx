import { Heading } from "./Heading";

import { AssetPicker } from "../../../../components/AssetPicker";
import { assetSlugConfig } from "./config/SlugConfig";
import { useAssetPickerState } from "../../../../hooks/useAssetPickerState";
import { StrategyForm } from "../../../../components/forms/earn-form/deposit-strategy-form/StrategyForm";
import { SupplyForm } from "../../../../components/forms/earn-form/supply-form/SupplyForm";
import { EarnFormProvider } from "../../../../components/forms/earn-form/contexts/EarnFormContext";

export const EarnTab = () => {
  const { isStrategy, asset } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });

  return (
    <div>
      <Heading />
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block col-span-5">
            <AssetPicker overrideUrlSlug={assetSlugConfig} />
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="bg-neutral-0 px-8 shadow-card rounded-card py-6">

              <EarnFormProvider
                defaultAsset={asset}
                overrideUrlSlug={assetSlugConfig}>
                {isStrategy ? <StrategyForm /> : <SupplyForm />}
              </EarnFormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
