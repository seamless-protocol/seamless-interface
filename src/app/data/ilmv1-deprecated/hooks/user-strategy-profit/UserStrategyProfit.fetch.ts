import { Address, parseAbiItem } from "viem";
import { getPublicClient } from "wagmi/actions";
import { getExtensiveOperationsConfig } from "../../../../utils/queryContractUtils";
import { TransfersWithStrategyPrice, cUserStrategyProfit } from "./UserStrategyProfit.math";
import { FetchBigIntStrict, fetchToken, formatFetchBigInt, formatUsdValue } from "../../../../../shared";
import { fetchAssetPriceInBlock } from "../../../common/queries/AssetPrice.hook";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { heavyDataQueryConfig } from "../../../settings/queryConfig";

/// TYPES
interface Log {
  args: { from: Address | undefined; to: Address | undefined; value: bigint | undefined };
  blockNumber: bigint;
}

interface GetTransferEventsInput {
  token: Address;
  from: Address | undefined;
  to: Address | undefined;
}

interface AddStrategyPriceToLogsInput {
  address: Address;
  logs: Log[];
}

interface GetStrategyEventLogsForUserInput {
  user: Address;
  address: Address;
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

async function getTransferEvents(input: GetTransferEventsInput) {
  const { token, from, to } = input;

  const publicClient = getPublicClient(getExtensiveOperationsConfig());

  if (!publicClient) {
    throw new Error("Public client not found");
  }

  const logs = await publicClient.getLogs({
    address: token,
    event: TRANSFER_EVENT,
    args: {
      from,
      to,
    },
    fromBlock: 0n,
    toBlock: "latest",
  });

  return logs;
}

async function addStrategyPriceAndParseLogs(input: AddStrategyPriceToLogsInput): Promise<TransfersWithStrategyPrice[]> {
  const { logs, address: strategy } = input;

  const transfers: TransfersWithStrategyPrice[] = [];

  await Promise.all(
    logs.map(async (log, index) => {
      if (!log.blockNumber) {
        throw new Error(`Invalid block number in log: ${log}`);
      }

      if (!log.args.from || !log.args.to || !log.args.value) {
        throw new Error(`Invalid log ${log}`);
      }

      const strategyPrice = await fetchAssetPriceInBlock(strategy, log.blockNumber);

      transfers[index] = {
        from: log.args.from,
        to: log.args.to,
        value: log.args.value,
        strategyPrice: strategyPrice.bigIntValue,
      };
    })
  );

  return transfers;
}

export async function getStrategyEventLogsForUser(input: GetStrategyEventLogsForUserInput): Promise<Log[]> {
  const { address: strategy, user } = input;
  const queryClient = getQueryClient();

  const [transferFromLogs, transferToLogs] = await Promise.all([
    queryClient.fetchQuery({
      queryFn: () =>
        getTransferEvents({
          token: strategy,
          from: user,
          to: undefined,
        }),
      queryKey: ["getStrategyEventLogsFromUser", strategy, user],
      ...heavyDataQueryConfig,
    }),

    queryClient.fetchQuery({
      queryFn: () =>
        getTransferEvents({
          token: strategy,
          from: undefined,
          to: user,
        }),
      queryKey: ["getStrategyEventLogsToUser", strategy, user],
      ...heavyDataQueryConfig,
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
  const { address, user } = input;

  const [logs, { decimals: strategyDecimals, symbol: strategySymbol }] = await Promise.all([
    getStrategyEventLogsForUser({ address, user }),
    fetchToken(address),
  ]);

  const [transferWithStrategyPrice, currStrategyPrice] = await Promise.all([
    addStrategyPriceAndParseLogs({ address, logs }),
    fetchAssetPriceInBlock(address),
  ]);

  const { strategyBalance, strategyBalanceUsd, realizedProfit, unrealizedProfit, unrealizedProfitPercentage } =
    cUserStrategyProfit({
      transfers: transferWithStrategyPrice,
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
