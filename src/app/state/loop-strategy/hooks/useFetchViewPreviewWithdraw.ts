import { Address, parseEther, parseUnits } from "viem";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import { ONE_ETHER, ONE_USD, walletBalanceDecimalsOptions } from "@meta";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable, useToken } from "@shared";
import { ViewPreviewWithdraw } from "../types/ViewPreviewWithdraw";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { useAccount } from "wagmi";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { useFetchSimulateWithdraw } from "../queries/useFetchSimulateWithdraw";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";

interface PreviewWithdraw {
  assetsToReceive: FetchBigInt;
  assetsToReceiveInUsd: FetchBigInt;
  costInUnderlyingAsset: FetchBigInt;
  costInUsd: FetchBigInt;
  simulationSlippage: FetchBigInt | undefined;
}

export const useFetchPreviewWithdraw = (
  strategyConfig: StrategyConfig,
  amount: string,
  slippage?: string
): FetchData<PreviewWithdraw> => {
  const account = useAccount();

  const {
    data: underlyingAsset,
    isLoading: isUnderlyingAssetLoading,
    isFetched: isUnderlyingAssetFetched,
  } = useFetchStrategyAsset(strategyConfig.address);

  const {
    data: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
    isLoading: isUnderlyingAssetDataLoading,
    isFetched: isUnderlyingAssetDataFetched,
  } = useToken(underlyingAsset);

  const {
    data: assets,
    isLoading: isSimulateWithdrawLoading,
    isFetched: isSimulateWithdrawFetched,
  } = useFetchSimulateWithdraw(account.address as Address, strategyConfig.address, amount);

  const {
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
    data: sharePrice,
  } = useFetchAssetPrice(strategyConfig.address);

  const {
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    data: underlyingAssetPrice,
  } = useFetchAssetPrice(underlyingAsset);

  let assetsToReceive;
  let assetsToReceiveInUsd;
  let costInUnderlyingAsset;
  let costInUsd;
  let simulationSlippage;
  if (assets && assets.bigIntValue && underlyingAssetPrice) {
    const withdrawAmountInUsd = (parseEther(amount) * sharePrice.bigIntValue) / ONE_ETHER;

    if (slippage && Number(slippage) >= 0) {
      assetsToReceiveInUsd =
        (parseEther(amount) * sharePrice.bigIntValue * (100n - BigInt(parseUnits(slippage, 0)))) / (ONE_ETHER * 100n);
      assetsToReceive = (assetsToReceiveInUsd * ONE_ETHER) / underlyingAssetPrice.bigIntValue;
    } else {
      assetsToReceive = (assets.bigIntValue * 99n) / 100n;
      assetsToReceiveInUsd = (assetsToReceive * underlyingAssetPrice.bigIntValue) / ONE_ETHER;
      simulationSlippage = ((withdrawAmountInUsd - assetsToReceiveInUsd) * ONE_USD) / withdrawAmountInUsd;
    }

    costInUsd = withdrawAmountInUsd - assetsToReceiveInUsd;
    costInUnderlyingAsset = (costInUsd * ONE_ETHER) / underlyingAssetPrice.bigIntValue;
  }

  return {
    isLoading:
      isAssetPriceLoading ||
      isUnderlyingAssetLoading ||
      isUnderlyingAssetDataLoading ||
      isShareValueLoading ||
      isSimulateWithdrawLoading,
    isFetched:
      isUnderlyingAssetDataFetched &&
      isUnderlyingAssetFetched &&
      isAssetPriceFetched &&
      isShareValueFetched &&
      isSimulateWithdrawFetched,
    data: {
      assetsToReceive: {
        bigIntValue: assetsToReceive || 0n,
        decimals: underlyingAssetDecimals,
        symbol: underlyingAssetSymbol,
      },
      assetsToReceiveInUsd: {
        bigIntValue: assetsToReceiveInUsd || 0n,
        decimals: 8,
        symbol: "$",
      },
      simulationSlippage: simulationSlippage
        ? {
            bigIntValue: simulationSlippage,
            decimals: 6,
            symbol: "%",
          }
        : undefined,
      costInUnderlyingAsset: {
        bigIntValue: costInUnderlyingAsset || 0n,
        decimals: underlyingAssetDecimals,
        symbol: strategyConfig.underlyingAsset.symbol,
      },
      costInUsd: {
        bigIntValue: costInUsd || 0n,
        decimals: 8,
        symbol: "$",
      },
    },
  };
};

export const useFetchViewPreviewWithdraw = (
  index: number,
  amount: string,
  slippage?: string
): Displayable<ViewPreviewWithdraw> => {
  const {
    isLoading,
    isFetched,
    data: { assetsToReceive, assetsToReceiveInUsd, costInUnderlyingAsset, costInUsd, simulationSlippage },
  } = useFetchPreviewWithdraw(ilmStrategies[index], amount, slippage);

  return {
    isLoading,
    isFetched,
    data: {
      assetsToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(assetsToReceive, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(assetsToReceiveInUsd, walletBalanceDecimalsOptions),
      },
      cost: {
        tokenAmount: formatFetchBigIntToViewBigInt(costInUnderlyingAsset, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(costInUsd, walletBalanceDecimalsOptions),
      },
      simulationSlippage: simulationSlippage ? formatFetchBigIntToViewBigInt(simulationSlippage) : undefined,
    },
  };
};
