import { useQuery } from "@tanstack/react-query";
import { Address, parseAbiItem, zeroAddress } from "viem";
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

const DEPOSIT_EVENT = parseAbiItem(
  "event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares)"
);

const WITHDRAW_EVENT = parseAbiItem(
  "event Withdraw(address indexed sender,address indexed receiver,address indexed owner, uint256 assets, uint256 shares)"
);

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

  const [depositLogs, redeemLogs, transferFromLogs, transferToLogs] = await Promise.all([
    publicClient.getLogs({
      address: strategy,
      event: DEPOSIT_EVENT,
      args: {
        owner: user,
      },
      fromBlock: 0n,
    }),
    publicClient.getLogs({
      address: strategy,
      event: WITHDRAW_EVENT,
      args: {
        sender: user,
      },
      fromBlock: 0n,
    }),
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

  const filteredTransferLogs = [
    ...transferFromLogs.filter((log) => log.args.from != zeroAddress && log.args.to != zeroAddress),
    ...transferToLogs.filter((log) => log.args.from != zeroAddress && log.args.to != zeroAddress),
  ];

  return [...depositLogs, ...redeemLogs, ...filteredTransferLogs].sort(
    (a, b) => Number(a.blockNumber) - Number(b.blockNumber)
  );
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
      const { eventName, args, blockNumber } = log;

      const price = await fetchAssetPriceInBlock(config, underlyingAsset, blockNumber);
      if (!price) {
        return acc;
      }

      switch (eventName) {
        case "Deposit":
          const { assets, shares } = args as { assets: bigint; shares: bigint };
          const depositAmountUsd = (assets * price) / underlyingAssetBase;
          acc.totalDepositedUsd += depositAmountUsd;
          acc.tempSharesAvgPrice =
            (acc.tempShares * acc.tempSharesAvgPrice + depositAmountUsd * underlyingAssetBase) /
            (acc.tempShares + shares);
          acc.tempShares += shares;
          break;
        case "Withdraw":
          const { assets: withdrawAssets } = args as { assets: bigint };
          const redeemedAmountUsd = (withdrawAssets * price) / underlyingAssetBase;
          acc.totalRedeemedUsd += redeemedAmountUsd;
          acc.tempShares -= withdrawAssets;
          break;
        case "Transfer":
          const { from, value } = args as { from: Address; to: Address; value: bigint };
          const transferValue = (value * price) / underlyingAssetBase;

          if (from === user) {
            acc.totalRedeemedUsd += transferValue;
            acc.tempShares -= value;
          } else {
            acc.tempSharesAvgPrice =
              (acc.tempShares * acc.tempSharesAvgPrice + transferValue * underlyingAssetBase) /
              (acc.tempShares + value);
            acc.tempShares += value;
          }
          break;
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
