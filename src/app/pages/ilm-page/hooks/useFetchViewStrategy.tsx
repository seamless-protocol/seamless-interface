import { UseAccountReturnType, useReadContracts } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import { convertRatioToMultiple } from "../../../../shared/utils/helpers";
import { ONE_ETHER } from "../../../meta/constants";
import { Address, erc20Abi } from "viem";
import {
  StrategyConfig,
  ilmStrategies,
} from "../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewStrategyApy } from "../../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { Displayable } from "../../../../shared";
import { ViewStrategy } from "../../../state/loop-strategy/types/ViewStrategy";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { useFetchViewTargetMultiple } from "../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { useFetchViewStrategyBalance } from "../../../state/loop-strategy/hooks/useFetchViewStrategyBalance";
import { useFetchViewTokenBalanceUsd } from "../../../state/common/hooks/useFetchTokenBalanceUsd";

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
  let targetMultiple, userEquity, userEquityUSD, userBalance, userBalanceUSD;
  const {
    data: results,
    isLoading,
    isFetched,
  } = useReadContracts({
    contracts: [
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "getCollateralRatioTargets",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "balanceOf",
        args: [account.address as Address],
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "totalSupply",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "equity",
      },
      {
        address: strategyAddress,
        abi: loopStrategyAbi,
        functionName: "equityUSD",
      },
      {
        address: underlyingAsset.address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account.address as Address],
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [underlyingAsset.address],
      },
    ],
  });

  if (results) {
    const collateralRatioTargets = results[0].result;
    const targetRatio = BigInt(collateralRatioTargets?.target || 0);
    targetMultiple = convertRatioToMultiple(targetRatio);

    const userShares = BigInt(results[1].result || 0);
    const totalShares = BigInt(results[2].result || 0);

    const equityUSD = BigInt(results[4].result || 0);

    userEquity = userShares;
    userEquityUSD = totalShares ? (equityUSD * userShares) / totalShares : 0n;

    userBalance = BigInt(results[5].result || 0);
    userBalanceUSD = (userBalance * BigInt(results[6].result || 0)) / ONE_ETHER;
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
      bigIntValue: userBalance || 0n,
      decimals: 18,
      symbol: underlyingAsset.symbol,
    },
    userBalanceUSD: {
      bigIntValue: userBalanceUSD || 0n,
      decimals: 8,
      symbol: "$",
    },
  };
}

export const useFetchViewStrategy = (
  index: number
): Displayable<ViewStrategy> => {
  const strategyConfig = ilmStrategies[index];

  const {
    data: targetMultiple,
    isLoading: isTargetMultipleLoading,
    isFetched: isTargetMultipleFetched,
  } = useFetchViewTargetMultiple(strategyConfig.address);

  const {
    data: strategyBalance,
    isLoading: isStrategyBalanceLoading,
    isFetched: isStrategyBalanceFetched,
  } = useFetchViewStrategyBalance(strategyConfig);

  const {
    data: userBalance,
    isLoading: isUserBalanceLoading,
    isFetched: isUserBalanceFetched,
  } = useFetchViewTokenBalanceUsd(strategyConfig.underlyingAsset.address);

  const {
    isLoading: isApyLoading,
    isFetched: isApyFetched,
    data: apyData,
  } = useFetchViewStrategyApy(index);

  return {
    isLoading:
      isTargetMultipleLoading ||
      isStrategyBalanceLoading ||
      isApyLoading ||
      isUserBalanceLoading,
    isFetched:
      isTargetMultipleFetched &&
      isStrategyBalanceFetched &&
      isApyFetched &&
      isUserBalanceFetched,
    data: {
      strategyName: strategyConfig.name,
      depositAsset: {
        name: strategyConfig.underlyingAsset.name,
        symbol: strategyConfig.underlyingAsset.symbol,
        logo: strategyConfig.underlyingAsset.logo,
      },
      targetMultiple: targetMultiple.targetMultiple,
      loopApy: apyData.apy,
      availableToDeposit: {
        tokenAmount: { ...userBalance.balance.tokenAmount, symbol: "" },
        dollarAmount: userBalance.balance.dollarAmount,
      },
      yourPosition: {
        tokenAmount: {
          ...strategyBalance.balance.tokenAmount,
          symbol: "",
        },
        dollarAmount: strategyBalance.balance.dollarAmount,
      },
    },
  };
};
