import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchFormattedFullVaultInfo } from "../../../../../data/morpho/full-vault-info/FullVaultInfo.hook";
import { MappedVaultData } from "../../../../../data/morpho/types/MappedFullVaultData";
import { RHFWithdrawVaultAmountField } from "./RHFWithdrawVaultAmountField";
import { useMutateWithdrawMorphoVault } from "../../../../../data/morpho/mutations/useMutateWithdrawMorphoVault";

export const MorphoWithdrawForm = () => {
  const { strategy: vault } = useFormSettingsContext();
  const { data: vaultData, isLoading, error } = useFetchFormattedFullVaultInfo(vault);

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!vaultData || error) {
    // eslint-disable-next-line no-console
    console.warn("Vault not found!!!");
    if (error) console.error("MorphoWithdrawForm error while fetching full vault info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full vault info: {error?.message}
        </Typography>
      </div>
    );
  }

  return <MoprhoVaultFormLocal vaultData={vaultData} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const MoprhoVaultFormLocal: React.FC<{
  vaultData: MappedVaultData;
}> = ({ vaultData }) => {
  const { onTransaction } = useFormSettingsContext();
  const { decimals: lpTokenDecimals, symbol: lpTokenSymbol } = vaultData.vaultTokenData;

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { withdrawAsync, isWithdrawPending } = useMutateWithdrawMorphoVault(vaultData.vaultAddress);

  const onSubmitAsync = async (data: FormData) => {
    await withdrawAsync(
      {
        amount: lpTokenDecimals ? parseUnits(data.amount, lpTokenDecimals) : undefined,
      },
      {
        onSuccess: (txHash) => {
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You Withdrew {data.amount} {lpTokenSymbol}
                </Typography>
                {vaultData && (
                  <WatchAssetComponentv2
                    {...vaultData}
                    address={vaultData?.asset.address}
                    icon={vaultData?.asset.logoURI || undefined}
                    decimals={vaultData?.asset.decimals || undefined}
                  />
                )}
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
            <Typography type="medium3">Withdraw</Typography>
            <RHFWithdrawVaultAmountField vault={vaultData.vaultAddress} name="amount" />
          </FlexCol>
        </FlexCol>

        <FormButtons
          vaultData={vaultData}
          isDisabled={isWithdrawPending}
          isLoading={isWithdrawPending}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
