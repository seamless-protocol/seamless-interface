import { Address, parseEther } from "viem";
import { ONE_ETHER, walletBalanceDecimalsOptions } from "@meta";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewPreviewDeposit } from "../types/ViewPreviewDeposit";
import { Displayable, fFetchBigIntStructured, fUsdValueStructured, mergeQueryStates, useToken } from "@shared";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { useAccount } from "wagmi";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { useFetchSimulateDeposit } from "../queries/useFetchSimulateDeposit";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";
import { StrategyState } from "../../common/types/StateTypes";

export const cSharesToReceive = (sharesValue?: bigint) => {
  if (sharesValue == null) return undefined;

  return (sharesValue * 999n) / 1000n;
};

export const cSharesToReceiveInUsd = (sharesToReceiveValue?: bigint, sharePriceValue?: bigint) => {
  if (sharePriceValue == null || sharesToReceiveValue == null) return undefined;

  return (sharesToReceiveValue * sharePriceValue) / ONE_ETHER;
};

export const cCostInUsd = (assetPriceValue?: bigint, amount?: string, sharesToReceiveInUsd?: bigint) => {
  if (assetPriceValue == null || amount == null || sharesToReceiveInUsd == null) return undefined;
  try {
    BigInt(amount);
  } catch (e) {
    return undefined;
  }

  const depositValueInUsd = (parseEther(amount) * assetPriceValue) / ONE_ETHER;
  return depositValueInUsd - sharesToReceiveInUsd;
};

export const cCostInUnderlyingAsset = (costInUsd?: bigint, assetPriceValue?: bigint) => {
  if (costInUsd == null || assetPriceValue == null) return undefined;

  const divider = assetPriceValue;
  if (divider === 0n) return undefined;

  return (costInUsd * ONE_ETHER) / divider;
};

interface PreviewDeposit {
  sharesToReceive?: FetchBigInt;
  sharesToReceiveInUsd?: FetchBigInt;
  costInUnderlyingAsset?: FetchBigInt;
  costInUsd?: FetchBigInt;
}

export const useFetchPreviewDeposit = (strategy: StrategyState, amount: string): FetchData<PreviewDeposit> => {
  const account = useAccount();

  const { data: underlyingAsset, ...configRest } = useFetchStrategyAsset(strategy.address);

  const {
    data: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
    ...underlyingAssetRest
  } = useToken(underlyingAsset);

  const {
    data: { symbol: strategySymbol, decimals: strategyDecimals },
    ...strategyRest
  } = useToken(strategy.address);

  const { data: shares, ...sharesRest } = useFetchSimulateDeposit(
    account.address as Address,
    strategy.address,
    amount
  );

  const { data: sharePrice, ...sharePriceRest } = useFetchAssetPrice({
    asset: strategy.address,
  });

  const { data: assetPrice, ...assetPriceRest } = useFetchAssetPrice({
    asset: underlyingAsset,
  });

  const sharesToReceive = cSharesToReceive(shares?.bigIntValue);
  const sharesToReceiveInUsd = cSharesToReceiveInUsd(sharesToReceive, sharePrice?.bigIntValue);

  const costInUsd = cCostInUsd(assetPrice.bigIntValue, amount, sharesToReceiveInUsd);
  const costInUnderlyingAsset = cCostInUnderlyingAsset(costInUsd, assetPrice?.bigIntValue);

  return {
    ...mergeQueryStates([configRest, sharePriceRest, assetPriceRest, strategyRest, underlyingAssetRest, sharesRest]),
    data: {
      sharesToReceive: fFetchBigIntStructured(sharesToReceive, strategyDecimals, strategySymbol),
      sharesToReceiveInUsd: fUsdValueStructured(sharesToReceiveInUsd),
      costInUnderlyingAsset: fFetchBigIntStructured(
        costInUnderlyingAsset,
        underlyingAssetDecimals,
        underlyingAssetSymbol
      ),
      costInUsd: fUsdValueStructured(costInUsd),
    },
  };
};

export const useFetchViewPreviewDeposit = (strategy: StrategyState, amount: string): Displayable<ViewPreviewDeposit> => {
  const {
    data: { sharesToReceive, sharesToReceiveInUsd, costInUnderlyingAsset, costInUsd },
    ...rest
  } = useFetchPreviewDeposit(strategy, amount);

  return {
    ...rest,
    data: {
      sharesToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(sharesToReceive, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(sharesToReceiveInUsd, walletBalanceDecimalsOptions),
      },
      cost: {
        tokenAmount: formatFetchBigIntToViewBigInt(costInUnderlyingAsset, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(costInUsd, walletBalanceDecimalsOptions),
      },
    },
  };
};
