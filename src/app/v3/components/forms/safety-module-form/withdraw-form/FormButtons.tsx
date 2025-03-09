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

export const FormButtons: React.FC<{
  
  isLoading?: boolean;
  isDisabled?: boolean;
  isUnstakeWindow?: boolean
}> = ({ isLoading, isDisabled, isUnstakeWindow }) => {
  // const { bundler } = getMorphoChainAddresses(ChainId.BaseMainnet);

  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const amount = watch("amount", "0");

  const { address } = useAccount();
  const { isSmartWallet, isLoading: isSmartWalletLoading, error: smartWalletError } = useIsSmartWallet(address);

  if (!amount) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        {!isUnstakeWindow ? "Wait For Cooldown" : "Enter amount"}
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
