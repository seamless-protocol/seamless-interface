import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider, FlexRow } from "@shared";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchStakedSeamTokenData } from "../../../../../data/safetyModule/hooks/useFetchStakedSeamTokenData";
import { RHFUnstakeAmountField } from "./RHFUnstakeAmountField";
import { useUnstakeSafetyModule } from "../../../../../data/safetyModule/mutations/useUnstakeSafetyModule";
import { StakedSeam as TokenData } from "../../../../../data/safetyModule/types/StakedSeam";
import { intervalToDuration, formatDuration, format } from "date-fns";
import { StakeInfoTooltip } from "../components/StakeInfoTooltip";

export interface Dhms {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const secondsToDhms = (totalSeconds: number): string => {
  const duration = intervalToDuration({
    start: new Date(0),
    end: new Date(totalSeconds * 1000),
  });

  return formatDuration(duration, {
    format: ["days", "hours", "minutes", "seconds"],
    zero: true,
    delimiter: " : ",
  });
};

export const UnstakeForm = ({
  remaining,
  isUnstakeWindow,
  deadline,
}: {
  remaining: number;
  isUnstakeWindow: boolean;
  deadline: number | null;
}) => {
  const { data: tokenInfo, isLoading, error } = useFetchStakedSeamTokenData();

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!tokenInfo || error) {
    // eslint-disable-next-line no-console
    console.warn("Staked SEAM data not found!!!");
    if (error) console.error("UnstakeForm error while fetching full vault info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full staked seam token data: {error?.message}
        </Typography>
      </div>
    );
  }

  return (
    <UnstakeFormLocal
      tokenData={tokenInfo}
      remaining={remaining}
      isUnstakeWindow={isUnstakeWindow}
      deadline={deadline}
    />
  );
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

interface UnstakeFormLocalProps {
  tokenData: TokenData;
  remaining: number;
  isUnstakeWindow: boolean;
  deadline: number | null;
}

const UnstakeFormLocal: React.FC<UnstakeFormLocalProps> = ({ tokenData, remaining, isUnstakeWindow, deadline }) => {
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

  const formatedDhms = secondsToDhms(remaining);
  const formattedDeadline = deadline ? format(new Date(deadline * 1000), "PPpp") : "";

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
                  You Unstaked {data.amount} {tokenSymbol}
                </Typography>
                {tokenData && (
                  <WatchAssetComponentv2
                    {...tokenData}
                    address={tokenData?.underlying.address}
                    icon={tokenData?.underlying.logo || undefined}
                    decimals={tokenData?.underlying.decimals || undefined}
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
              <FlexRow className="gap-1">
                <Typography type="medium2">
                  Your unstake cooldown ends on at: <br />
                  <strong>{formattedDeadline}</strong>
                </Typography>
                <StakeInfoTooltip />
              </FlexRow>
              <Typography type="medium2">
                Unstake Ready in: <br />
                {formatedDhms}
              </Typography>
            </FlexCol>
          ) : (
            <FlexCol className="gap-3">
              <Typography type="medium3">You have until {formattedDeadline} to unstake:</Typography>
              <Typography type="medium2" className="text-green-400">
                {formatedDhms}
              </Typography>
            </FlexCol>
          )}
        </FlexCol>

        <RHFUnstakeAmountField vault={tokenData.address} name="amount" disabled={!isUnstakeWindow} />

        <FormButtons isDisabled={isWithdrawPending} isLoading={isWithdrawPending} isUnstakeWindow={isUnstakeWindow} />
      </FlexCol>
    </MyFormProvider>
  );
};
