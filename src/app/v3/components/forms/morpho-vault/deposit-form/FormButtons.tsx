import { FlexCol, AuthGuardv2, Buttonv2, useERC20Approve, getApproveState } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { MappedVaultData } from "../../../../../statev3/morpho/types/MappedFullVaultData";
import { useMorphoChainAgnosticBundlerV2 } from "../../../../../statev3/morpho/hooks/useMorphoChainAgnosticBundlerV2";

export const FormButtons: React.FC<{
  vaultData: MappedVaultData;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled }) => {
  const bundlerv2Address = useMorphoChainAgnosticBundlerV2();
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    vaultData.asset.address,
    bundlerv2Address,
    parseUnits(amount || "0", vaultData.asset.decimals)
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
          onClick={async () => { await approveAsync(); }}
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
      >
        Submit
      </Buttonv2>
    </FlexCol>
  );
};
