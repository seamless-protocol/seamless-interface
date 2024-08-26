import { DisplayValue, FlexRow, Icon } from "../../../../../../../shared";
import polygonSvg from "@assets/common/polygon.svg";
import { useFetchFormattedUserProfit } from "../../../../../../statev3/hooks/user-profit/UserProfit.hook";

export const Profit = () => {
  const { data: userProfit, ...userProfitRest } = useFetchFormattedUserProfit();

  return (
    <FlexRow className="flex bg-green-100 rounded-tag p-1  justify-center gap-1 max-w-52">
      <Icon src={polygonSvg} alt="polygon" width={16} height={16} />
      <FlexRow className="items-center gap-1">
        <DisplayValue
          {...userProfit.unrealizedProfit}
          {...userProfitRest}
          typography="bold4"
          className="text-success-900"
        />
        <DisplayValue
          viewValue={`(${userProfit.unrealizedProfitPercentage.viewValue}${userProfit.unrealizedProfitPercentage.symbol})`}
          typography="bold4"
          className="text-success-900"
          {...userProfitRest}
        />
      </FlexRow>
    </FlexRow>
  );
};
