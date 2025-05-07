import { FlexCol, AuthGuardv2, Buttonv2, useERC20Approve, getApproveState, useNotificationContext } from "@shared";

import { parseUnits } from "viem";
import { useLeverageTokenDepositFormContext } from "../contexts/leverage-token-form-provider/deposit/LeverageTokenDepositFormProvider";

export const FormButtons = () => {
  const { showNotification } = useNotificationContext();

  const {
    methods: {
      formState: { isSubmitting },
    },
    selectedLeverageToken,
    amount,
    isPending,
  } = useLeverageTokenDepositFormContext();

  const { data: { underlyingAssetAddress, address, underlyingAsset: { decimals = undefined } = {} } = {} } =
    selectedLeverageToken;

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    underlyingAssetAddress,
    address,
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
      </AuthGuardv2>
      <Buttonv2
        data-cy="actionButton"
        className="text-bold3"
        type="submit"
        disabled={!isApproved || isSubmitting || isPending}
        loading={isSubmitting || isPending}
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
