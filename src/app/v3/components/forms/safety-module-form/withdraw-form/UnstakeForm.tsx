import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchFormattedFullVaultInfo } from "../../../../../statev3/morpho/full-vault-info/FullVaultInfo.hook";
import { MappedVaultData } from "../../../../../statev3/morpho/types/MappedFullVaultData";
import { RHFWithdrawVaultAmountField } from "./RHFWithdrawVaultAmountField";
import { useMutateWithdrawMorphoVault } from "../../../../../statev3/morpho/mutations/useMutateWithdrawMorphoVault";
import { StakedSeam as TokenData } from "../../../../../statev3/safetyModule/types/StakedSeam";

export const UnstakeForm = () => {
  const { strategy: tokenAddress } = useFormSettingsContext();
  // const { data: vaultData, isLoading, error } = useFetchFormattedFullVaultInfo(vault);

  // if (isLoading) {
  //   return <div className="min-h-[300px]" />;
  // }

  // if (!vaultData || error) {
  //   // eslint-disable-next-line no-console
  //   console.warn("Vault not found!!!");
  //   if (error) console.error("UnstakeForm error while fetching full vault info", error);

  //   return (
  //     <div className="min-h-[300px]">
  //       <Typography type="medium3" className="text-red-600">
  //         Error while fetching full vault info: {error?.message}
  //       </Typography>
  //     </div>
  //   );
  // }

  // TODO: Move this to be fetched instead
  // TODO: Ensure fetches correct items.
    const TokenInfo: TokenData = {
      address: tokenAddress,
      decimals: 18,
      symbol: "stkSEAM",
      name: "Staked SEAM",
      logoURI: "",
      asset: {
        name: "SEAM",
        symbol: "SEAM",
        address: tokenAddress,
        decimals: 18
      } // set to SEAM address
    }

  return <MoprhoVaultFormLocal tokenData={TokenInfo} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const MoprhoVaultFormLocal: React.FC<{
  tokenData: TokenData;
}> = ({ tokenData }) => {
  const { onTransaction } = useFormSettingsContext();
  const { decimals: lpTokenDecimals, symbol: lpTokenSymbol } = tokenData;

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { withdrawAsync, isWithdrawPending } = useMutateWithdrawMorphoVault(tokenData.address);

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
                {tokenData && (
                  <WatchAssetComponentv2
                    {...tokenData}
                    address={tokenData?.asset.address}
                    icon={tokenData?.asset.logoURI || undefined}
                    decimals={tokenData?.asset.decimals || undefined}
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
            <RHFWithdrawVaultAmountField vault={tokenData.address} name="amount" />
          </FlexCol>
        </FlexCol>

        <FormButtons
          vaultData={tokenData}
          isDisabled={isWithdrawPending}
          isLoading={isWithdrawPending}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
