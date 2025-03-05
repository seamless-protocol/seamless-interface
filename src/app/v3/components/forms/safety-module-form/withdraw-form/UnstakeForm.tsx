import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchTokenData} from "../../../../../statev3/safetyModule/hooks/useFetchTokenData";
import { RHFWithdrawVaultAmountField } from "./RHFWithdrawVaultAmountField";
import { useWithdrawSafetyModule } from "../../../../../statev3/safetyModule/mutations/useInitiateCooldown";
import { StakedSeam as TokenData } from "../../../../../statev3/safetyModule/types/StakedSeam";

export const UnstakeForm = () => {
  const TokenInfo: TokenData = useFetchTokenData()

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
  const { decimals: tokenDecimals, symbol: tokenSymbol } = tokenData;

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { unstakeAsync, isWithdrawPending } = useWithdrawSafetyModule();

  const onSubmitAsync = async (data: FormData) => {
    await unstakeAsync(
      {
        amount: tokenDecimals ? parseUnits(data.amount, tokenDecimals) : undefined,
      },
      {
        onSuccess: (txHash) => {
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You Withdrew {data.amount} {tokenSymbol}
                </Typography>
                {tokenData && (
                  <WatchAssetComponentv2
                    {...tokenData}
                    address={tokenData?.asset.address}
                    icon={tokenData?.asset.logo || undefined}
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
