import { FlexCol, AuthGuardv2, Buttonv2, useERC20Approve, getApproveState, Typography } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { useFetchStakedSeamTokenData } from "../../../../../statev3/safetyModule/hooks/useFetchStakedSeamTokenData";

export const FormButtons: React.FC<{
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ isLoading, isDisabled }) => {
  const { data: tokenData, isLoading: isSeamTokenDataLoading, error } = useFetchStakedSeamTokenData();

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    tokenData?.asset.address,
    tokenData?.address,
    parseUnits(amount || "0", tokenData?.asset.decimals ?? 18)
  );

  if (isSeamTokenDataLoading) {
    return (
      <Buttonv2 className="text-bold3" loading>
        Enter amount
      </Buttonv2>
    );
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.warn("steak seam data not found!!!");
    if (error) console.error("steak seam error while fetching", error);

    return (
      <div>
        <Typography type="medium3" className="text-red-600">
          Error while fetching steak seam token data: {error?.message}
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
          loading={!isApproved && (isApproving || isLoading)}
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
        disabled={!isApproved || isSubmitting || isDisabled}
        loading={isSubmitting || isLoading}
        // add deposit func.
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
