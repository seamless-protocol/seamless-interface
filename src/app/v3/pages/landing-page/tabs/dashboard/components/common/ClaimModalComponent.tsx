import React from "react";
import {
  FlexCol,
  FlexRow,
  Modal,
  Typography,
  Buttonv2,
  DisplayMoney,
  ViewBigInt,
  ModalHandles,
} from "@shared";
import TokenRow from "./TokenRow";

export interface ModalReward {
  logo?: string;
  tokenAmount?: ViewBigInt;
  dollarAmount?: ViewBigInt;
}

export interface ClaimModalUIProps {
  rewards?: ModalReward[];
  totalRewards?: ViewBigInt;
  disabled?: boolean;
  onSubmit: () => Promise<void> | void;
  isPending?: boolean;
  modalRef: React.RefObject<ModalHandles>;
  headerText: string;
  buttonText: string;
}

/**
 * A purely presentational modal that displays rewards and a button
 * to call `onSubmit`. It does NOT contain business logic.
 */
export const ClaimModalComponent: React.FC<ClaimModalUIProps> = ({
  rewards,
  totalRewards,
  disabled,
  onSubmit,
  isPending,
  modalRef,
  headerText,
  buttonText,
}) => {
  return (
    <div>
      <Modal
        ref={modalRef}
        header={headerText}
        size="small"
        buttonProps={{
          children: buttonText,
          className: `text-bold3 rounded-button text-neutral-0 py-3 px-4 ${disabled ? "bg-primary-300" : "bg-metalic"
            }`,
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
                    logo={reward.logo}
                    tokenAmount={reward.tokenAmount}
                    dollarAmount={reward.dollarAmount}
                  />
                ))}

                <FlexRow className="justify-between items-center mt-4">
                  <Typography type="bold1">Total worth</Typography>
                  <DisplayMoney
                    typography="bold2"
                    {...totalRewards}
                    symbolPosition="before"
                  />
                </FlexRow>
              </FlexCol>
            </FlexCol>

            <Buttonv2 className="text-bold2" onClick={onSubmit} loading={isPending}>
              Claim all rewards
            </Buttonv2>
          </FlexCol>
        </FlexCol>
      </Modal>
    </div>
  );
};
