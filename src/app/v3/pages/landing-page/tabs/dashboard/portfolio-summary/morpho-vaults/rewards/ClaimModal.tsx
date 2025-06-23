import { ViewBigInt, ModalHandles, Token, FlexCol, Typography, useNotificationContext } from "@shared";
import React, { useRef } from "react";
import { ClaimModalComponent } from "../../../../../../common/components/ClaimModalComponent";
import { useMutateClaimAllMorphoRewards } from "../../../../../../../../data/morpho/user-distributions/useMutateClaimAllMorphoRewards";

interface Reward {
  claimableNow?: ViewBigInt;
  claimableNowUsd?: ViewBigInt;
  token: Token;
}

interface ClaimModalProps {
  rewards: Reward[] | undefined;
  totalUsdValue: ViewBigInt | undefined;
  disabled?: boolean;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ totalUsdValue, rewards, disabled }) => {
  const modalRef = useRef<ModalHandles | null>(null);
  const { showNotification } = useNotificationContext();

  const { claimAllAsync, isClaiming } = useMutateClaimAllMorphoRewards({
    onSuccess: (txHash) => {
      showNotification({
        txHash,
        content: (
          <FlexCol className="w-full items-center text-center justify-center">
            <Typography type="regular3">Rewards Claimed Successfully!</Typography>
            <Typography type="bold">
              Your rewards may remain visible for a few minutes while the reward data is being updated.
            </Typography>
          </FlexCol>
        ),
      });
    },
  });

  const onSubmitAsync = async () => {
    await claimAllAsync();
  };

  return (
    <ClaimModalComponent
      modalRef={modalRef}
      headerText="Claim rewards"
      buttonText="Claim"
      rewards={rewards?.map((reward) => ({
        tokenAmount: reward.claimableNow,
        dollarAmount: reward.claimableNowUsd,
        logo: reward.token.logo,
      }))}
      totalRewards={totalUsdValue}
      disabled={disabled || isClaiming}
      onSubmit={onSubmitAsync}
      isLoading={isClaiming}
    />
  );
};
