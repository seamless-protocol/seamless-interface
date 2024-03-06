import { parseEther } from "viem";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import {
  ONE_ETHER,
  walletBalanceDecimalsOptions,
} from "../../../meta/constants";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewPreviewDeposit } from "../types/ViewPreviewDeposit";
import { Displayable } from "../../../../shared";
import { Fetch, FetchBigInt } from "src/shared/types/Fetch";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { simulateDeposit } from "../../../../shared/utils/tenderlyBundles";
import { useFetchAssetPrice } from "../../common/hooks/useFetchViewAssetPrice";

interface PreviewDeposit {
  sharesToReceive: FetchBigInt;
  sharesToReceiveInUsd: FetchBigInt;
  costInUnderlyingAsset: FetchBigInt;
  costInUsd: FetchBigInt;
}

export const useFetchPreviewDeposit = (
  strategyConfig: StrategyConfig,
  amount: string
): Fetch<PreviewDeposit> => {
  const account = useAccount();
  const [shares, setShares] = useState(0n);

  useEffect(() => {
    if (!account.address) return;

    simulateDeposit(account.address, amount, strategyConfig).then((result) => {
      result.isSuccess && setShares(result.sharesToReceive);
    });
  }, [amount]);

  const {
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
    price: sharePrice,
  } = useFetchAssetPrice(strategyConfig.address);

  const {
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    price: assetPrice,
  } = useFetchAssetPrice(strategyConfig.underlyingAsset.address);

  let sharesToReceive, sharesToReceiveInUsd, costInUnderlyingAsset, costInUsd;
  if (shares && sharePrice && assetPrice) {
    sharesToReceive = (shares * 99n) / 100n;
    sharesToReceiveInUsd =
      (sharesToReceive * sharePrice.bigIntValue) / ONE_ETHER;

    const depositValueInUsd =
      (parseEther(amount) * assetPrice.bigIntValue) / ONE_ETHER;

    costInUsd = depositValueInUsd - sharesToReceiveInUsd;
    costInUnderlyingAsset = (costInUsd * ONE_ETHER) / assetPrice.bigIntValue;
  }

  return {
    isLoading: isShareValueLoading || isAssetPriceLoading,
    isFetched: isShareValueFetched && isAssetPriceFetched,
    sharesToReceive: {
      bigIntValue: sharesToReceive || 0n,
      decimals: 18,
      symbol: strategyConfig.symbol,
    },
    sharesToReceiveInUsd: {
      bigIntValue: sharesToReceiveInUsd || 0n,
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
  };
};

export const useFetchViewPreviewDeposit = (
  id: number,
  amount: string
): Displayable<ViewPreviewDeposit> => {
  const {
    isLoading,
    isFetched,
    sharesToReceive,
    sharesToReceiveInUsd,
    costInUnderlyingAsset,
    costInUsd,
  } = useFetchPreviewDeposit(ilmStrategies[id], amount);

  return {
    isLoading: isLoading,
    isFetched: isFetched,
    data: {
      sharesToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(
          sharesToReceive,
          walletBalanceDecimalsOptions
        ),
        dollarAmount: formatFetchBigIntToViewBigInt(
          sharesToReceiveInUsd,
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
