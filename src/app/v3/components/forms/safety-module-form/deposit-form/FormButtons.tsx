import { FlexCol, AuthGuardv2, Buttonv2, useERC20Approve, getApproveState, Typography } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { useFetchStakedSeamTokenData } from "../../../../../data/safetyModule/hooks/useFetchStakedSeamTokenData";

export const FormButtons: React.FC<{
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ isLoading, isDisabled }) => {
  const { data: tokenData, isLoading: isSeamTokenDataLoading, error } = useFetchStakedSeamTokenData();

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount", "0");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    tokenData?.underlying.address,
    tokenData?.address,
    tokenData?.underlying.decimals ? parseUnits(amount, tokenData?.underlying.decimals) : undefined
  );

  if (error) {
    // eslint-disable-next-line no-console
    console.warn("Staked SEAM data not found!!!");
    if (error) console.error("Staked SEAM error while fetching", error);

    return (
      <div>
        <Typography type="medium3" className="text-red-600">
          Error while fetching Staked SEAM token data: {error?.message}
        </Typography>
      </div>
    );
  }

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
          loading={(!isApproved && (isApproving || isLoading)) || isSeamTokenDataLoading}
          onClick={async () => {
            await approveAsync();
          }}
        >
          {getApproveState(isApproved, justApproved)}
        </Buttonv2>
      </AuthGuardv2>
      <Buttonv2
        data-cy="actionButton"
        className="text-bold3"
        type="submit"
        disabled={!isApproved || isSubmitting || isDisabled || isSeamTokenDataLoading}
        loading={isSubmitting || isLoading}
      >
        Stake
      </Buttonv2>
    </FlexCol>
  );
};
