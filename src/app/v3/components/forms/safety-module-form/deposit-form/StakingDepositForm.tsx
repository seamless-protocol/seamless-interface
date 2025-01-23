import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { RHFDepositAmountField } from "./RHFDepositAmountField";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { StakedSeam as TokenData } from "../../../../../statev3/safetyModule/types/StakedSeam";
import { useMutateDepositMorphoVault } from "../../../../../statev3/morpho/mutations/useMutateDepositMorphoVault";


export const StakingDepositForm = () => {
  const { strategy: tokenAddress } = useFormSettingsContext();
  // const { data: vaultData } = useFetchFormattedFullVaultInfo(vault);

  // if (!vaultData) {
  //   // eslint-disable-next-line no-console
  //   console.warn("Vault not found!!!");
  //   return <div className="min-h-[1000px]" />;
  // }
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

  return <StakeDepositFormLocal tokenData={TokenInfo} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const StakeDepositFormLocal: React.FC<{
  tokenData: TokenData;
}> = ({ tokenData }) => {
  const { onTransaction } = useFormSettingsContext();
  const { decimals: underlyingAssetDecimals, symbol: underlyingAssetSymbol } = tokenData;

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { depositAsync, isPending } = useMutateDepositMorphoVault(tokenData.address); // change this function

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
                {tokenData && <WatchAssetComponentv2 {...tokenData} address={tokenData?.address} />}
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

        <FormButtons tokenData={tokenData} isLoading={isPending} />
      </FlexCol>
    </MyFormProvider>
  );
};
