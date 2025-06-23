import { DisplayText } from "@shared";
import { useFetchFormattedUserProfitAndPortfolio } from "../../../../../../data/ilmv1-deprecated/hooks/user-profit-and-portfolio/UserProfitAndPortfolio.hook";
import { SignIndicatingElement } from "../../../../../components/other/SignIndicatingElement";

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
        viewValue={`${userProfit.unrealizedProfit.symbol}${userProfit.unrealizedProfit.viewValue} (${userProfit.unrealizedProfitPercentage.viewValue}${userProfit.unrealizedProfitPercentage.symbol})`}
        typography="bold4"
        {...rest}
      />
    </SignIndicatingElement>
  );
};
