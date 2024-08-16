import { useQuery } from "@tanstack/react-query";
import { Address, parseAbiItem } from "viem";
import {
  Displayable,
  FetchBigInt,
  ViewBigInt,
  fFetchBigIntStructured,
  fUsdValueStructured,
  formatFetchBigIntToViewBigInt,
} from "../../../shared";
import { getPublicClient } from "wagmi/actions";
import { fetchTokenData } from "../metadata/useFetchTokenData";
import { fetchAssetPriceInBlock } from "../queries/useFetchViewAssetPrice";
import { getExtensiveOperationsConfig } from "../../utils/queryContractUtils";

const TRANSFER_EVENT = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)");

interface GetStrategyEventLogsForUserInput {
  user: Address;
  strategy: Address;
}

export async function getStrategyEventLogsForUser({ strategy, user }: GetStrategyEventLogsForUserInput) {
  const publicClient = getPublicClient(getExtensiveOperationsConfig());

  if (!publicClient) {
    throw new Error("Public client not found");
  }

  const [transferFromLogs, transferToLogs] = await Promise.all([
    publicClient.getLogs({
      address: strategy,
      event: TRANSFER_EVENT,
      args: {
        from: user,
      },
      fromBlock: 0n,
      toBlock: "latest",
    }),
    publicClient.getLogs({
      address: strategy,
      event: TRANSFER_EVENT,
      args: {
        to: user,
      },
      fromBlock: 0n,
      toBlock: "latest",
    }),
  ]);

  return [...transferFromLogs, ...transferToLogs].sort((a, b) => {
    const blockNumberComparison = Number(a.blockNumber) - Number(b.blockNumber);

    if (blockNumberComparison !== 0) {
      return blockNumberComparison;
    }

    // If block numbers are the same, sort by logIndex
    return Number(a.logIndex) - Number(b.logIndex);
  });
}

interface UserStrategyProfit {
  totalProfit: FetchBigInt | undefined;
  unrealizedProfit: FetchBigInt | undefined;
  unrealizedProfitPercentage: FetchBigInt | undefined;
}

type FetchUserStrategyProfitInput = GetStrategyEventLogsForUserInput;

export async function fetchUserStrategyProfit({
  user,
  strategy,
}: FetchUserStrategyProfitInput): Promise<UserStrategyProfit> {
  const [logs, { decimals: strategyDecimals }] = await Promise.all([
    getStrategyEventLogsForUser({ strategy, user }),
    fetchTokenData(strategy),
  ]);

  const strategyBase = 10n ** BigInt(strategyDecimals);

  const results = [] as { transferValueUsd: bigint; shareBalanceChange: bigint }[];

  await Promise.all(
    logs.map(async (log, index) => {
      const { args, blockNumber } = log;
      const { from, value: shares } = args as { from: Address | undefined; value: bigint | undefined };

      if (!from || !shares) {
        console.error("Invalid log", log);
        throw new Error("Invalid log");
      }

      const price = await fetchAssetPriceInBlock(strategy, blockNumber);

      const transferValueUsd = (shares * price) / strategyBase;

      if (from === user) {
        results[index] = {
          transferValueUsd: -transferValueUsd,
          shareBalanceChange: -shares,
        };
      } else {
        results[index] = {
          transferValueUsd,
          shareBalanceChange: shares,
        };
      }
    })
  );

  const { currTotalProfit, currShares, currSharesAvgPrice } = results.filter(Boolean).reduce(
    (acc, { transferValueUsd, shareBalanceChange }) => {
      let { currSharesAvgPrice } = acc;
      const { currTotalProfit, currShares } = acc;

      if (shareBalanceChange > 0n) {
        currSharesAvgPrice =
          (currShares * currSharesAvgPrice + transferValueUsd * strategyBase) / (currShares + shareBalanceChange);
      }

      return {
        currTotalProfit: currTotalProfit - transferValueUsd,
        currSharesAvgPrice,
        currShares: currShares + shareBalanceChange,
      };
    },
    {
      currTotalProfit: 0n,
      currSharesAvgPrice: 0n,
      currShares: 0n,
    }
  );

  const price = await fetchAssetPriceInBlock(strategy);
  const currSharesUsd = (currShares * price) / strategyBase;

  const totalProfit = currSharesUsd + currTotalProfit;
  const unrealizedProfit = currSharesUsd - (currShares * currSharesAvgPrice) / strategyBase;
  const unrealizedProfitPercentage = currSharesUsd
    ? (unrealizedProfit * 10000n) / (currSharesUsd - unrealizedProfit)
    : 0n;

  return {
    totalProfit: fUsdValueStructured(totalProfit),
    unrealizedProfit: fUsdValueStructured(unrealizedProfit),
    unrealizedProfitPercentage: fFetchBigIntStructured(unrealizedProfitPercentage, 2, "%"),
  };
}

interface UseFetchUserStrategyProfitInput {
  user: Address | undefined;
  strategy: Address | undefined;
}

interface ViewUserStrategyProfit {
  totalProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
  unrealizedProfitPercentage: ViewBigInt;
}

export const useFetchUserStrategyProfit = ({ user, strategy }: UseFetchUserStrategyProfitInput) => {
  return useQuery({
    queryKey: ["fetchUserStrategyProfit", user, strategy],
    queryFn: () => fetchUserStrategyProfit({ user: user!, strategy: strategy! }),
    enabled: !!user && !!strategy,
  });
};

export const useFetchViewUserStrategyProfit = (
  input: UseFetchUserStrategyProfitInput
): Displayable<ViewUserStrategyProfit> => {
  const { data, ...rest } = useFetchUserStrategyProfit(input);

  return {
    ...rest,
    data: {
      totalProfit: formatFetchBigIntToViewBigInt(data?.totalProfit),
      unrealizedProfit: formatFetchBigIntToViewBigInt(data?.unrealizedProfit),
      unrealizedProfitPercentage: formatFetchBigIntToViewBigInt(data?.unrealizedProfitPercentage),
    },
  };
};
