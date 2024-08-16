import { lendingPoolAddress } from "@generated";
import {
  useERC20Approve,
  FlexCol,
  AuthGuardv2,
  Buttonv2,
  getApproveState,
  useToken,
  fParseUnits,
  useNotificationContext,
} from "@shared";
import { useFormContext } from "react-hook-form";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";

export const FormButtons = () => {
  const { asset, onTransaction } = useFormSettingsContext();
  const { showNotification } = useNotificationContext();

  const { data: tokenData } = useToken(asset);

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    asset,
    lendingPoolAddress,
    fParseUnits(amount || "0", tokenData.decimals)
  );

  if (!amount) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        Enter amount
      </Buttonv2>
    );
  }

  return (
    <FlexCol className="gap-2">
      <AuthGuardv2 message="">
        <Buttonv2
          data-cy="approvalButton"
          className="text-bold3"
          disabled={isApproved}
          loading={isApproving}
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
        data-cy="actionButton"
        className="text-bold3"
        type="submit"
        disabled={!isApproved || isSubmitting}
        loading={isSubmitting}
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
