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
import { FullStrategyData } from "../../../../data/ilmv1-deprecated/metadata/FullStrategyData.all";

export const FormButtons: React.FC<{
  strategy: FullStrategyData;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ strategy, isLoading, isDisabled }) => {
  const { showNotification } = useNotificationContext();
  const { data: { decimals } = {} } = useToken(strategy.underlying);

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    strategy.underlying,
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
          data-cy="approvalButton"
          className="text-bold3"
          disabled={isApproved || isSubmitting}
          loading={!isApproved && (isApproving || isLoading)}
          onClick={async () => {
            try {
              await approveAsync();
            } catch (e: any) {
              showNotification({
                status: "error",
                content: e?.message,
              });
            }
          }}
        >
          {getApproveState(isApproved, justApproved)}
        </Buttonv2>
      </AuthGuardv2>
      <Buttonv2
        data-cy="actionButton"
        className="text-bold3"
        type="submit"
        disabled={!isApproved || isSubmitting || isDisabled}
        loading={isSubmitting || isLoading}
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
