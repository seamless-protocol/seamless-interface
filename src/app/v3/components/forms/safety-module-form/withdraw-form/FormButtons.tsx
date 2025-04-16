import { FlexCol, AuthGuardv2, Buttonv2 } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";

export const FormButtons: React.FC<{
  isLoading?: boolean;
  isDisabled?: boolean;
  isUnstakeWindow?: boolean;
}> = ({ isLoading, isDisabled, isUnstakeWindow }) => {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount", "0");

  if (!Number(amount)) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        {!isUnstakeWindow ? "Waiting for Cooldown" : "Enter amount"}
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
          disabled={isDisabled || isSubmitting}
          loading={isLoading}
        >
          Unstake
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
