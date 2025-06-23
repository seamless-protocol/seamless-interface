import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtons";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider, FlexRow } from "@shared";
import { RHFStakingAmountField } from "./RHFStakingAmountField";
import { parseUnits } from "viem";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { StakedSeam as TokenData } from "../../../../../data/safetyModule/types/StakedSeam";
import { useStakeSafetyModule } from "../../../../../data/safetyModule/mutations/useStakeSafetyModule";
import { useFetchStakedSeamTokenData } from "../../../../../data/safetyModule/hooks/useFetchStakedSeamTokenData";
import { StakeInfoTooltip } from "../components/StakeInfoTooltip";

export const StakingForm = () => {
  const { data: tokenInfo, isLoading, error } = useFetchStakedSeamTokenData();

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!tokenInfo || error) {
    // eslint-disable-next-line no-console
    console.warn("Staking data not found!!!");
    if (error) console.error("StakingDepositForm error while fetching full vault info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full staked SEAM token data: {error?.message}
        </Typography>
      </div>
    );
  }

  return <StakeDepositFormLocal tokenData={tokenInfo} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const StakeDepositFormLocal: React.FC<{
  tokenData: TokenData;
}> = ({ tokenData }) => {
  const { onTransaction } = useFormSettingsContext();
  const { decimals: underlyingAssetDecimals } = tokenData;

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { stakeAsync, isPending } = useStakeSafetyModule();

  const onSubmitAsync = async (data: FormData) => {
    await stakeAsync(
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
                  You Staked {data.amount} {tokenData.underlying.symbol}
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
    <div className=" max-w-full">
      <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
        <FlexCol className="gap-8">
          <FlexRow>
            <Typography type="medium1">
              Please note that SEAM can only be unstaked after you initiate and wait a 7 day cooldown.
            </Typography>

            <StakeInfoTooltip />
          </FlexRow>
          <FlexCol className="gap-6">
            <FlexCol className="gap-3">
              <Typography type="medium3">Stake</Typography>
              <RHFStakingAmountField name="amount" />
            </FlexCol>
          </FlexCol>

          <FormButtons isLoading={isPending} />
        </FlexCol>
      </MyFormProvider>
    </div>
  );
};
