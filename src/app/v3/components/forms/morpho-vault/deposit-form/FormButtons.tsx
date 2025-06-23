import { FlexCol, AuthGuardv2, Buttonv2, useERC20Approve, getApproveState } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { MappedVaultData } from "../../../../../data/morpho/types/MappedFullVaultData";
import { ChainId, getChainAddresses as getMorphoChainAddresses } from "@morpho-org/blue-sdk";
import { useDepositingNativeETH } from "./useDepositingNativeETH";

export const FormButtons: React.FC<{
  vaultData: MappedVaultData;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled }) => {
  const depositNativeETH = useDepositingNativeETH();
  const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount", "0");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    vaultData.asset.address,
    bundler,
    parseUnits(amount, vaultData.asset.decimals)
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
      <AuthGuardv2>
        {!depositNativeETH && (
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
        )}
        <Buttonv2
          data-cy="actionButton"
          className="text-bold3"
          type="submit"
          disabled={(!depositNativeETH && !isApproved) || isSubmitting || isDisabled}
          loading={isSubmitting || isLoading}
        >
          Submit
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
