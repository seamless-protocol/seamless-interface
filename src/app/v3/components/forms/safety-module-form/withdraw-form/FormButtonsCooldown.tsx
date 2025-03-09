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
import { walletBalanceDecimalsOptions } from "@meta";
import { useFetchViewAssetBalance } from "../../../../../statev3/common/queries/useFetchViewAssetBalance";

export const FormButtons: React.FC<{
  vaultData: TokenData;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled }) => {

  const {
    formState: { isSubmitting },
  } = useFormContext();
  

  const { address } = useAccount();
  const { isSmartWallet, isLoading: isSmartWalletLoading, error: smartWalletError } = useIsSmartWallet(address);

  const { data: viewBalance } = useFetchViewAssetBalance(vaultData.address, walletBalanceDecimalsOptions);

  if (viewBalance.balance?.bigIntValue?.toString() === "0") {
    return (
      <Buttonv2 className="text-bold3" disabled>
        Acquire stkSEAM
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
      Start Cooldown
    </Buttonv2>
  </AuthGuardv2>
</FlexCol>
  );
};
