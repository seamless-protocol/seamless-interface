import { Address, parseEther, parseUnits } from "viem";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import { ONE_ETHER, ONE_USD, walletBalanceDecimalsOptions } from "@meta";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewPreviewDeposit } from "../types/ViewPreviewDeposit";
import { Displayable, useToken } from "@shared";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { useAccount } from "wagmi";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { useFetchSimulateDeposit } from "../queries/useFetchSimulateDeposit";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";

interface PreviewDeposit {
  sharesToReceive: FetchBigInt;
  sharesToReceiveInUsd: FetchBigInt;
  costInUnderlyingAsset: FetchBigInt;
  costInUsd: FetchBigInt;
  simulationSlippage: FetchBigInt | undefined;
}

export const useFetchPreviewDeposit = (
  strategyConfig: StrategyConfig,
  amount: string,
  slippage?: string
): FetchData<PreviewDeposit> => {
  const account = useAccount();

  const {
    isLoading: isStrategyAssetLoading,
    isFetched: isStrategyAssetFetched,
    data: underlyingAsset,
  } = useFetchStrategyAsset(strategyConfig.address);

  const {
    isLoading: isUnderlyingAssetDataLoading,
    isFetched: isUnderlyingAssetDataFetched,
    data: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
  } = useToken(underlyingAsset);

  const {
    isLoading: isStrategyAssetDataLoading,
    isFetched: isStrategyAssetDataFetched,
    data: { symbol: strategySymbol, decimals: strategyDecimals },
  } = useToken(strategyConfig.address);

  const {
    data: shares,
    isLoading: isSimulateDepositLoading,
    isFetched: isSimulateDepositFetched,
  } = useFetchSimulateDeposit(account.address as Address, strategyConfig.address, amount);

  const {
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
    data: sharePrice,
  } = useFetchAssetPrice(strategyConfig.address);

  const {
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    data: assetPrice,
  } = useFetchAssetPrice(underlyingAsset);

  let sharesToReceive, sharesToReceiveInUsd, costInUnderlyingAsset, costInUsd, simulationSlippage;
  if (shares && shares.bigIntValue && sharePrice && assetPrice) {
    const depositValueInUsd = (parseEther(amount) * assetPrice.bigIntValue) / ONE_ETHER;

    if (slippage && Number(slippage) >= 0) {
      sharesToReceiveInUsd =
        (parseEther(amount) * assetPrice.bigIntValue * (100n - BigInt(parseUnits(slippage, 0)))) / (ONE_ETHER * 100n);
      sharesToReceive = (sharesToReceiveInUsd * ONE_ETHER) / sharePrice.bigIntValue;
    } else {
      sharesToReceive = (shares.bigIntValue * 99n) / 100n;
      sharesToReceiveInUsd = (sharesToReceive * sharePrice.bigIntValue) / ONE_ETHER;
      simulationSlippage = ((depositValueInUsd - sharesToReceiveInUsd) * ONE_USD) / depositValueInUsd;
    }

    costInUsd = depositValueInUsd - sharesToReceiveInUsd;
    costInUnderlyingAsset = (costInUsd * ONE_ETHER) / assetPrice.bigIntValue;
  }

  return {
    isLoading:
      isStrategyAssetLoading ||
      isUnderlyingAssetDataLoading ||
      isStrategyAssetDataLoading ||
      isShareValueLoading ||
      isAssetPriceLoading ||
      isSimulateDepositLoading,
    isFetched:
      isStrategyAssetFetched &&
      isUnderlyingAssetDataFetched &&
      isStrategyAssetDataFetched &&
      isShareValueFetched &&
      isAssetPriceFetched &&
      isSimulateDepositFetched,
    data: {
      sharesToReceive: {
        bigIntValue: sharesToReceive || 0n,
        decimals: strategyDecimals,
        symbol: strategySymbol,
      },
      sharesToReceiveInUsd: {
        bigIntValue: sharesToReceiveInUsd || 0n,
        decimals: 8,
        symbol: "$",
      },
      simulationSlippage: simulationSlippage
        ? {
            bigIntValue: simulationSlippage,
            decimals: 6, // 6 decimal places for percentage
            symbol: "%",
          }
        : undefined,
      costInUnderlyingAsset: {
        bigIntValue: costInUnderlyingAsset || 0n,
        decimals: underlyingAssetDecimals,
        symbol: underlyingAssetSymbol,
      },
      costInUsd: {
        bigIntValue: costInUsd || 0n,
        decimals: 8,
        symbol: "$",
      },
    },
  };
};

export const useFetchViewPreviewDeposit = (
  id: number,
  amount: string,
  slippage: string
): Displayable<ViewPreviewDeposit> => {
  const {
    isLoading,
    isFetched,
    data: { sharesToReceive, sharesToReceiveInUsd, costInUnderlyingAsset, costInUsd, simulationSlippage },
  } = useFetchPreviewDeposit(ilmStrategies[id], amount, slippage);

  return {
    isLoading,
    isFetched,
    data: {
      sharesToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(sharesToReceive, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(sharesToReceiveInUsd, walletBalanceDecimalsOptions),
      },
      cost: {
        tokenAmount: formatFetchBigIntToViewBigInt(costInUnderlyingAsset, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(costInUsd, walletBalanceDecimalsOptions),
      },
      simulationSlippage: simulationSlippage ? formatFetchBigIntToViewBigInt(simulationSlippage) : undefined,
    },
  };
};
