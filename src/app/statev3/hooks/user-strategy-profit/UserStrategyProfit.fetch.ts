import { Address, parseAbiItem } from "viem";
import { getPublicClient } from "wagmi/actions";
import { getExtensiveOperationsConfig } from "../../../utils/queryContractUtils";
import { calculateUserStrategyProfit } from "./UserStrategyProfit.math";
import { fetchTokenData } from "../../metadata/useFetchTokenData";
import { FetchBigIntStrict, formatFetchBigInt, formatUsdValue } from "../../../../shared";

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

type FetchUserStrategyProfitInput = GetStrategyEventLogsForUserInput;

export interface FetchUserStrategyProfitOutput {
  totalProfit: FetchBigIntStrict;
  unrealizedProfit: FetchBigIntStrict;
  unrealizedProfitPercentage: FetchBigIntStrict;
}

export async function fetchUserStrategyProfit({
  strategy,
  user,
}: FetchUserStrategyProfitInput): Promise<FetchUserStrategyProfitOutput> {
  const [userActions, { decimals: strategyDecimals }] = await Promise.all([
    getStrategyEventLogsForUser({ strategy, user }),
    fetchTokenData(strategy),
  ]);

  const { totalProfit, unrealizedProfit, unrealizedProfitPercentage } = await calculateUserStrategyProfit({
    logs: userActions,
    user,
    strategy,
    strategyDecimals,
  });

  return {
    totalProfit: formatUsdValue(totalProfit),
    unrealizedProfit: formatUsdValue(unrealizedProfit),
    unrealizedProfitPercentage: formatFetchBigInt(unrealizedProfitPercentage, 2, "%"),
  };
}
