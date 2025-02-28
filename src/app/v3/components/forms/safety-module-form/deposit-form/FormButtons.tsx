import { FlexCol, AuthGuardv2, Buttonv2, useERC20Approve, getApproveState } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { StakedSeam } from "../../../../../statev3/safetyModule/types/StakedSeam";
import { ChainId, addresses } from "@morpho-org/blue-sdk";
import { useFetchTokenData} from "../../../../../statev3/safetyModule/hooks/useFetchTokenData";

export const FormButtons: React.FC<{
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({  isLoading, isDisabled }) => {
  const tokenData: StakedSeam = useFetchTokenData();
  const { bundler } = addresses[ChainId.BaseMainnet];

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    tokenData.asset.address,
    bundler,
    parseUnits(amount || "0", tokenData.asset.decimals ?? 18)
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
