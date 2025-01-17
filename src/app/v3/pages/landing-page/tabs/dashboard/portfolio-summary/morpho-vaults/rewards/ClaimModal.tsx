import {
  ViewBigInt,
  ModalHandles,
  Token,
} from "@shared";
import React, { useRef } from "react";
import { ClaimModalComponent } from "../../../components/common/ClaimModalComponent";

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
  const isPending = false;

  const onSubmitAsync = async () => {
    // eslint-disable-next-line no-console
    console.log("Todo in next pr")
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
      disabled={disabled}
      onSubmit={onSubmitAsync}
      isPending={isPending}
    />
  );
};
