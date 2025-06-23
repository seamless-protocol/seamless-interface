import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchFormattedFullVaultInfo } from "../../../../../data/morpho/full-vault-info/FullVaultInfo.hook";
import { MappedVaultData } from "../../../../../data/morpho/types/MappedFullVaultData";
import { useMutateDepositMorphoVault } from "../../../../../data/morpho/mutations/useMutateDepositMorphoVault";
import { DEPOSIT_NATIVE_ETH } from "./useDepositingNativeETH";

export const MorphoDepositForm = () => {
  const { strategy: vault } = useFormSettingsContext();
  const { data: vaultData, isLoading, error } = useFetchFormattedFullVaultInfo(vault);

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!vaultData || error) {
    // eslint-disable-next-line no-console
    console.warn("Vault not found!!!");
    if (error) console.error("MorphoDepositForm error while fetching full vault info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full vault info: {error?.message}
        </Typography>
      </div>
    );
  }

  return <MoprhoDepositFormLocal vaultData={vaultData} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
  depositNativeETH: boolean;
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
      [DEPOSIT_NATIVE_ETH]: false,
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { depositAsync, isPending } = useMutateDepositMorphoVault(vaultData.vaultAddress);

  const onSubmitAsync = async (data: FormData) => {
    await depositAsync(
      {
        amount: underlyingAssetDecimals ? parseUnits(data.amount, underlyingAssetDecimals) : undefined,
        depositNativeETH: data.depositNativeETH,
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

        <FormButtons vaultData={vaultData} isLoading={isPending} isDisabled={isPending} />
      </FlexCol>
    </MyFormProvider>
  );
};
