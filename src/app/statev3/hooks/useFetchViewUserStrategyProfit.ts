import { useQuery } from "@tanstack/react-query";
import { Address, parseAbiItem } from "viem";
import { fetchAssetPriceInBlock } from "../../state/common/queries/useFetchViewAssetPrice";
import { Config, useConfig } from "wagmi";
import {
  Displayable,
  FetchBigInt,
  ViewBigInt,
  fUsdValueStructured,
  formatFetchBigIntToViewBigInt,
} from "../../../shared";
import { getPublicClient } from "wagmi/actions";
import { fetchTokenData } from "../metadata/useFetchTokenData";

const TRANSFER_EVENT = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)");

interface GetStrategyEventLogsForUserInput {
  config: Config;
  user: Address;
  strategy: Address;
}

export async function getStrategyEventLogsForUser({ config, strategy, user }: GetStrategyEventLogsForUserInput) {
  const publicClient = getPublicClient(config);

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
    }),
    publicClient.getLogs({
      address: strategy,
      event: TRANSFER_EVENT,
      args: {
        to: user,
      },
      fromBlock: 0n,
    }),
  ]);

  return [...transferFromLogs, ...transferToLogs].sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber));
}

interface UserStrategyProfit {
  totalProfit: FetchBigInt | undefined;
  unrealizedProfit: FetchBigInt | undefined;
}

type FetchUserStrategyProfitInput = GetStrategyEventLogsForUserInput;

export async function fetchUserStrategyProfit({
  config,
  user,
  strategy,
}: FetchUserStrategyProfitInput): Promise<UserStrategyProfit> {
  const [logs, { decimals: strategyDecimals }] = await Promise.all([
    getStrategyEventLogsForUser({ config, strategy, user }),
    fetchTokenData(config, strategy),
  ]);

  const strategyBase = 10n ** BigInt(strategyDecimals);

  const results = [] as { transferValueUsd: bigint; shareBalanceChange: bigint }[];

  await Promise.all(
    logs.map(async (log, index) => {
      const { args, blockNumber } = log;
      const { from, value: shares } = args;

      if (!from || !shares) {
        return;
      }

      const price = await fetchAssetPriceInBlock(config, strategy, blockNumber);
      if (!price) {
        return;
      }

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

  const { totalInvestedUsd, currShares, currSharesAvgPrice } = results.filter(Boolean).reduce(
    (acc, { transferValueUsd, shareBalanceChange }) => {
      let { currSharesAvgPrice } = acc;
      const { totalInvestedUsd, currShares } = acc;

      if (shareBalanceChange > 0n) {
        currSharesAvgPrice =
          (currShares * currSharesAvgPrice + transferValueUsd * strategyBase) / (currShares + shareBalanceChange);
      }

      return {
        totalInvestedUsd: totalInvestedUsd + transferValueUsd,
        currSharesAvgPrice,
        currShares: currShares + shareBalanceChange,
      };
    },
    {
      totalInvestedUsd: 0n,
      currSharesAvgPrice: 0n,
      currShares: 0n,
    }
  );

  const price = await fetchAssetPriceInBlock(config, strategy);
  if (!price) {
    throw new Error("Strategy price not found");
  }

  const currSharesUsd = (currShares * price) / strategyBase;

  const totalProfit = currSharesUsd - totalInvestedUsd;
  const unrealizedProfit = currSharesUsd - (currShares * currSharesAvgPrice) / strategyBase;

  return {
    totalProfit: fUsdValueStructured(totalProfit),
    unrealizedProfit: fUsdValueStructured(unrealizedProfit),
  };
}

interface UseFetchUserStrategyProfitInput {
  user: Address | undefined;
  strategy: Address | undefined;
}

interface ViewUserStrategyProfit {
  totalProfit: ViewBigInt;
  unrealizedProfit: ViewBigInt;
}

export const useFetchUserStrategyProfit = ({ user, strategy }: UseFetchUserStrategyProfitInput) => {
  const config = useConfig();

  return useQuery({
    queryKey: ["fetchUserStrategyProfit", user, strategy],
    queryFn: () => fetchUserStrategyProfit({ config, user: user!, strategy: strategy! }),
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
    },
  };
};
