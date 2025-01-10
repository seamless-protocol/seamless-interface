import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { parseUnits } from "viem";
import { useFetchFormattedAssetPrice } from "../../../../../statev3/queries/AssetPrice.hook";
import { useWrappedDebounce } from "../../../../../statev3/common/hooks/useWrappedDebounce";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchFormattedFullVaultInfo } from "../../../../../statev3/morpho/full-vault-info/FullVaultInfo.hook";
import { MappedVaultData } from "../../../../../statev3/morpho/types/MappedFullVaultData";
import { useMutateDepositMorphoVault } from "../../../../../statev3/morpho/mutations/useMutateDepositMorphoVault";
import { useEffect } from "react";
import { useFetchDepositSharesToReceive } from "../../../../../statev3/morpho/hooks/useFetchDepositSharesToReceive";

export const MoprhoDepositForm = () => {
  const { strategy } = useFormSettingsContext();
  const { data: vaultData } = useFetchFormattedFullVaultInfo(strategy);

  if (!vaultData) {
    // eslint-disable-next-line no-console
    console.warn("Vault not found!!!");
    return <div className="min-h-[1000px]" />;
  }

  return <MoprhoDepositFormLocal vaultData={vaultData} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const MoprhoDepositFormLocal: React.FC<{
  vaultData: MappedVaultData;
}> = ({ vaultData }) => {
  const { onTransaction } = useFormSettingsContext();
  const { decimals: underlyingAssetDecimals, symbol: underlyingAssetSymbol } = vaultData.asset;

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const amount = watch("amount", "");

  const { showNotification } = useNotificationContext();

  const { depositAsync } = useMutateDepositMorphoVault(vaultData);

  const { data: assetPrice } = useFetchFormattedAssetPrice(vaultData.asset.address);

  const { debouncedAmount } = useWrappedDebounce(amount, assetPrice?.bigIntValue, 500);
  const previewDepositData = useFetchDepositSharesToReceive(debouncedAmount, vaultData?.vaultAddress);
  console.log({ previewDepositData });

  useEffect(() => {
    if (previewDepositData.isError) {
      showNotification({
        status: "error",
        content: (
          <Typography type="body1">
            {(previewDepositData.error as any)?.message} <br /> please try later! 😓
          </Typography>
        ),
      });
    }
  }, [previewDepositData.isError]);

  const onSubmitAsync = async (data: FormData) => {
    // if (previewDepositData.isFetched && previewDepositData.isSuccess && !previewDepositData.isLoading) {
    await depositAsync(
      {
        amount: underlyingAssetDecimals ? parseUnits(data.amount, underlyingAssetDecimals) : undefined,
        sharesToReceive: 1n,
      },
      {
        onSuccess: (txHash) => {
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You Supplied {data.amount} {underlyingAssetSymbol}
                </Typography>
                {vaultData && <WatchAssetComponentv2 {...vaultData} address={vaultData?.vaultAddress} />}
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
          <FlexCol className="gap-3">
            <Typography type="medium3">Deposit</Typography>
            <RHFDepositAmountField name="amount" />
          </FlexCol>

          <FlexCol className="gap-3">
            <Typography type="medium3">Receive</Typography>
            {/* <RHFReceiveAmountField debouncedAmount={debouncedAmount} name="receiveAmount" /> */}
          </FlexCol>

          {/* <Summary debouncedAmount={debouncedAmount} /> */}
        </FlexCol>

        <FormButtons
          // isDisabled={!previewDepositData.isSuccess}
          // isLoading={previewDepositData.isLoading || isUnderlyingAssetDecimalsLoading}
          vaultData={vaultData}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
