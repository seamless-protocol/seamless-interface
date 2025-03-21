import React from "react";
import { UnclaimedRewardsBox, UnclaimedRewardsBoxProps } from "../../../../common/components/UnclaimedRewardsBox";
import { useMutateClaimAllRewards } from "../../../../../../statev3/safetyModule/mutations/useMutateClaimAllRewards";

interface Props extends Omit<UnclaimedRewardsBoxProps, "claimAllAsync" | "isPending"> {}

export const UnclaimedRewardsBoxWrapper: React.FC<Props> = (props) => {
  const { claimAllAsync, isPending } = useMutateClaimAllRewards();
  return <UnclaimedRewardsBox {...props} claimAllAsync={claimAllAsync} isPending={isPending} />;
};
