import { parseEther } from "viem";
import { useReadAaveOracleGetAssetPrice } from "../../../generated/generated";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import {
  ONE_ETHER,
  walletBalanceDecimalsOptions,
} from "../../../meta/constants";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable } from "../../../../shared";
import { ViewPreviewWithdraw } from "../types/ViewPreviewWithdraw";
import { useFetchShareValue } from "../../common/hooks/useFetchShareValue";
import { Fetch, FetchBigInt } from "src/shared/types/Fetch";
import { useEffect, useState } from "react";
import { useAccount, useBlock } from "wagmi";
import { simulateWithdraw } from "../../../../shared/utils/tenderlyBundles";

interface PreviewWithdraw {
  assetsToReceive: FetchBigInt;
  assetsToReceiveInUsd: FetchBigInt;
  costInUnderlyingAsset: FetchBigInt;
  costInUsd: FetchBigInt;
}

export const useFetchPreviewWithdraw = (
  strategyConfig: StrategyConfig,
  amount: string
): Fetch<PreviewWithdraw> => {
  const { data: block } = useBlock();
  const account = useAccount();
  const [assets, setAssets] = useState(0n);

  useEffect(() => {
    if (!block || !block.number || !account.address) return;

    simulateWithdraw(
      account.address,
      amount,
      strategyConfig,
      block.number
    ).then((result) => {
      result.isSuccess && setAssets(result.assetsToReceive);
    });
  }, [amount, block]);

  const {
    isLoading: isShareValueLoading,
    isFetched: isShareValueFetched,
    shareValueInUnderlyingAsset,
  } = useFetchShareValue(strategyConfig);

  const {
    isLoading: isAssetPriceLoading,
    isFetched: isAssetPriceFetched,
    data: underlyingAssetPrice,
  } = useReadAaveOracleGetAssetPrice({
    args: [strategyConfig.underlyingAsset.address],
  });

  let assetsToReceive, assetsToReceiveInUsd, costInUnderlyingAsset, costInUsd;
  if (assets && underlyingAssetPrice) {
    assetsToReceive = assets;
    assetsToReceiveInUsd = (assetsToReceive * underlyingAssetPrice) / ONE_ETHER;

    costInUnderlyingAsset =
      (parseEther(amount) * (shareValueInUnderlyingAsset || 0n)) / ONE_ETHER -
      assetsToReceive;
    costInUsd =
      (costInUnderlyingAsset * (underlyingAssetPrice || 0n)) / ONE_ETHER;
  }

  return {
    isLoading: isAssetPriceLoading || isShareValueLoading,
    isFetched: isAssetPriceFetched && isShareValueFetched,
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
  };
};

export const useFetchViewPreviewWithdraw = (
  index: number,
  amount: string
): Displayable<ViewPreviewWithdraw> => {
  const {
    isLoading,
    isFetched,
    assetsToReceive,
    assetsToReceiveInUsd,
    costInUnderlyingAsset,
    costInUsd,
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
