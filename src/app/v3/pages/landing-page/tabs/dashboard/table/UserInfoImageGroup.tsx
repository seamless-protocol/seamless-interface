import React from "react";
import { RewardsInfo } from "../../../../../../data/ilmv1-deprecated/hooks/user-rewards-by-strategy/UserRewardsByStrategy.hook";
import { ImageGroup } from "../../../../../../../shared";

export const UserInfoImageGroup: React.FC<{
  info: RewardsInfo[];
}> = ({ info }) => {
  return (
    <ImageGroup
      imageStyle="w-4"
      spacing="-space-x-3"
      images={info.filter((reward) => (reward.tokenAmount.bigIntValue || 0n) > 0n).map((reward) => reward.logo)}
    />
  );
};
