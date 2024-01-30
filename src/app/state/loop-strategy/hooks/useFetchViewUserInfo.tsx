import { useAccount } from "wagmi";
import { formatToDisplayable } from "../../../../shared/utils/helpers";
import { ilmStrategies } from "../config/StrategyConfig";
import { useFetchStrategyInfoForAccount } from "../../ILM/hooks/useFetchViewStrategies";
import { ViewUserInfo } from "../types/ViewUserInfo";
import { Displayable } from "../../../../shared/types/Displayable";

export const useFetchViewUserInfo = (
  index: number
): Displayable<ViewUserInfo> => {
  const strategyConfig = ilmStrategies[index];

  const account = useAccount();
  const {
    isLoading,
    isFetched,
    userEquity,
    userEquityUSD,
    userBalance,
    userBalanceUSD,
  } = useFetchStrategyInfoForAccount(
    strategyConfig.address,
    strategyConfig.underlyingAsset.address,
    account
  );

  return {
    isLoading,
    isFetched,
    data: {
      underlyingAssetBalance: {
        tokenAmount: {
          value: formatToDisplayable(userBalance),
          symbol: strategyConfig.underlyingAsset.symbol,
        },
        dollarAmount: {
          value: formatToDisplayable(userBalanceUSD),
          symbol: "$",
        },
      },
      strategyBalance: {
        tokenAmount: {
          value: formatToDisplayable(userEquity),
          symbol: strategyConfig.symbol,
        },
        dollarAmount: {
          value: formatToDisplayable(userEquityUSD),
          symbol: "$",
        },
      },
    },
  };
};
