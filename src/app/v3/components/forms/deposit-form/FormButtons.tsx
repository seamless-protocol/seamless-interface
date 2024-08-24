import {
  FlexCol,
  AuthGuardv2,
  Buttonv2,
  useERC20Approve,
  getApproveState,
  useNotificationContext,
  useToken,
} from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { StrategyState } from "../../../../../state/common/types/StateTypes";

export const FormButtons: React.FC<{
  strategy: StrategyState;
  onTransaction?: () => void;
  isLoading?: boolean;
}> = ({ strategy, onTransaction, isLoading }) => {
  const { showNotification } = useNotificationContext();
  const {
    data: { decimals },
  } = useToken(strategy.underlyingAsset.address);

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    strategy.underlyingAsset.address,
    strategy.address,
    decimals ? parseUnits(amount || "0", decimals) : undefined
  );

  if (!amount) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        Enter amount
      </Buttonv2>
    );
  }

  return (
    <FlexCol className="gap-2 w-full">
      <AuthGuardv2 message="">
        <Buttonv2
          className="text-bold3"
          disabled={isApproved}
          loading={isApproving || isLoading}
          onClick={async () => {
            try {
              await approveAsync();
            } catch (e: any) {
              showNotification({
                status: "error",
                content: e?.message,
              });
            } finally {
              onTransaction?.();
            }
          }}
        >
          {getApproveState(isApproved, justApproved)}
        </Buttonv2>
      </AuthGuardv2>
      <Buttonv2
        className="text-bold3"
        type="submit"
        disabled={!isApproved || isSubmitting}
        loading={isSubmitting || isLoading}
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
