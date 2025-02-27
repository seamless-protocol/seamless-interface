import { FlexCol, Typography, ViewBigInt, useNotificationContext, ModalHandles } from "@shared";
import React, { useRef } from "react";
import { useMutateClaimAllRewards } from "../../../../../../../state/loop-strategy/mutations/useMutateClaimAllRewards";
import { ClaimModalComponent } from "./ClaimModalComponent";

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
    <ClaimModalComponent
      modalRef={modalRef}
      headerText="Claim rewards"
      buttonText="Claim"
      rewards={rewards}
      totalRewards={totalRewards}
      disabled={disabled}
      onSubmit={onSubmitAsync}
      isLoading={isPending}
    />
  );
};
