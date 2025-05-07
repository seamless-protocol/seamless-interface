import { FlexCol, AuthGuardv2, Buttonv2 } from "@shared";
import { useLeverageTokenWithdrawFormContext } from "../contexts/leverage-token-form-provider/withdraw/LeverageTokenWithdrawFormProvider";

export const FormButtons = () => {
  const {
    methods: {
      formState: { isSubmitting },
    },
    amount,
    isPending,
  } = useLeverageTokenWithdrawFormContext();

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
          data-cy="actionButton"
          className="text-bold3"
          type="submit"
          disabled={isSubmitting || isPending}
          loading={isSubmitting || isPending}
        >
          Withdraw
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
