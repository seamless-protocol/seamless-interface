import { useAccount } from "wagmi";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ilmStrategies } from "../../../state/loop-strategy/config/StrategyConfig";
import { useFetchStrategyInfoForAccount } from "../../ilm-page/hooks/useFetchViewStrategy";
import { ViewUserInfo } from "../../../state/loop-strategy/types/ViewUserInfo";
import { Displayable } from "../../../../shared/types/Displayable";
import { walletBalanceDecimalsOptions } from "@meta";

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
        tokenAmount: formatFetchBigIntToViewBigInt(
          userBalance,
          walletBalanceDecimalsOptions
        ),
        dollarAmount: formatFetchBigIntToViewBigInt(
          userBalanceUSD,
          walletBalanceDecimalsOptions
        ),
      },
      strategyBalance: {
        tokenAmount: formatFetchBigIntToViewBigInt(
          userEquity,
          walletBalanceDecimalsOptions
        ),
        dollarAmount: formatFetchBigIntToViewBigInt(
          userEquityUSD,
          walletBalanceDecimalsOptions
        ),
      },
    },
  };
};
