import React from "react";
import { useMutateClaimAllRewards } from "../../../../../../state/loop-strategy/mutations/useMutateClaimAllRewards";
import { UnclaimedRewardsBox, UnclaimedRewardsBoxProps } from "../../../../common/components/UnclaimedRewardsBox";

interface Props extends Omit<UnclaimedRewardsBoxProps, "claimAllAsync" | "isPending"> {}

export const UnclaimedRewardsBoxWrapper: React.FC<Props> = (props) => {
  const { claimAllAsync, isPending } = useMutateClaimAllRewards();
  return <UnclaimedRewardsBox {...props} claimAllAsync={claimAllAsync} isPending={isPending} />;
};
