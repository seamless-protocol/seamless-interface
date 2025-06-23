import React from "react";
import { useMutateClaimAllRewards } from "../../../../../../data/safetyModule/mutations/useMutateClaimAllRewards";
import { rewardsAccruingAssets } from "../../../../../../data/settings/config";
import { useFetchViewAllUserRewards } from "../../../../../../data/common/hooks/useFetchViewAllUserRewards";
import { UnclaimedRewardsBox } from "../../../../common/components/UnclaimedRewardsBox";

export const UnclaimedRewardsBoxWrapper: React.FC = () => {
  const { data, ...rest } = useFetchViewAllUserRewards(rewardsAccruingAssets);
  const { claimAllAsync, isPending } = useMutateClaimAllRewards();
  return (
    <UnclaimedRewardsBox
      noRewardsMessage="Stake SEAM to receive rewards."
      data={data}
      {...rest}
      claimAllAsync={claimAllAsync}
      isPending={isPending}
    />
  );
};
