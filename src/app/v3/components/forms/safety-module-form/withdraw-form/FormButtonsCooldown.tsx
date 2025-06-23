import { FlexCol, AuthGuardv2, Buttonv2, Typography } from "@shared";
import React from "react";
import { useFormContext } from "react-hook-form";
import { StakedSeam as TokenData } from "../../../../../data/safetyModule/types/StakedSeam";
import { walletBalanceDecimalsOptions } from "@meta";
import { useFetchViewAssetBalance } from "../../../../../data/common/queries/useFetchViewAssetBalance";

export const FormButtons: React.FC<{
  vaultData: TokenData;
  isLoading?: boolean;
  isDisabled?: boolean;
}> = ({ vaultData, isLoading, isDisabled }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const {
    data: viewBalance,
    isLoading: isLoadingBalance,
    error,
  } = useFetchViewAssetBalance(vaultData.address, walletBalanceDecimalsOptions);

  if (isLoadingBalance) {
    return (
      <Buttonv2 className="text-bold3" loading>
        Start Cooldown
      </Buttonv2>
    );
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.warn("Asset Balance data not found!!!");
    if (error) console.error("AssetBalance error while fetching", error);

    return (
      <div>
        <Typography type="medium3" className="text-red-600">
          Error while fetching asset balance seam token data: {error?.message}
        </Typography>
      </div>
    );
  }

  if (viewBalance.balance?.bigIntValue != null && viewBalance.balance?.bigIntValue <= 0n) {
    return (
      <Buttonv2 className="text-bold3" disabled>
        Acquire stkSEAM
      </Buttonv2>
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
          loading={isLoading}
        >
          Start Cooldown
        </Buttonv2>
      </AuthGuardv2>
    </FlexCol>
  );
};
