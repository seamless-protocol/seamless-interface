import { Address, parseEther } from "viem";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import {
  ONE_ETHER,
  walletBalanceDecimalsOptions,
} from "../../../meta/constants";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewPreviewWithdraw } from "../types/ViewPreviewWithdraw";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { useAccount } from "wagmi";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { useFetchSimulateWithdraw } from "../queries/useFetchSimulateWithdraw";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { useToken } from "@shared";

interface PreviewWithdraw {
  assetsToReceive: FetchBigInt;
  assetsToReceiveInUsd: FetchBigInt;
  costInUnderlyingAsset: FetchBigInt;
  costInUsd: FetchBigInt;
}

export const useFetchPreviewWithdraw = (
  strategyConfig: StrategyConfig,
  amount: string
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
  } = useFetchSimulateWithdraw(
    account.address as Address,
    strategyConfig.address,
    amount
  );

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

  let assetsToReceive, assetsToReceiveInUsd, costInUnderlyingAsset, costInUsd;
  if (assets && assets.bigIntValue && underlyingAssetPrice) {
    assetsToReceive = (assets.bigIntValue * 99n) / 100n;
    assetsToReceiveInUsd =
      (assetsToReceive * underlyingAssetPrice.bigIntValue) / ONE_ETHER;

    const withdrawAmountInUsd =
      (parseEther(amount) * sharePrice.bigIntValue) / ONE_ETHER;

    costInUsd = withdrawAmountInUsd - assetsToReceiveInUsd;
    costInUnderlyingAsset =
      (costInUsd * ONE_ETHER) / underlyingAssetPrice.bigIntValue;
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
  amount: string
): Displayable<ViewPreviewWithdraw> => {
  const {
    isLoading,
    isFetched,
    data: {
      assetsToReceive,
      assetsToReceiveInUsd,
      costInUnderlyingAsset,
      costInUsd,
    },
  } = useFetchPreviewWithdraw(ilmStrategies[index], amount);

  return {
    isLoading,
    isFetched,
    data: {
      assetsToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(
          assetsToReceive,
          walletBalanceDecimalsOptions
        ),
        dollarAmount: formatFetchBigIntToViewBigInt(
          assetsToReceiveInUsd,
          walletBalanceDecimalsOptions
        ),
      },
      cost: {
        tokenAmount: formatFetchBigIntToViewBigInt(
          costInUnderlyingAsset,
          walletBalanceDecimalsOptions
        ),
        dollarAmount: formatFetchBigIntToViewBigInt(
          costInUsd,
          walletBalanceDecimalsOptions
        ),
      },
    },
  };
};
