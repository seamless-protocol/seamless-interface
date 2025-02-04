import { FlexCol, AuthGuardv2, Buttonv2, useIsSmartWallet, getApproveState, useERC20Approve, Typography } from "@shared";
import React from "react";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { ChainId, addresses } from "@morpho-org/blue-sdk";
import { MappedVaultData } from "../../../../../statev3/morpho/types/MappedFullVaultData";

export const FormButtons: React.FC<{
  vaultData: MappedVaultData;
  amount: number;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled, amount }) => {
  const { address } = useAccount();
  const { isSmartWallet, isLoading: isSmartWalletLoading, isError: isSmartWalletError } = useIsSmartWallet(address);

  const { bundler } = addresses[ChainId.BaseMainnet];

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    vaultData.vaultAddress,
    bundler,
    parseUnits(String(amount || 0), vaultData.vaultTokenData.decimals)
  );

  if (!amount) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        Enter amount
      </Buttonv2>
    );
  }

  if (isSmartWalletError) {
    return (
      <div>
        <Typography type="medium3" className="text-red-600">
          {isSmartWalletError?.message}
        </Typography>
      </div>
    );
  }

  return (
    <FlexCol className="gap-2 w-full">
      {isSmartWallet && (
        <AuthGuardv2 message="">
          <Buttonv2
            data-cy="approvalButton"
            className="text-bold3"
            disabled={isApproved}
            loading={!isApproved && (isApproving || isLoading)}
            onClick={async () => {
              await approveAsync();
            }}
          >
            {getApproveState(isApproved, justApproved)}
          </Buttonv2>
        </AuthGuardv2>
      )}

      <AuthGuardv2 message="">
        <Buttonv2
          data-cy="actionButton"
          className="text-bold3"
          type="submit"
          disabled={(!isApproved && isSmartWallet) || isDisabled}
          loading={isLoading || isSmartWalletLoading}
        >
          Withdraw
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
