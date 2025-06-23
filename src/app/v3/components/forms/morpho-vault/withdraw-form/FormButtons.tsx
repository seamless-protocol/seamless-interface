import {
  FlexCol,
  AuthGuardv2,
  Buttonv2,
  useIsSmartWallet,
  getApproveState,
  useERC20Approve,
  Typography,
} from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { parseUnits } from "viem";
import { useAccount } from "wagmi";
import { ChainId, getChainAddresses as getMorphoChainAddresses } from "@morpho-org/blue-sdk";
import { MappedVaultData } from "../../../../../data/morpho/types/MappedFullVaultData";

export const FormButtons: React.FC<{
  vaultData: MappedVaultData;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled }) => {
  const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount", "0");

  const { address } = useAccount();
  const { isSmartWallet, isLoading: isSmartWalletLoading, error: smartWalletError } = useIsSmartWallet(address);

  const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
    vaultData.vaultAddress,
    bundler,
    parseUnits(amount, vaultData.vaultTokenData.decimals)
  );

  if (!amount) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        Enter amount
      </Buttonv2>
    );
  }

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
          disabled={(!isApproved && isSmartWallet) || isDisabled || isSubmitting}
          loading={isLoading || isSmartWalletLoading}
        >
          Withdraw
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
