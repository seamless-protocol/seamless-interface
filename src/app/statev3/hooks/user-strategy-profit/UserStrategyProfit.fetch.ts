import { Address, parseAbiItem } from "viem";
import { getPublicClient } from "wagmi/actions";
import { getExtensiveOperationsConfig } from "../../../utils/queryContractUtils";
import { Log, LogWithStrategyPrice, cUserStrategyProfit } from "./UserStrategyProfit.math";
import { fetchTokenData } from "../../metadata/TokenData.fetch";
import { FetchBigIntStrict, formatFetchBigInt, formatUsdValue } from "../../../../shared";
import { fetchAssetPriceInBlock } from "../../queries/AssetPrice.hook";

/// TYPES

interface AddStrategyPriceToLogsInput {
  strategy: Address;
  logs: Log[];
}

interface GetStrategyEventLogsForUserInput {
  user: Address;
  strategy: Address;
}

type FetchUserStrategyProfitInput = GetStrategyEventLogsForUserInput;

export interface FetchUserStrategyProfitOutput {
  strategyBalance: { tokenAmount: FetchBigIntStrict; dollarAmount: FetchBigIntStrict };
  realizedProfit: FetchBigIntStrict;
  unrealizedProfit: FetchBigIntStrict;
  unrealizedProfitPercentage: FetchBigIntStrict;
}

/// FETCH FUNCTIONS

const TRANSFER_EVENT = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)");

async function addStrategyPriceToLogs(input: AddStrategyPriceToLogsInput): Promise<LogWithStrategyPrice[]> {
  const { logs, strategy } = input;

  const logsWithStrategyPrice: LogWithStrategyPrice[] = [];

  await Promise.all(
    logs.map(async (log, index) => {
      if (!log.blockNumber) {
        throw new Error(`Invalid block number in log: ${log}`);
      }

      const strategyPrice = await fetchAssetPriceInBlock(strategy, log.blockNumber);

      logsWithStrategyPrice[index] = {
        log,
        strategyPrice: strategyPrice.bigIntValue,
      };
    })
  );

  return logsWithStrategyPrice;
}

export async function getStrategyEventLogsForUser(input: GetStrategyEventLogsForUserInput): Promise<Log[]> {
  const { strategy, user } = input;

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
  }) as Log[];
}

export async function fetchUserStrategyProfit(
  input: FetchUserStrategyProfitInput
): Promise<FetchUserStrategyProfitOutput> {
  const { strategy, user } = input;

  const [logs, { decimals: strategyDecimals, symbol: strategySymbol }] = await Promise.all([
    getStrategyEventLogsForUser({ strategy, user }),
    fetchTokenData(strategy),
  ]);

  const [logsWithStrategyPrice, currStrategyPrice] = await Promise.all([
    addStrategyPriceToLogs({ strategy, logs }),
    fetchAssetPriceInBlock(strategy),
  ]);

  const { strategyBalance, strategyBalanceUsd, realizedProfit, unrealizedProfit, unrealizedProfitPercentage } =
    cUserStrategyProfit({
      logs: logsWithStrategyPrice,
      user,
      currStrategyPrice: currStrategyPrice.bigIntValue,
      strategyDecimals,
    });

  return {
    strategyBalance: {
      tokenAmount: formatFetchBigInt(strategyBalance, strategyDecimals, strategySymbol),
      dollarAmount: formatUsdValue(strategyBalanceUsd),
    },
    realizedProfit: formatUsdValue(realizedProfit),
    unrealizedProfit: formatUsdValue(unrealizedProfit),
    unrealizedProfitPercentage: formatFetchBigInt(unrealizedProfitPercentage, 2, "%"),
  };
}
