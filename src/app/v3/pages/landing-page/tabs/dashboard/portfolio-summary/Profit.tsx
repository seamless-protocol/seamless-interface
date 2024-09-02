import { DisplayText, ViewBigInt } from "@shared";
import { useFetchFormattedUserProfitAndPortfolio } from "../../../../../../statev3/hooks/user-profit-and-portfolio/UserProfitAndPortfolio.hook";
import { SignIndicatingElement } from "../../../../../components/other/SignIndicatingElement";

function getProfitText(unrealizedGain: ViewBigInt, unrealizedGainPercentage: ViewBigInt): string | undefined {
  return `${unrealizedGain.symbol}${unrealizedGain.viewValue} (${unrealizedGainPercentage.viewValue}${unrealizedGainPercentage.symbol})`;
}

export const Profit = () => {
  const { data: userProfit, ...rest } = useFetchFormattedUserProfitAndPortfolio();

  return (
    <SignIndicatingElement
      dislayable={{
        ...rest,
        data: userProfit.unrealizedProfit,
      }}
    >
      <DisplayText
        truncate
        viewValue={getProfitText(userProfit.unrealizedProfit, userProfit.unrealizedProfitPercentage)}
        typography="bold4"
      />
    </SignIndicatingElement>
  );
};
