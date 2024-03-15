import { Address, maxUint256, zeroAddress } from "viem";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable, ViewBigInt } from "../../../../shared";
import { loopStrategyAbi } from "../../../generated";
import { useToken } from "../../common/metadataQueries/useToken";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { StrategyAction } from "../../../pages/ilm-details-page/components/your-info/withdraw/AmountInputWithdrawWrapper";
import { readContract } from "wagmi/actions";
import { Config, useConfig } from "wagmi";
import { useQuery } from "@tanstack/react-query";

const fetchMaxAssets = async (
  config: Config,
  strategy: Address,
  action: StrategyAction
) => {
  if (action === StrategyAction.Withdraw) {
    return maxUint256;
  }

  return await readContract(config, {
    address: strategy,
    abi: loopStrategyAbi,
    functionName: "maxDeposit",
    args: [zeroAddress], // not used inside smart contract, intentionally left random address
  });
};

export const useFetchMaxAssets = (
  strategy: Address,
  action: StrategyAction
): FetchData<FetchBigInt> => {
  const config = useConfig();

  const {
    isLoading: isTokenDataLoading,
    isFetched: isTokenDataFetched,
    data: { decimals, symbol },
  } = useToken(strategy);

  const {
    isLoading: isMaxAssetsLoading,
    isFetched: isMaxAssetsFetched,
    data,
    ...rest
  } = useQuery({
    queryKey: ["fetchMaxAssets", strategy, action],
    queryFn: () => fetchMaxAssets(config, strategy, action),
  });

  return {
    ...rest,
    isLoading: isTokenDataLoading || isMaxAssetsLoading,
    isFetched: isTokenDataFetched && isMaxAssetsFetched,
    data: {
      bigIntValue: data || 0n,
      decimals,
      symbol,
    },
  };
};

export const useFetchViewMaxAssets = (
  strategy: Address,
  action: StrategyAction
): Displayable<ViewBigInt> => {
  const {
    isLoading,
    isFetched,
    data: maxDeposit,
  } = useFetchMaxAssets(strategy, action);

  return {
    isLoading,
    isFetched,
    data: formatFetchBigIntToViewBigInt(maxDeposit),
  };
};
