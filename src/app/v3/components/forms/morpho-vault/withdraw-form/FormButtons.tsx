import { FlexCol, AuthGuardv2, Buttonv2 } from "@shared";
import React from "react";

export const FormButtons: React.FC<{
  amount: number;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ isLoading, isDisabled, amount }) => {
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
        <Buttonv2 data-cy="actionButton" className="text-bold3" type="submit" disabled={isDisabled} loading={isLoading}>
          Withdraw
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
