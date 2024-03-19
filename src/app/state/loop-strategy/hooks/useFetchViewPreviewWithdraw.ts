import { parseEther } from "viem";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import {
  ONE_ETHER,
  walletBalanceDecimalsOptions,
} from "../../../meta/constants";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewPreviewWithdraw } from "../types/ViewPreviewWithdraw";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { simulateWithdraw } from "../../../../shared/utils/tenderlyBundles";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

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
  const [assets, setAssets] = useState(0n);

  useEffect(() => {
    if (!account.address) return;

    simulateWithdraw(account.address, amount, strategyConfig).then((result) => {
      result.isSuccess && setAssets(result.assetsToReceive);
    });
  }, [amount]);

  const {
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
    data: sharePrice,
  } = useFetchAssetPrice(strategyConfig.address);

  const {
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    data: underlyingAssetPrice,
  } = useFetchAssetPrice(strategyConfig.underlyingAsset.address);

  let assetsToReceive; let assetsToReceiveInUsd; let costInUnderlyingAsset; let costInUsd;
  if (assets && underlyingAssetPrice) {
    assetsToReceive = (assets * 99n) / 100n;
    assetsToReceiveInUsd =
      (assetsToReceive * underlyingAssetPrice.bigIntValue) / ONE_ETHER;

    const withdrawAmountInUsd =
      (parseEther(amount) * sharePrice.bigIntValue) / ONE_ETHER;

    costInUsd = withdrawAmountInUsd - assetsToReceiveInUsd;
    costInUnderlyingAsset =
      (costInUsd * ONE_ETHER) / underlyingAssetPrice.bigIntValue;
  }

  return {
    isLoading: isAssetPriceLoading || isShareValueLoading,
    isFetched: isAssetPriceFetched && isShareValueFetched,
    data: {
      assetsToReceive: {
        bigIntValue: assetsToReceive || 0n,
        decimals: 18,
        symbol: strategyConfig.underlyingAsset.symbol,
      },
      assetsToReceiveInUsd: {
        bigIntValue: assetsToReceiveInUsd || 0n,
        decimals: 8,
        symbol: "$",
      },
      costInUnderlyingAsset: {
        bigIntValue: costInUnderlyingAsset || 0n,
        decimals: 18,
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
