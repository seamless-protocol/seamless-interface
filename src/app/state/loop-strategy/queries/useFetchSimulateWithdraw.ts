import { Address } from "viem";
import { simulateWithdraw } from "../../../../shared/utils/bundles";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@shared";
import { DebouncedDelayConfig } from "../config/DebouncedDelayConfig";

export const useFetchSimulateWithdraw = (
  account: Address,
  strategy: Address,
  amount: string
) => {
  const {
    data: underlyingAsset,
    isLoading: isStrategyAssetLoading,
    isFetched: isStrategyAssetFetched,
  } = useFetchStrategyAsset(strategy);

  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    data: { symbol, decimals },
  } = useToken(underlyingAsset);

  const {
    data,
    isLoading: isSimulateWithdrawLoading,
    isFetched: isSimulateWithdrawFetched,
    ...rest
  } = useQuery({
    queryKey: ["simulateWithdraw", strategy, amount],
    queryFn: () => simulateWithdraw(account, strategy, amount),
    ...DebouncedDelayConfig,
  });

  return {
    ...rest,
    isLoading:
      isTokenDataLoading || isStrategyAssetLoading || isSimulateWithdrawLoading,
    isFetched:
      isTokenDataFetched && isStrategyAssetFetched && isSimulateWithdrawFetched,
    data: {
      bigIntValue: data?.assetsToReceive,
      decimals,
      symbol,
    },
  };
};
