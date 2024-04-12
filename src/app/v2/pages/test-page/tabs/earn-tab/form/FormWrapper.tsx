import { MyFormProvider, FlexCol, Typography, RHFInputSliderField, FlexRow, useFullTokenData } from "@shared";
import { useForm } from "react-hook-form";
import { AddStrategyModalWrapper } from "./AddStrategyModal";
import { useAssetPickerState } from "../../../../../hooks/useAssetPickerState";
import { Tag } from "../Tag";
import { RHFAmountInputWrapper } from "../../../../../components/RHFAmountInputWrapper";
import { assetSlugConfig, earnInputConfig } from "../config/SlugConfig";
import { SupplyModal } from "./SupplyModal";
import { AssetApy } from "../../../../../components/AssetApy";
import { AssetApr } from "../../../../../components/AssetApr";

export const FormWrapper = () => {
  const { asset, isStrategy } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { data: tokenData } = useFullTokenData(asset);
  const methods = useForm<{
    amount: string;
  }>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit } = methods;

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(() => {})}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexRow className="justify-between items-start">
            <FlexCol className="gap-1 min-h-14">
              {asset ? (
                <Typography type="bold4">{isStrategy ? "Add to strategy" : "Supply"}</Typography>
              ) : (
                <Typography type="bold4">Choose your strategy</Typography>
              )}
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>

            {asset != null && <LocalTag isStrategy={isStrategy} />}
          </FlexRow>
          <RHFAmountInputWrapper {...earnInputConfig} />
        </FlexCol>

        {isStrategy && (
          <FlexCol className="gap-4">
            <Typography type="bold3">Multiplier</Typography>
            <FlexCol>
              <RHFInputSliderField name="test" min="0" max="2" />
              <FlexRow className="justify-between pl-1">
                <Typography type="medium3">3x</Typography>
                <Typography type="medium3">5x</Typography>
                <Typography type="medium3">10x</Typography>
              </FlexRow>
            </FlexCol>
          </FlexCol>
        )}

        <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
          <Typography type="bold3">Summary</Typography>
          <FlexRow className="text-navy-600 justify-between">
            <Typography type="bold2">Estimated APY</Typography>
            {asset && (
              <AssetApy asset={asset} isStrategy={isStrategy} className="text-navy-1000" typography="medium2" />
            )}
          </FlexRow>
          {!isStrategy && (
            <FlexRow className="text-navy-600 justify-between">
              <Typography type="bold2">Rewards APR</Typography>
              {asset && <AssetApr asset={asset} className="text-navy-1000" typography="medium2" />}
            </FlexRow>
          )}
        </FlexCol>

        {isStrategy ? <AddStrategyModalWrapper asset={asset} /> : <SupplyModal />}
      </FlexCol>
    </MyFormProvider>
  );
};

const LocalTag: React.FC<{
  isStrategy: boolean;
}> = ({ isStrategy }) => {
  return isStrategy ? <Tag tag="ILM" /> : <Tag tag="LEND" />;
};
