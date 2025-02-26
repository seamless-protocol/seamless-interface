import React from "react";
import { IncentivesButton } from "./AprTooltip";
import { IncentivesDetailCard } from "./IncentivesDetailCard";
import { NetApyData } from "../../../statev3/morpho/types/UserReward";
import { Address } from "viem";
import { vaultConfig } from "../../../statev3/settings/config";
import { FlexCol, FlexRow, Icon, DisplayText } from "@shared";
import { getViewFormattedApyAndPoints } from "../../../statev3/morpho/mappers/getViewFormattedApyAndPoints";

export const MorphoAprTooltip: React.FC<{
  netApyData?: NetApyData;
  vaultAddress?: Address;
}> = ({ netApyData, vaultAddress }) => {
  if (!netApyData) return null;
  const config = vaultAddress ? vaultConfig[vaultAddress] : undefined;
  const { rewardsOnly, rewardsWithNativeApyAndPoints: rewardsWithNativeApy } = getViewFormattedApyAndPoints(
    netApyData,
    vaultAddress
  );

  return (
    <IncentivesButton
      rewardTokens={rewardsOnly}
      totalApr={netApyData?.netApy}
      additionalElement={
        <div>
          {config?.pointsProgram && (
            <FlexCol className="items-center gap-1">
              <FlexRow className=" bg-blue-200 items-center gap-2 border border-solid px-2 py-1.5 rounded-[100px] border-metallicBorder max-w-max">
                <Icon src={config.pointsProgram.icon} alt="strategy-icon" width={16} />
                <DisplayText typography="medium2" viewValue={config.pointsProgram.viewValue} />
              </FlexRow>
            </FlexCol>
          )}
        </div>
      }
    >
      <IncentivesDetailCard totalApr={netApyData?.netApy} rewardTokens={rewardsWithNativeApy} />
    </IncentivesButton>
  );
};
