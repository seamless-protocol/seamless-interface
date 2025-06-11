import { DisplayText, FlexRow, Icon, ViewBigInt, ViewNumber } from "@shared";
import { Address } from "viem";
import { useFetchUserUnrealized } from "../../../../../data/leverage-tokens/queries/leverage-token-profit/unrealized-gain-loss.fetch";
import React from "react";
import { getSvgBasedOnSign, getColorBasedOnSign } from "../../../../utils/uiUtils";

function getProfitText(unrealizedGain: ViewBigInt, unrealizedGainPercentage: ViewNumber): string | undefined {
  return `${unrealizedGain.symbol}${unrealizedGain.viewValue} (${unrealizedGainPercentage.viewValue}${unrealizedGainPercentage.symbol}) All time`;
}

export const AllTimeComponent: React.FC<{
  address?: Address;
}> = ({ address }) => {
  const { data: userProfit, isLoading, isFetched } = useFetchUserUnrealized(address);

  if (isLoading || !isFetched) {
    return <span className="skeleton mt-[0.2px] flex w-20 h-6" />;
  }

  if (!userProfit?.unrealizedUsd?.viewValue) {
    return null;
  }

  return (
    <FlexRow className="justify-center max-w-max">
      <Icon
        src={getSvgBasedOnSign(userProfit.unrealizedUsd.value)}
        alt="polygon"
        width={16}
        height={16}
        hidden={!userProfit.unrealizedUsd.value}
      />
      <DisplayText
        viewValue={getProfitText(userProfit.unrealizedUsd, userProfit.unrealizedPercent)}
        className={getColorBasedOnSign(userProfit.unrealizedUsd.value)}
        typography="bold2"
      />
    </FlexRow>
  );
};
