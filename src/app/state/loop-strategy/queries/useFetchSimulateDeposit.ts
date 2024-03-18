import { Address } from "viem";
import { simulateDeposit } from "../../../../shared/utils/tenderlyBundles";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "../../common/metadataQueries/useToken";

export const useFetchSimulateDeposit = (
  account: Address,
  strategy: Address,
  amount: string
) => {
  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    data: { symbol, decimals },
  } = useToken(strategy);

  const {
    data: underlyingAsset,
    isLoading: isUnderlyingAssetLoading,
    isFetched: isUnderlyingAssetFetched,
  } = useFetchStrategyAsset(strategy);

  const {
    data,
    isLoading: isSimulateDepositLoading,
    isFetched: isSimulateDepositFetched,
    ...rest
  } = useQuery({
    queryKey: ["simulateDeposit", strategy, amount],
    queryFn: () => simulateDeposit(account, strategy, underlyingAsset, amount),
  });

  return {
    ...rest,
    isLoading:
      isTokenDataLoading ||
      isUnderlyingAssetLoading ||
      isSimulateDepositLoading,
    isFetched:
      isTokenDataFetched &&
      isUnderlyingAssetFetched &&
      isSimulateDepositFetched,
    data: {
      bigIntValue: data?.sharesToReceive,
      decimals,
      symbol,
    },
  };
};
