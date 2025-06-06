import { FlexCol, AuthGuardv2, Buttonv2, useNotificationContext, getApproveState } from "@shared";
import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const FormButtons = () => {
  const { showNotification } = useNotificationContext();

  const {
    reactHookFormMethods: {
      formState: { isSubmitting },
    },
    withdrawAmount,
    isRedeemPending,
    redeemApproveData: { isApproved, isApproving, justApproved, approveAsync },
  } = useLeverageTokenFormContext();

  if (!withdrawAmount) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        Enter amount
      </Buttonv2>
    );
  }

  return (
    <FlexCol className="gap-2 w-full">
      <Buttonv2
        data-cy="approvalButton"
        className="text-bold3"
        disabled={isApproved || isSubmitting}
        loading={!isApproved && (isApproving || isRedeemPending)}
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

      <AuthGuardv2 message="">
        <Buttonv2
          data-cy="actionButton"
          className="text-bold3"
          type="submit"
          disabled={!isApproved || isSubmitting || isRedeemPending}
          loading={isSubmitting || isRedeemPending}
        >
          Redeem
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
