import { Address, erc20Abi } from "viem";
import { StrategyConfig } from "../config/StrategyConfig";
import { useAccount, useReadContract } from "wagmi";
import { useFetchShareValue } from "../../common/hooks/useFetchShareValue";
import { ONE_ETHER } from "../../../meta";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";

export interface StrategyBalance {
  strategyBalance: FetchBigInt;
  strategyBalanceUsd: FetchBigInt;
}

export const useFetchStrategyBalance = (
  strategyConfig: StrategyConfig
): Fetch<StrategyBalance> => {
  const account = useAccount();
  let {
    data: strategyBalance,
    isLoading: isStrategyBalanceLoading,
    isFetched: isStrategyBalanceFetched,
  } = useReadContract({
    address: strategyConfig.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });

  let {
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
    shareValueInUsd: shareValue,
  } = useFetchShareValue(strategyConfig);

  strategyBalance = strategyBalance || 0n;
  shareValue = shareValue || 0n;

  return {
    isLoading: isStrategyBalanceLoading || isShareValueLoading,
    isFetched: isStrategyBalanceFetched && isShareValueFetched,
    strategyBalance: {
      bigIntValue: strategyBalance || 0n,
      symbol: strategyConfig.symbol,
      decimals: 18,
    },
    strategyBalanceUsd: {
      bigIntValue: ((strategyBalance || 0n) * shareValue) / ONE_ETHER,
      symbol: "$",
      decimals: 8,
    },
  };
};

export const useFetchViewStrategyBalance = (strategyConfig: StrategyConfig) => {
  const { isLoading, isFetched, strategyBalance, strategyBalanceUsd } =
    useFetchStrategyBalance(strategyConfig);

  return {
    isLoading,
    isFetched,
    data: {
      balance: {
        tokenAmount: formatFetchBigIntToViewBigInt(strategyBalance),
        dollarAmount: formatFetchBigIntToViewBigInt(strategyBalanceUsd),
      },
    },
  };
};
