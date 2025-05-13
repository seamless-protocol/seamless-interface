import { FlexCol, AuthGuardv2, Buttonv2 } from "@shared";
import { useLeverageTokenFormContext } from "../contexts/leverage-token-form-provider/LeverageTokenFormProvider";

export const FormButtons = () => {
  const {
    methods: {
      formState: { isSubmitting },
    },
    withdrawAmount,
    isPending,
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
