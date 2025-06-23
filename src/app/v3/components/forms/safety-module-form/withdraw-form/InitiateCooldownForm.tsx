import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtonsCooldown";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider, FlexRow } from "@shared";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchStakedSeamTokenData } from "../../../../../data/safetyModule/hooks/useFetchStakedSeamTokenData";

import { useInitiateCooldown } from "../../../../../data/safetyModule/mutations/useInitiateCooldown";
import { StakedSeam as TokenData } from "../../../../../data/safetyModule/types/StakedSeam";
import { RHFUnstakeAmountField } from "./RHFUnstakeAmountField";
import { StakeInfoTooltip } from "../components/StakeInfoTooltip";

export const InitiateCooldownForm = () => {
  const { data: tokenInfo, isLoading, error } = useFetchStakedSeamTokenData();

  if (isLoading) {
    return <div className="min-h-[300px]" />;
  }

  if (!tokenInfo || error) {
    // eslint-disable-next-line no-console
    console.warn("Staking data not found!!!");
    if (error) console.error("StakingWithdrawForm error while fetching full vault info", error);

    return (
      <div className="min-h-[300px]">
        <Typography type="medium3" className="text-red-600">
          Error while fetching full staked SEAM token data: {error?.message}
        </Typography>
      </div>
    );
  }

  return <InitiateCooldownFormLocal tokenData={tokenInfo} />;
};

interface FormData {
  amount: string;
  receiveAmount: string;
}

const InitiateCooldownFormLocal: React.FC<{
  tokenData: TokenData;
}> = ({ tokenData }) => {
  const { onTransaction } = useFormSettingsContext();

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { startCooldownAsync, isResultPending } = useInitiateCooldown();

  const onSubmitAsync = async () => {
    await startCooldownAsync({
      onSuccess: (txHash) => {
        showNotification({
          txHash,
          content: (
            <FlexCol className="w-full items-center text-center justify-center">
              <Typography>You can unstake your stkSEAM in 7 days</Typography>
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
    });
  };

  return (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexCol className="gap-3">
            <FlexRow className="items-center gap-1">
              <Typography type="medium1">Initiate the 7 day cooldown to unstake your SEAM.</Typography>
              <StakeInfoTooltip />
            </FlexRow>
          </FlexCol>
        </FlexCol>

        <RHFUnstakeAmountField vault={tokenData.address} name="amount" disabled />

        <FormButtons vaultData={tokenData} isDisabled={isResultPending} isLoading={isResultPending} />
      </FlexCol>
    </MyFormProvider>
  );
};
