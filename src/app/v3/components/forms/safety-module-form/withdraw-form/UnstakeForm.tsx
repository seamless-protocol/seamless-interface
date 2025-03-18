import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchStakedSeamTokenData } from "../../../../../statev3/safetyModule/hooks/useFetchStakedSeamTokenData";
import { RHFWithdrawVaultAmountField } from "./RHFWithdrawVaultAmountField";
import { useUnstakeSafetyModule } from "../../../../../statev3/safetyModule/mutations/useUnstakeSafetyModule";
import { StakedSeam as TokenData } from "../../../../../statev3/safetyModule/types/StakedSeam";
import { intervalToDuration } from "date-fns";

export interface Dhms {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const secondsToDhms = (totalSeconds: number): Dhms | undefined => {
  const duration = intervalToDuration({
    start: new Date(0),
    end: new Date(totalSeconds * 1000),
  });

  const { days, hours, minutes, seconds } = duration;
  if (!duration || days == null || hours == null || minutes == null || seconds == null) return undefined;

  return {
    days: days.toString(),
    hours: hours < 10 ? `0${hours}` : hours.toString(),
    minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
    seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
  };
};

export const UnstakeForm = ({ remaining, isUnstakeWindow }: { remaining: number; isUnstakeWindow: boolean }) => {
  const { data: tokenInfo, isLoading, error } = useFetchStakedSeamTokenData();

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!tokenInfo || error) {
    // eslint-disable-next-line no-console
    console.warn("Stake SEAM data not found!!!");
    if (error) console.error("UnstakeForm error while fetching full vault info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full staked seam token data: {error?.message}
        </Typography>
      </div>
    );
  }

  return <UnstakeFormLocal tokenData={tokenInfo} remaining={remaining} isUnstakeWindow={isUnstakeWindow} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const UnstakeFormLocal: React.FC<{
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

  const { days, hours, minutes, seconds } = secondsToDhms(remaining) || {};

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
              <RHFWithdrawVaultAmountField vault={tokenData.address} name="amount" />
            </FlexCol>
          )}
        </FlexCol>

        <FormButtons isDisabled={isWithdrawPending} isLoading={isWithdrawPending} isUnstakeWindow={isUnstakeWindow} />
      </FlexCol>
    </MyFormProvider>
  );
};
