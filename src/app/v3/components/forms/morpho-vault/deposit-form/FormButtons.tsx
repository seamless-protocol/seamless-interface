import { FlexCol, AuthGuardv2, Buttonv2, useERC20Approve, getApproveState, Typography } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { MappedVaultData } from "../../../../../statev3/morpho/types/MappedFullVaultData";
import { ChainId, addresses } from "@morpho-org/blue-sdk";
import { useFetchUserHasPositionInVault } from "../../../../../statev3/morpho/user-vault-positions/UserVaultPositions.hook";

export const FormButtons: React.FC<{
  vaultData: MappedVaultData;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled }) => {
  const { data: hasPositionAlready } = useFetchUserHasPositionInVault(vaultData?.vaultAddress);
  const { bundler } = addresses[ChainId.BaseMainnet];

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount");

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    vaultData.asset.address,
    bundler,
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
      >
        Submit
      </Buttonv2>

      {!hasPositionAlready && (
        <div>
          <Typography type="body1">
            Estimated transaction time ~30 seconds. <br />
            Feel free to wonder trough the DAPP while <br />
            the transaction is being processed.
          </Typography>
        </div>
      )}
    </FlexCol>
  );
};
