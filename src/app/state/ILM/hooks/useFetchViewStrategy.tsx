import { UseAccountReturnType, useAccount, useReadContracts } from "wagmi";
import {
  aaveOracleAbi,
  aaveOracleAddress,
  loopStrategyAbi,
} from "../../../generated/generated";
import {
  convertRatioToMultiple,
  formatToViewBigInt,
} from "../../../../shared/utils/helpers";
import { ONE_ETHER } from "../../../meta/constants";
import { Address, erc20Abi } from "viem";
import { ilmStrategies } from "../../loop-strategy/config/StrategyConfig";
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
  strategyAddress: Address,
  underlyingAssetAddress: Address,
  account: UseAccountReturnType
): Fetch<StrategyInfoForAccount> {
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
        address: underlyingAssetAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account.address as Address],
      },
      {
        address: aaveOracleAddress,
        abi: aaveOracleAbi,
        functionName: "getAssetPrice",
        args: [underlyingAssetAddress],
      },
    ],
  });

  if (results) {
    const collateralRatioTargets = results[0].result;
    const targetRatio = BigInt(collateralRatioTargets?.target || 0);
    targetMultiple = convertRatioToMultiple(targetRatio);

    const userShares = BigInt(results[1].result || 0);
    const totalShares = BigInt(results[2].result || 0);

    const equity = BigInt(results[3].result || 0);
    const equityUSD = BigInt(results[4].result || 0);

    userEquity = totalShares ? (equity * userShares) / totalShares : 0n;
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
      symbol: "",
    },
    userEquityUSD: {
      bigIntValue: userEquityUSD || 0n,
      decimals: 8,
      symbol: "$",
    },
    userBalance: {
      bigIntValue: userBalance || 0n,
      decimals: 18,
      symbol: "",
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

  const account = useAccount();
  const {
    isLoading: isStrategyInfoLoading,
    isFetched: isStrategyInfoFetched,
    targetMultiple,
    userEquity,
    userEquityUSD,
    userBalance,
    userBalanceUSD,
  } = useFetchStrategyInfoForAccount(
    strategyConfig.address,
    strategyConfig.underlyingAsset.address,
    account
  );

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
      targetMultiple: formatToViewBigInt(targetMultiple),
      loopApy: data.apy,
      availableToDeposit: {
        tokenAmount: formatToViewBigInt(userBalance),
        dollarAmount: formatToViewBigInt(userBalanceUSD),
      },
      yourPosition: {
        tokenAmount: formatToViewBigInt(userEquity),
        dollarAmount: formatToViewBigInt(userEquityUSD),
      },
    },
  };
};
