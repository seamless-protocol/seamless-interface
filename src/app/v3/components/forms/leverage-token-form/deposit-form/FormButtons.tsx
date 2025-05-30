import { FlexCol, AuthGuardv2, Buttonv2, getApproveState, useNotificationContext } from "@shared";

import { useLeverageTokenFormContext } from "../leverage-token-form-provider/LeverageTokenFormProvider";

export const FormButtons = () => {
  const { showNotification } = useNotificationContext();

  const {
    reactHookFormMethods: {
      formState: { isSubmitting },
    },
    depositAmount,
    isPending,
    approveData: { isApproved, isApproving, justApproved, approveAsync },
  } = useLeverageTokenFormContext();

  if (!depositAmount) {
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
          loading={!isApproved && (isApproving || isPending)}
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
        <Buttonv2
          data-cy="actionButton"
          className="text-bold3"
          type="submit"
          disabled={!isApproved || isSubmitting || isPending}
          loading={isSubmitting || isPending}
        >
          Submit
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
