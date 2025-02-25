import React from "react";
import { getViewFormattedNetApyData } from "../../../statev3/morpho/mappers/mapNetApyData/fNetApyData";
import { IncentivesButton } from "./AprTooltip";
import { IncentivesDetailCard } from "./IncentivesDetailCard";
import { NetApyData } from "../../../statev3/morpho/types/UserReward";
import { Address } from "viem";

export const MorphoAprTooltip: React.FC<{
  netApyData?: NetApyData;
  vaultAddress?: Address;
}> = ({ netApyData, vaultAddress }) => {
  if (!netApyData) return null;
  const { rewardsOnly, rewardsWithNativeApy } = getViewFormattedNetApyData(netApyData, vaultAddress);
  return (
    <IncentivesButton rewardTokens={rewardsOnly} totalApr={netApyData?.netApy}>
      <IncentivesDetailCard totalApr={netApyData?.netApy} rewardTokens={rewardsWithNativeApy} />
    </IncentivesButton>
  );
};
