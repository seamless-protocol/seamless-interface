import { Address, parseEther } from "viem";
import { ONE_ETHER, walletBalanceDecimalsOptions } from "@meta";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewPreviewDeposit } from "../types/ViewPreviewDeposit";
import { Displayable, fFetchBigIntStructured, fUsdValueStructured, mergeQueryStates, useToken } from "@shared";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { useFetchStrategyAsset } from "../metadata/useFetchStrategyAsset";
import { useFetchDepositSharesToReceive } from "./useFetchDepositSharesToReceive";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

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

  let amountInWei;
  try {
    amountInWei = parseEther(amount);
  } catch (e) {
    return undefined;
  }

  const depositValueInUsd = (amountInWei * assetPriceValue) / ONE_ETHER;
  return depositValueInUsd - sharesToReceiveInUsd;
};

export const cCostInUnderlyingAsset = (costInUsd?: bigint, assetPriceValue?: bigint) => {
  if (costInUsd == null || assetPriceValue == null) return undefined;

  const divider = assetPriceValue;
  if (divider === 0n) return undefined;

  return (costInUsd * ONE_ETHER) / divider;
};

interface PreviewDepositCostInUsdAndUnderlying {
  sharesToReceive?: FetchBigInt;
  sharesToReceiveInUsd?: FetchBigInt;
  costInUnderlyingAsset?: FetchBigInt;
  costInUsd?: FetchBigInt;
}

export const useFetchDepositCostInUsdAndUnderlying = (
  amount: string,
  subStrategy?: Address
): FetchData<PreviewDepositCostInUsdAndUnderlying> => {
  const {
    data: { sharesToReceiveInUsd },
    ...restShares
  } = useFetchDepositSharesToReceive(amount, subStrategy);

  const { data: underlyingAsset, ...configRest } = useFetchStrategyAsset(subStrategy);

  const {
    data: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
    ...underlyingAssetRest
  } = useToken(underlyingAsset);

  const { data: assetPrice, ...assetPriceRest } = useFetchAssetPrice({
    asset: underlyingAsset,
  });

  const costInUsd = cCostInUsd(assetPrice.bigIntValue, amount, sharesToReceiveInUsd?.bigIntValue);
  const costInUnderlyingAsset = cCostInUnderlyingAsset(costInUsd, assetPrice?.bigIntValue);

  return {
    ...mergeQueryStates([configRest, restShares, assetPriceRest, underlyingAssetRest]),
    data: {
      costInUnderlyingAsset: fFetchBigIntStructured(
        costInUnderlyingAsset,
        underlyingAssetDecimals,
        underlyingAssetSymbol
      ),
      costInUsd: fUsdValueStructured(costInUsd),
    },
  };
};

export const useFetchPreviewDepositCostInUsdAndUnderlying = (
  amount: string,
  subStrategy?: Address
): Displayable<ViewPreviewDeposit> => {
  const {
    data: { sharesToReceive, sharesToReceiveInUsd, costInUnderlyingAsset, costInUsd },
    ...rest
  } = useFetchDepositCostInUsdAndUnderlying(amount, subStrategy);

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
