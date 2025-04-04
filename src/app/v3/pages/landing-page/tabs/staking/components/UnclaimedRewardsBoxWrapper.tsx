import React from "react";
import { useMutateClaimAllRewards } from "../../../../../../statev3/safetyModule/mutations/useMutateClaimAllRewards";
import { rewardsAccruingAssets } from "../../../../../../statev3/settings/config";
import { useFetchViewAllUserRewards } from "../../../../../../statev3/common/hooks/useFetchViewAllUserRewards";
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
