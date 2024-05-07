import { Address, parseEther } from "viem";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import { ONE_ETHER, walletBalanceDecimalsOptions } from "@meta";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { Displayable, fFetchBigIntStructured, fUsdValueStructured, mergeQueryStates, useToken } from "@shared";
import { ViewPreviewWithdraw } from "../types/ViewPreviewWithdraw";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { useAccount } from "wagmi";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { useFetchSimulateWithdraw } from "../queries/useFetchSimulateWithdraw";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";

const cAssetsToReceive = (assetsValue?: bigint) => {
  if (assetsValue == null) return undefined;

  return (assetsValue * 999n) / 1000n;
};

const cAssetsToReceiveUsd = (assetsToReceiveValue?: bigint, underlyingAssetPriceValue?: bigint) => {
  if (assetsToReceiveValue == null || underlyingAssetPriceValue == null) return undefined;

  return (assetsToReceiveValue * underlyingAssetPriceValue) / ONE_ETHER;
};

const cCostInUsd = (sharePriceValue?: bigint, amount?: string, assetsToReceiveInUsd?: bigint) => {
  if (amount == null || assetsToReceiveInUsd == null || sharePriceValue == null) return undefined;
  try {
    BigInt(amount);
  } catch (e) {
    return undefined;
  }
  const withdrawAmountInUsd = (parseEther(amount) * sharePriceValue) / ONE_ETHER;

  return withdrawAmountInUsd - assetsToReceiveInUsd;
};

const cCostInUnderlyingAsset = (costInUsd?: bigint, underlyingAssetPriceValue?: bigint) => {
  if (costInUsd == null || underlyingAssetPriceValue == null) return undefined;

  const divider = underlyingAssetPriceValue;
  if (divider === 0n) return undefined;

  return (costInUsd * ONE_ETHER) / underlyingAssetPriceValue;
};

interface PreviewWithdraw {
  assetsToReceive?: FetchBigInt;
  assetsToReceiveInUsd?: FetchBigInt;
  costInUnderlyingAsset?: FetchBigInt;
  costInUsd?: FetchBigInt;
}

export const useFetchPreviewWithdraw = (strategyConfig: StrategyConfig, amount: string): FetchData<PreviewWithdraw> => {
  const account = useAccount();

  const { data: underlyingAsset, ...strategyRest } = useFetchStrategyAsset(strategyConfig.address);

  const {
    data: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
    ...underlyingSymbolRest
  } = useToken(underlyingAsset);

  const { data: assets, ...simulateRest } = useFetchSimulateWithdraw(
    account.address as Address,
    strategyConfig.address,
    amount
  );

  const { data: sharePrice, ...sharesRest } = useFetchAssetPrice({
    asset: strategyConfig.address,
  });

  const { data: underlyingAssetPrice, ...underlyingAssetRest } = useFetchAssetPrice({
    asset: underlyingAsset,
  });

  const assetsToReceive = cAssetsToReceive(assets?.bigIntValue);
  const assetsToReceiveInUsd = cAssetsToReceiveUsd(assetsToReceive, underlyingAssetPrice.bigIntValue);
  const costInUsd = cCostInUsd(sharePrice.bigIntValue, amount, assetsToReceiveInUsd);
  const costInUnderlyingAsset = cCostInUnderlyingAsset(costInUsd, underlyingAssetPrice?.bigIntValue);

  return {
    ...mergeQueryStates([underlyingSymbolRest, simulateRest, strategyRest, underlyingAssetRest, sharesRest]),
    data: {
      assetsToReceive: fFetchBigIntStructured(assetsToReceive, underlyingAssetDecimals, underlyingAssetSymbol),
      assetsToReceiveInUsd: fUsdValueStructured(assetsToReceiveInUsd),
      costInUnderlyingAsset: fFetchBigIntStructured(
        costInUnderlyingAsset,
        underlyingAssetDecimals,
        underlyingAssetSymbol
      ),
      costInUsd: fUsdValueStructured(costInUsd),
    },
  };
};

export const useFetchViewPreviewWithdraw = (index: number, amount: string): Displayable<ViewPreviewWithdraw> => {
  const {
    data: { assetsToReceive, assetsToReceiveInUsd, costInUnderlyingAsset, costInUsd },
    ...rest
  } = useFetchPreviewWithdraw(ilmStrategies[index], amount);

  return {
    ...rest,
    data: {
      assetsToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(assetsToReceive, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(assetsToReceiveInUsd, walletBalanceDecimalsOptions),
      },
      cost: {
        tokenAmount: formatFetchBigIntToViewBigInt(costInUnderlyingAsset, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(costInUsd, walletBalanceDecimalsOptions),
      },
    },
  };
};
