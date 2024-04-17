import { useForm } from "react-hook-form";
import { useFullTokenData, MyFormProvider, FlexCol, Typography, WatchAssetComponentv2, useNotificationContext } from "../../../../../shared";
import { RHFAmountInputWrapper } from "../../RHFAmountInputWrapper";
import { useAssetPickerState } from "../../../hooks/useAssetPickerState";
import { assetSlugConfig, earnInputConfig } from "../../../pages/test-page/tabs/earn-tab/config/SlugConfig";
import { SupplyButtons } from "./SupplyButtons";
import { SupplySummary } from "./SupplySummary";
import { useMutateSupplyLending } from "../../../../state/lending-borrowing/mutations/useMutateSupplyLending";
import { DepositModalFormData } from "../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";

export const SupplyForm = () => {
  const { asset } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { data: tokenData } = useFullTokenData(asset);

  const methods = useForm({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { supplyAsync } = useMutateSupplyLending(asset);

  const onSubmitAsync = async (data: DepositModalFormData) => {
    await supplyAsync(
      {
        amount: data.amount,
      },
      {
        onSuccess: (txHash) => {
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You Supplied {data.amount} {tokenData.symbol}
                </Typography>
                {tokenData && <WatchAssetComponentv2 {...tokenData} symbol={tokenData.symbol || ""} address={asset} />}
              </FlexCol>
            ),
          });
        },
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <Typography type="bold4">{asset ? "Supply" : "Select Asset"}</Typography>
        <Typography type="regular3">{tokenData.name}</Typography>
        <RHFAmountInputWrapper {...earnInputConfig} />

        <SupplySummary asset={asset} />
        <SupplyButtons />
      </FlexCol>
    </MyFormProvider>
  );
};

