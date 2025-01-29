import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchFormattedFullVaultInfo } from "../../../../../statev3/morpho/full-vault-info/FullVaultInfo.hook";
import { MappedVaultData } from "../../../../../statev3/morpho/types/MappedFullVaultData";
import { useMutateDepositMorphoVault } from "../../../../../statev3/morpho/mutations/useMutateDepositMorphoVault";

export const MorphoDepositForm = () => {
  const { strategy: vault } = useFormSettingsContext();
  const { data: vaultData, isLoading, error } = useFetchFormattedFullVaultInfo(vault);

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!vaultData || error) {
    // eslint-disable-next-line no-console
    console.warn("Vault not found!!!");
    if (error) console.error('MorphoDepositForm error while fetching full vault info', error);

    return <div className="min-h-[300px]" />;
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
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { depositAsync, isPending } = useMutateDepositMorphoVault(vaultData.vaultAddress);

  const onSubmitAsync = async (data: FormData) => {
    await depositAsync(
      {
        amount: underlyingAssetDecimals ? parseUnits(data.amount, underlyingAssetDecimals) : undefined,
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
        </FlexCol>

        <FormButtons vaultData={vaultData} isLoading={isPending} />
      </FlexCol>
    </MyFormProvider>
  );
};
