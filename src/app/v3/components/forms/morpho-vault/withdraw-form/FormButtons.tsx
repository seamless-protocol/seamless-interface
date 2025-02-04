import {
  FlexCol,
  AuthGuardv2,
  Buttonv2,
  useSmartWalletCheck,
  getApproveState,
  useERC20Approve,
  Typography,
} from "@shared";
import React from "react";
import { parseUnits } from "viem";
import { ChainId, addresses } from "@morpho-org/blue-sdk";
import { MappedVaultData } from "../../../../../statev3/morpho/types/MappedFullVaultData";

export const FormButtons: React.FC<{
  vaultData: MappedVaultData;
  amount: number;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled, amount }) => {
  const { isSmartWallet, isLoading: isSmartWalletLoading, error: smartWalletError } = useSmartWalletCheck();

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

  if (isSmartWalletLoading) return null;
  if (smartWalletError) {
    return (
      <div>
        <Typography type="medium3" className="text-red-600">
          {smartWalletError?.message}
        </Typography>
      </div>
    );
  }

  return (
    <FlexCol className="gap-2 w-full">
      {isSmartWallet && (
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
      )}

      <AuthGuardv2 message="">
        <Buttonv2
          data-cy="actionButton"
          className="text-bold3"
          type="submit"
          disabled={(!isApproved && isSmartWallet) || isDisabled}
          loading={isLoading}
        >
          Withdraw
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
