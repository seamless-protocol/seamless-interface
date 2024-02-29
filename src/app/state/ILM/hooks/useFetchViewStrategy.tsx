import { UseAccountReturnType, useAccount, useReadContract } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import {
  convertRatioToMultiple,
  formatFetchBigIntToViewBigInt,
} from "../../../../shared/utils/helpers";
import { ONE_ETHER } from "../../../meta/constants";
import { Address, erc20Abi } from "viem";
import {
  StrategyConfig,
  ilmStrategies,
} from "../../loop-strategy/config/StrategyConfig";
import { useFetchViewStrategyApy } from "../../loop-strategy/hooks/useFetchViewStrategyApy";
import { Displayable } from "../../../../shared";
import { ViewStrategy } from "../types/ViewStrategy";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";

interface StrategyInfoForAccount {
  targetMultiple: FetchBigInt;
  userEquity: FetchBigInt;
  userEquityUSD: FetchBigInt;
  userBalance: FetchBigInt;
  userBalanceUSD: FetchBigInt;
}

export function useFetchStrategyInfoForAccount(
  strategyConfig: StrategyConfig,
  account: UseAccountReturnType
): Fetch<StrategyInfoForAccount> {
  const { address: strategyAddress, underlyingAsset } = strategyConfig;

  let {
    data: collateralRatioTargets,
    isLoading: isCollateralRatioTargetLoading,
    isFetched: isCollateralRatioTargetFetched,
  } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "getCollateralRatioTargets",
  });
  let {
    data: userShares,
    isLoading: isStrategyBalanceLoading,
    isFetched: isStrategyBalanceFetched,
  } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });
  let {
    data: totalShares,
    isLoading: isTotalSupplyLoading,
    isFetched: isTotalSupplyFetched,
  } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "totalSupply",
  });
  let {
    data: equityUSD,
    isLoading: isEquityUSDLoading,
    isFetched: isEquityUSDFetched,
  } = useReadContract({
    address: strategyAddress,
    abi: loopStrategyAbi,
    functionName: "equityUSD",
  });

  let {
    data: underlyingAssetBalance,
    isLoading: isUnderlyingAssetBalanceLoading,
    isFetched: isUnderlyingAssetBalanceFetched,
  } = useReadContract({
    address: underlyingAsset.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [account.address as Address],
  });
  let {
    data: underlyingAssetPrice,
    isLoading: isUnderlyingAssetPriceLoading,
    isFetched: isUnderlyingAssetPriceFetched,
  } = useReadContract({
    address: aaveOracleAddress,
    abi: aaveOracleAbi,
    functionName: "getAssetPrice",
    args: [underlyingAsset.address],
  });

  const isLoading =
    isCollateralRatioTargetLoading ||
    isStrategyBalanceLoading ||
    isTotalSupplyLoading ||
    isEquityUSDLoading ||
    isUnderlyingAssetBalanceLoading ||
    isUnderlyingAssetPriceLoading;

  const isFetched =
    isCollateralRatioTargetFetched ||
    isStrategyBalanceFetched ||
    isTotalSupplyFetched ||
    isEquityUSDFetched ||
    isUnderlyingAssetBalanceFetched ||
    isUnderlyingAssetPriceFetched;

  let targetMultiple, userEquity, userEquityUSD, underlyingAssetBalanceUSD;
  if (isFetched) {
    const targetRatio = collateralRatioTargets?.target || 0n;
    targetMultiple = convertRatioToMultiple(targetRatio);

    userShares = userShares || 0n;
    totalShares = totalShares || 0n;
    equityUSD = equityUSD || 0n;

    userEquity = userShares;
    userEquityUSD = totalShares ? (equityUSD * userShares) / totalShares : 0n;

    underlyingAssetBalance = underlyingAssetBalance || 0n;
    underlyingAssetBalanceUSD =
      (underlyingAssetBalance * (underlyingAssetPrice || 0n)) / ONE_ETHER;
  }

  return {
    isLoading,
    isFetched,
    targetMultiple: {
      bigIntValue: targetMultiple || 0n,
      decimals: 8,
      symbol: "x",
    },
    userEquity: {
      bigIntValue: userEquity || 0n,
      decimals: 18,
      symbol: strategyConfig.symbol,
    },
    userEquityUSD: {
      bigIntValue: userEquityUSD || 0n,
      decimals: 8,
      symbol: "$",
    },
    userBalance: {
      bigIntValue: underlyingAssetBalance || 0n,
      decimals: 18,
      symbol: underlyingAsset.symbol,
    },
    userBalanceUSD: {
      bigIntValue: underlyingAssetBalanceUSD || 0n,
      decimals: 8,
      symbol: "$",
    },
  };
}

export const useFetchViewStrategy = (
  index: number
): Displayable<ViewStrategy> => {
  const strategyConfig = ilmStrategies[index];

  const account = useAccount();
  const {
    isLoading: isStrategyInfoLoading,
    isFetched: isStrategyInfoFetched,
    targetMultiple,
    userEquity,
    userEquityUSD,
    userBalance,
    userBalanceUSD,
  } = useFetchStrategyInfoForAccount(strategyConfig, account);
  const {
    isLoading: isApyLoading,
    isFetched: isApyFetched,
    data,
  } = useFetchViewStrategyApy(index);

  return {
    isLoading: isStrategyInfoLoading || isApyLoading,
    isFetched: isStrategyInfoFetched && isApyFetched,
    data: {
      strategyName: strategyConfig.name,
      depositAsset: {
        name: strategyConfig.underlyingAsset.name,
        symbol: strategyConfig.underlyingAsset.symbol,
        logo: strategyConfig.underlyingAsset.logo,
      },
      targetMultiple: formatFetchBigIntToViewBigInt(targetMultiple),
      loopApy: data.apy,
      availableToDeposit: {
        tokenAmount: formatFetchBigIntToViewBigInt({
          ...userBalance,
          symbol: "",
        }),
        dollarAmount: formatFetchBigIntToViewBigInt(userBalanceUSD),
      },
      yourPosition: {
        tokenAmount: formatFetchBigIntToViewBigInt({
          ...userEquity,
          symbol: "",
        }),
        dollarAmount: formatFetchBigIntToViewBigInt(userEquityUSD),
      },
    },
  };
};
