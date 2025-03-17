import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchStakedSeamTokenData } from "../../../../../statev3/safetyModule/hooks/useFetchStakedSeamTokenData";
import { RHFWithdrawVaultAmountField } from "./RHFWithdrawVaultAmountField";
import { useUnstakeSafetyModule } from "../../../../../statev3/safetyModule/mutations/useUnstakeSafetyModule";
import { StakedSeam as TokenData } from "../../../../../statev3/safetyModule/types/StakedSeam";

const secondsToDhms = (totalSeconds: number) => {
  const days: number | string = Math.floor(totalSeconds / 86400);
  let hours: number | string = Math.floor(totalSeconds / 3600) % 24;
  let minutes: number | string = Math.floor(totalSeconds / 60) % 60;
  let seconds: number | string = totalSeconds % 60;

  if (hours.toString().length === 1) {
    hours = `0${hours}`;
  }
  if (minutes.toString().length === 1) {
    minutes = `0${minutes}`;
  }
  if (seconds.toString().length === 1) {
    seconds = `0${seconds}`;
  }

  return { days, hours, minutes, seconds };
};

export const UnstakeForm = ({ remaining, isUnstakeWindow }: { remaining: number; isUnstakeWindow: boolean }) => {
  const { data: tokenInfo, isLoading, error } = useFetchStakedSeamTokenData();

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!tokenInfo || error) {
    // eslint-disable-next-line no-console
    console.warn("Vault not found!!!");
    if (error) console.error("MorphoDepositForm error while fetching full vault info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full staked SEAM token data: {error?.message}
        </Typography>
      </div>
    );
  }

  return <MoprhoVaultFormLocal tokenData={tokenInfo} remaining={remaining} isUnstakeWindow={isUnstakeWindow} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const MoprhoVaultFormLocal: React.FC<{
  tokenData: TokenData;
  remaining: number;
  isUnstakeWindow: boolean;
}> = ({ tokenData, remaining, isUnstakeWindow }) => {
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
  const { unstakeAsync, isWithdrawPending } = useUnstakeSafetyModule();

  const { days, hours, minutes, seconds } = secondsToDhms(remaining);

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
          {!isUnstakeWindow ? (
            <FlexCol className="gap-3">
              <Typography type="medium3">Unstake Ready in:</Typography>
              <Typography type="medium2" className="text-red-400">
                {days} : {hours} : {minutes} : {seconds}
              </Typography>
            </FlexCol>
          ) : (
            <FlexCol className="gap-3">
              <Typography type="medium3">Unstake Available For:</Typography>
              <Typography type="medium2" className="text-green-400">
                {days} : {hours} : {minutes} : {seconds}
              </Typography>
              <RHFWithdrawVaultAmountField address={tokenData.address} name="amount" />
            </FlexCol>
          )}
        </FlexCol>

        <FormButtons isDisabled={isWithdrawPending} isLoading={isWithdrawPending} isUnstakeWindow={isUnstakeWindow} />
      </FlexCol>
    </MyFormProvider>
  );
};
