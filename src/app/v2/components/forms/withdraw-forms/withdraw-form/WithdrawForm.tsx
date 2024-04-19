import { useForm } from "react-hook-form";
import {
  useNotificationContext,
  FlexCol,
  FlexRow,
  MyFormProvider,
  Typography,
  useFullTokenData,
  WatchAssetComponentv2,
} from "../../../../../../shared";
import { WithdrawModalFormData } from "../../../../../v1/pages/ilm-details-page/components/your-info/withdraw/WithdrawModal";
import { FormButtons } from "./FormButtons";
import { Tag } from "../../../../pages/test-page/tabs/earn-tab/Tag";
import { Summary } from "./Summary";
import { useMutateWithdrawLending } from "../../../../../state/lending-borrowing/mutations/useMutateWithdrawLending";
import { RHFWithdrawAmountField } from "./RHFWithdrawAmountField";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";

export const WithdrawForm = () => {
  const { asset, onTransaction, hideTag, disableAssetPicker, overrideUrlSlug } = useFormSettingsContext();
  const { data: tokenData } = useFullTokenData(asset);

  const {
    data: { symbol, decimals, logo },
  } = useFullTokenData(asset);

  const { showNotification } = useNotificationContext();

  const { withdrawAsync } = useMutateWithdrawLending(asset);

  // FORM //
  const methods = useForm<WithdrawModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const onSubmitAsync = async (data: { amount: string }) => {
    await withdrawAsync(
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
                  You Withdrew {data.amount} {symbol}
                </Typography>
                {asset && symbol && (
                  <WatchAssetComponentv2 address={asset} decimals={decimals} logo={logo} symbol={symbol} />
                )}
              </FlexCol>
            ),
          });
        },
        onSettled: () => {
          reset();
          onTransaction?.();
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
              <Typography type="bold4">{asset ? "Withdraw" : "Select Asset"}</Typography>
              <Typography type="regular3">{tokenData.name}</Typography>
            </FlexCol>

            {asset != null && !hideTag && <Tag tag="ILM" />}
          </FlexRow>
          <RHFWithdrawAmountField
            overrideUrlSlug={disableAssetPicker ? undefined : overrideUrlSlug}
            assetAddress={disableAssetPicker ? asset : undefined}
            name="amount"
          />
        </FlexCol>

        <Summary asset={asset} />

        <FormButtons />
      </FlexCol>
    </MyFormProvider>
  );
};
