import {
  FlexCol,
  FlexRow,
  Modal,
  Typography,
  Buttonv2,
  DisplayMoney,
  ViewBigInt,
  ModalHandles,
  Token,
} from "@shared";
import React, { useRef } from "react";
import TokenRow from "./TokenRow";

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

  const onSubmitAsync = async () => {
    // eslint-disable-next-line no-console
    console.log("Todo in next pr")
  };

  return (
    <div>
      <Modal
        ref={modalRef}
        header="Claim rewards"
        size="small"
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
              <FlexCol className="gap-5 shadow-card rounded-card bg-neutral-100 p-4 pt-6">
                {rewards?.map((reward, index) => (
                  <TokenRow
                    key={index}
                    logo={reward.token.logo}
                    tokenAmount={reward.claimableNowUsd}
                    dollarAmount={reward.claimableNow}
                  />
                ))}
                <FlexRow className="justify-between items-center mt-4">
                  <Typography type="bold1">Total worth</Typography>
                  <DisplayMoney typography="bold2" {...totalUsdValue} symbolPosition="before" />
                </FlexRow>
              </FlexCol>
            </FlexCol>

            <Buttonv2 className="text-bold2" onClick={onSubmitAsync} loading={false}>
              Claim all rewards
            </Buttonv2>
          </FlexCol>
        </FlexCol>
      </Modal>
    </div>
  );
};
