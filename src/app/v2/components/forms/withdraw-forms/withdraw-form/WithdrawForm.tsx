import { useForm } from "react-hook-form";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { WETH_ADDRESS } from "@meta";
import {
  useNotificationContext,
  FlexCol,
  FlexRow,
  MyFormProvider,
  Typography,
  WatchAssetComponentv2,
} from "../../../../../../shared";
import { RouterConfig } from "../../../../../router";
import { FormButtons } from "./FormButtons";
import { Tag } from "../../../asset-data/Tag";
import { Summary } from "./Summary";
import { useMutateWithdrawLending } from "../../../../../state/lending-borrowing/mutations/useMutateWithdrawLending";
import { RHFWithdrawAmountField } from "./RHFWithdrawAmountField";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFullTokenData } from "../../../../../state/common/meta-data-queries/useFullTokenData";

interface WithdrawModalFormData {
  amount: string;
}

export const WithdrawForm = () => {
  const { asset, onTransaction, hideTag, disableAssetPicker, overrideUrlSlug } = useFormSettingsContext();
  const {
    data: { symbol, decimals, name, logo },
  } = useFullTokenData(asset);

  const { showNotification } = useNotificationContext();

  const { withdrawAsync } = useMutateWithdrawLending(asset);

  // FORM //
  const methods = useForm<WithdrawModalFormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount", "");

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
                  <WatchAssetComponentv2 address={asset} decimals={decimals} logo={logo} />
                )}
                {asset === WETH_ADDRESS && (
                  <FlexRow className="w-full">
                    <Link
                      to={RouterConfig.Routes.unwrapEth}
                      className="flex flex-row items-center justify-end gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography type="bold2" className="text-right">
                        To unwrap to ETH, click here
                      </Typography>
                      <ArrowTopRightOnSquareIcon width={12} />
                    </Link>
                  </FlexRow>
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
            <FlexCol className="gap-1 min-h-10">
              <Typography type="bold4">{asset ? "Withdraw" : "Select strategy to get started"}</Typography>
              <Typography type="regular3">{name}</Typography>
            </FlexCol>

            {asset != null && !hideTag && <Tag tag="ILM" />}
          </FlexRow>
          <RHFWithdrawAmountField
            overrideUrlSlug={disableAssetPicker ? undefined : overrideUrlSlug}
            assetAddress={disableAssetPicker ? asset : undefined}
            name="amount"
          />
        </FlexCol>

        {asset && <Summary asset={asset} amount={amount} />}

        <FormButtons />
      </FlexCol>
    </MyFormProvider>
  );
};
