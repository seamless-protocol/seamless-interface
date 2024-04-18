import { useForm } from "react-hook-form";
import { useFullTokenData, MyFormProvider, FlexCol, Typography, WatchAssetComponentv2, useNotificationContext, FlexRow } from "../../../../../../shared";
import { FormButtons } from "./FormButtons";
import { Summary } from "./Summary";
import { useMutateSupplyLending } from "../../../../../state/lending-borrowing/mutations/useMutateSupplyLending";
import { DepositModalFormData } from "../../../../../v1/pages/ilm-details-page/components/your-info/deposit/DepositModal";
import { Tag } from "../../../../pages/test-page/tabs/earn-tab/Tag";
import { useEarnFormContext } from "../contexts/useEarnFormContext";
import { RHFSupplyAmountField } from "./RHFSupplyAmountField";

export const SupplyForm = () => {
  const { asset, onTransaction, hideTag, overrideUrlSlug, disableAssetPicker } = useEarnFormContext();

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
          onTransaction?.();
          reset();
        },
      }
    );
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexRow className="justify-between items-start">
            <FlexCol className="gap-1 min-h-14">
              <Typography type="bold4">{asset ? "Supply" : "Select Asset"}</Typography>
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>

            {(asset != null && !hideTag) && <Tag tag="LEND" />}
          </FlexRow>
          <RHFSupplyAmountField
            overrideUrlSlug={disableAssetPicker ? undefined : overrideUrlSlug}
            assetAddress={disableAssetPicker ? asset : undefined}
            name="amount" />
        </FlexCol>

        <Summary />
        <FormButtons />
      </FlexCol>
    </MyFormProvider>
  );
};