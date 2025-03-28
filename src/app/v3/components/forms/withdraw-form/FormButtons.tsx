import { FlexCol, AuthGuardv2, Buttonv2 } from "@shared";
import { useFormContext } from "react-hook-form";

export const FormButtons: React.FC<{
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ isLoading, isDisabled }) => {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount");

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
          data-cy="actionButton"
          className="text-bold3"
          type="submit"
          disabled={isSubmitting || isDisabled}
          loading={isSubmitting || isLoading}
        >
          Withdraw
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
