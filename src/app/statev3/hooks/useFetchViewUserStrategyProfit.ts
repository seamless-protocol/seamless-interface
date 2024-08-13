import { useQuery } from "@tanstack/react-query";
import { Address, parseAbiItem } from "viem";
import { fetchAssetPriceInBlock } from "../../state/common/queries/useFetchViewAssetPrice";
import { Config, useConfig } from "wagmi";
import { fetchDetailAssetBalance } from "./useFetchViewDetailAssetBalance";
import {
  Displayable,
  FetchBigInt,
  ViewBigInt,
  fUsdValueStructured,
  formatFetchBigIntToViewBigInt,
} from "../../../shared";
import { getPublicClient } from "wagmi/actions";
import { getStrategyBySubStrategyAddress } from "../../state/settings/configUtils";
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
  const underlyingAsset = getStrategyBySubStrategyAddress(strategy)?.underlyingAsset?.address;

  if (!underlyingAsset) {
    throw new Error("Underlying asset not found");
  }

  const [logs, { decimals: underlyingAssetDecimals }] = await Promise.all([
    getStrategyEventLogsForUser({ config, strategy, user }),
    fetchTokenData(config, underlyingAsset),
  ]);

  const underlyingAssetBase = 10n ** BigInt(underlyingAssetDecimals);

  const { totalDepositedUsd, totalRedeemedUsd, tempShares, tempSharesAvgPrice } = await logs.reduce(
    async (accPromise, log) => {
      const acc = await accPromise;
      const { args, blockNumber } = log;
      const { from, value: shares } = args;

      if (!from || !shares) {
        return acc;
      }

      const price = await fetchAssetPriceInBlock(config, strategy, blockNumber);
      if (!price) {
        return acc;
      }

      const transferValueUsd = (shares * price) / underlyingAssetBase;

      if (from === user) {
        acc.totalRedeemedUsd += transferValueUsd;
        acc.tempShares -= shares;
      } else {
        acc.totalDepositedUsd += transferValueUsd;
        acc.tempSharesAvgPrice =
          (acc.tempShares * acc.tempSharesAvgPrice + transferValueUsd * underlyingAssetBase) /
          (acc.tempShares + shares);
        acc.tempShares += shares;
      }

      return acc;
    },
    Promise.resolve({
      totalDepositedUsd: 0n,
      totalRedeemedUsd: 0n,
      tempShares: 0n,
      tempSharesAvgPrice: 0n,
    })
  );

  const { dollarAmount: currHoldingUsd } = await fetchDetailAssetBalance({ config, asset: strategy, account: user });

  if (!currHoldingUsd || currHoldingUsd.bigIntValue === undefined) {
    return {
      totalProfit: undefined,
      unrealizedProfit: undefined,
    };
  }

  const totalProfit = currHoldingUsd.bigIntValue - totalDepositedUsd + totalRedeemedUsd;
  const unrealizedProfit = currHoldingUsd.bigIntValue - (tempShares * tempSharesAvgPrice) / underlyingAssetBase;

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
