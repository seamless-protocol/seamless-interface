import { useForm } from "react-hook-form";
import { FormButtons } from "./FormButtonsCooldown";
import { useNotificationContext, FlexCol, Typography, WatchAssetComponentv2, MyFormProvider } from "@shared";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFetchTokenData} from "../../../../../statev3/safetyModule/hooks/useFetchTokenData";

import { useInitiateCooldown } from "../../../../../statev3/safetyModule/mutations/useInitiateCooldown";
import { StakedSeam as TokenData } from "../../../../../statev3/safetyModule/types/StakedSeam";

export const CooldownForm = () => {
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

  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      receiveAmount: "",
    },
  });
  const { handleSubmit, reset } = methods;

  const { showNotification } = useNotificationContext();

  const { startCooldownAsync, isResultPending } = useInitiateCooldown();

  
  const onSubmitAsync = async (data: FormData) => {
    await startCooldownAsync(
      {
        onSuccess: (txHash) => {
          showNotification({
            txHash,
            content: (
              <FlexCol className="w-full items-center text-center justify-center">
                <Typography>
                  You can unstake your stkSEAM in 7 days
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
            <Typography type="medium3">Initiate Cooldown</Typography>
            <Typography type="medium1">You must wait 7 days to unstake your SEAM</Typography>
          </FlexCol>
        </FlexCol>

        <FormButtons
          vaultData={tokenData}
          isDisabled={isResultPending}
          isLoading={isResultPending}
        />
      </FlexCol>
    </MyFormProvider>
  );
};
