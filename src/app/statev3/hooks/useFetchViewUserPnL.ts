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

const DEPOSIT_EVENT = parseAbiItem(
  "event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares)"
);

const WITHDRAW_EVENT = parseAbiItem(
  "event Withdraw(address indexed sender,address indexed receiver,address indexed owner, uint256 assets, uint256 shares)"
);

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

  const [depositLogs, redeemLogs] = await Promise.all([
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
  ]);

  return [...depositLogs, ...redeemLogs].sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber));
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

  let [totalDepositedUsd, totalRedeemedUsd, tempShares, tempSharesAvgPrice] = [0n, 0n, 0n, 0n];

  for (const log of logs) {
    const { eventName, args, blockNumber } = log;
    const { assets, shares } = args;

    if (!assets || !shares) continue;

    const price = await fetchAssetPriceInBlock(config, underlyingAsset, blockNumber);

    if (!price) continue;

    if (eventName === "Deposit") {
      const depositAmountUsd = (assets * price) / underlyingAssetBase;
      totalDepositedUsd += depositAmountUsd;

      tempSharesAvgPrice =
        (tempShares * tempSharesAvgPrice + depositAmountUsd * underlyingAssetBase) / (tempShares + shares);
      tempShares += shares;
    } else if (eventName === "Withdraw") {
      totalRedeemedUsd += (assets * price) / underlyingAssetBase;
      tempShares -= shares;
    }
  }

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
