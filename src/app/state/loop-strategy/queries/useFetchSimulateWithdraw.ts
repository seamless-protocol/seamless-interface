import { Address } from "viem";
import { simulateWithdraw } from "../../../../shared/utils/bundles";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../../common/metadataQueries/useToken";

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
    staleTime: Infinity,
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
