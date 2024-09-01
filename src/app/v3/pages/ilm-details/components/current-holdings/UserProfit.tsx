import { useParams } from "react-router-dom";
import { DisplayText, FlexRow, Icon, ViewBigInt } from "@shared";
import { useFetchFormattedUserStrategyProfit } from "../../../../../statev3/hooks/user-strategy-profit/UserStrategyProfit.hook";
import { getColorBasedOnSign, getSvgBasedOnSign } from "../../../../utils/uiUtils";
import { Address } from "viem";

function getProfitText(unrealizedGain: ViewBigInt, unrealizedGainPercentage: ViewBigInt): string | undefined {
  return `${unrealizedGain.symbol}${unrealizedGain.viewValue} (${unrealizedGainPercentage.viewValue}${unrealizedGainPercentage.symbol}) All time`;
}

// TODO: Find a better way for handling loading skeleton in this component
export const UserProfit = () => {
  const { address: strategy } = useParams();

  const {
    data: userProfit,
    isLoading,
    isFetched,
  } = useFetchFormattedUserStrategyProfit({ strategy: strategy as Address | undefined });

  if (isLoading || !isFetched) {
    return <span className="skeleton mt-[0.2px] flex w-20 h-6" />;
  }

  if (!userProfit.unrealizedProfit?.viewValue) {
    return null;
  }

  return (
    <FlexRow className="justify-center max-w-max">
      <Icon
        src={getSvgBasedOnSign(userProfit.unrealizedProfitPercentage.value)}
        alt="polygon"
        width={16}
        height={16}
        hidden={!userProfit.unrealizedProfitPercentage.bigIntValue}
      />
      <DisplayText
        viewValue={getProfitText(userProfit.unrealizedProfit, userProfit.unrealizedProfitPercentage)}
        className={getColorBasedOnSign(userProfit.unrealizedProfit.value)}
        typography="bold2"
      />
    </FlexRow>
  );
};
