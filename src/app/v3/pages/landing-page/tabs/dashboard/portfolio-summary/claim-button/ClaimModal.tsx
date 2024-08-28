import {
  FlexCol,
  FlexRow,
  Modal,
  Typography,
  Buttonv2,
  DisplayMoney,
  ViewBigInt,
  useNotificationContext,
  MyFormProvider,
  ModalHandles,
} from "@shared";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import { useMutateClaimAllRewards } from "../../../../../../../state/loop-strategy/mutations/useMutateClaimAllRewards";
import { FormSettingsProvider } from "../../../../../../../v2/components/forms/contexts/FormSettingsContext";
import TokenRow from "./TokenRow";

interface Reward {
  tokenAmount: ViewBigInt;
  dollarAmount: ViewBigInt;
  logo: string;
}

interface ClaimModalProps {
  rewards: Reward[] | undefined;
  totalRewards: ViewBigInt | undefined;
  disabled?: boolean;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ totalRewards, rewards, disabled }) => {
  const modalRef = useRef<ModalHandles | null>(null);
  const { claimAllAsync, isPending } = useMutateClaimAllRewards();

  const { showNotification } = useNotificationContext();

  const methods = useForm({});

  const { handleSubmit } = methods;

  const onSubmitAsync = async () => {
    await claimAllAsync({
      onSuccess: (txHash) => {
        showNotification({
          status: "success",
          txHash,
          content: (
            <FlexCol className="w-full items-center text-center justify-center">
              <Typography>You Successfully Claimed Rewards</Typography>
            </FlexCol>
          ),
        });
      },
      onSettled: () => {
        modalRef.current?.close();
      },
    });
  };

  return (
    <FormSettingsProvider>
      <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
        <Modal
          ref={modalRef}
          header="Claim rewards"
          size="small"
          // TODO: Remove this when generic button component is ready
          buttonProps={{
            children: "Claim",
            className: `text-bold3 rounded-button text-neutral-0 py-3 px-4 ${disabled ? "bg-primary-300" : "bg-metalic"}`,
            disabled,
          }}
        >
          <FlexCol className="gap-8">
            <FlexCol className="gap-6">
              <FlexCol className="gap-1">
                <Typography type="bold2">Transaction overview</Typography>
                <FlexCol className="gap-5 shadow-card rounded-card bg-background-selected p-4 pt-6">
                  {rewards?.map((token, index) => (
                    <TokenRow
                      key={index}
                      logo={token.logo}
                      tokenAmount={token.tokenAmount}
                      dollarAmount={token.dollarAmount}
                    />
                  ))}
                  <FlexRow className="justify-between items-center mt-4">
                    <Typography type="bold1">Total worth</Typography>
                    <DisplayMoney typography="bold2" {...totalRewards} symbolPosition="before" />
                  </FlexRow>
                </FlexCol>
              </FlexCol>

              <Buttonv2 className="text-bold2" type="submit" loading={isPending}>
                Claim all rewards
              </Buttonv2>
            </FlexCol>
          </FlexCol>
        </Modal>
      </MyFormProvider>
    </FormSettingsProvider>
  );
};
