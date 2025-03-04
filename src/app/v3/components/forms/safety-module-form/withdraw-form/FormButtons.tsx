import {
  FlexCol,
  AuthGuardv2,
  Buttonv2,
  useIsSmartWallet,
  Typography,
} from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import { StakedSeam as TokenData } from "../../../../../statev3/safetyModule/types/StakedSeam";

export const FormButtons: React.FC<{
  vaultData: TokenData;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled }) => {
  // const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount", "0");

  const { address } = useAccount();
  const { isSmartWallet, isLoading: isSmartWalletLoading, error: smartWalletError } = useIsSmartWallet(address);

  // const { isApproved, isApproving, justApproved, approveAsync } = useERC20Approve(
  //   vaultData.address,
  //   bundler,
  //   parseUnits(amount, vaultData.asset.decimals)
  // );

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
  <AuthGuardv2 message="">
    <Buttonv2
      data-cy="actionButton"
      className="text-bold3"
      type="submit"
      disabled={isDisabled || isSubmitting}
      loading={isLoading || isSmartWalletLoading}
    >
      Withdraw
    </Buttonv2>
  </AuthGuardv2>
</FlexCol>
  );
};
