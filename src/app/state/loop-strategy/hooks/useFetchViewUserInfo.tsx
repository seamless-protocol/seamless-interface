import { useAccount } from "wagmi";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ilmStrategies } from "../config/StrategyConfig";
import { useFetchStrategyInfoForAccount } from "../../ILM/hooks/useFetchViewStrategy";
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
  } = useFetchStrategyInfoForAccount(strategyConfig, account);

  return {
    isLoading,
    isFetched,
    data: {
      underlyingAssetBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt(userBalance),
        dollarAmount: formatFetchBigIntToViewBigInt(userBalanceUSD),
      },
      strategyBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt(userEquity),
        dollarAmount: formatFetchBigIntToViewBigInt(userEquityUSD),
      },
    },
  };
};
