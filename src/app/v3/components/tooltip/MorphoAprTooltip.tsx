import React from 'react'
import { getViewFormattedNetApyData } from '../../../statev3/morpho/mappers/mapNetApyData';
import { IncentivesButton } from './AprTooltip';
import { IncentivesDetailCard } from './IncentivesDetailCard';
import { NetApyData } from '../../../statev3/morpho/types/UserReward';

export const MorphoAprTooltip: React.FC<{
  netApyData?: NetApyData
}> = ({ netApyData }) => {
  const { rewardsOnly, rewardsWithRest } = getViewFormattedNetApyData(netApyData);
  return (
    <IncentivesButton rewardTokens={rewardsOnly} totalApr={netApyData?.netApy}>
      <IncentivesDetailCard totalApr={
        netApyData?.netApy
      } rewardTokens={rewardsWithRest} />
    </IncentivesButton>
  )
}
