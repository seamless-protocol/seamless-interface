import { Address, parseEther } from "viem";
import { ONE_ETHER, walletBalanceDecimalsOptions } from "@meta";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import {
  Displayable,
  fFetchBigIntStructured,
  fUsdValueStructured,
  mergeQueryStates,
  useToken,
  ViewBigInt,
} from "@shared";
import { FetchBigInt, FetchData } from "src/shared/types/Fetch";
import { useFetchStrategyAsset } from "../metadata/useFetchStrategyAsset";
import { useFetchWithdrawSharesToReceive } from "./useFetchWithdrawSharesToReceive";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

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

interface PreviewWithdrawCostInUsdAndUnderlying {
  costInUnderlyingAsset?: FetchBigInt;
  costInUsd?: FetchBigInt;
}

export const useFetchWithdrawCostInUsdAndUnderlying = (
  amount: string,
  subStrategy?: Address
): FetchData<PreviewWithdrawCostInUsdAndUnderlying> => {
  const {
    data: { assetsToReceiveInUsd },
    ...simulateRest
  } = useFetchWithdrawSharesToReceive(amount, subStrategy);

  const { data: underlyingAsset, ...strategyRest } = useFetchStrategyAsset(subStrategy);

  const {
    data: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
    ...underlyingSymbolRest
  } = useToken(underlyingAsset);

  const { data: sharePrice, ...sharesRest } = useFetchAssetPrice({
    asset: subStrategy,
  });

  const { data: underlyingAssetPrice, ...underlyingAssetRest } = useFetchAssetPrice({
    asset: underlyingAsset,
  });

  const costInUsd = cCostInUsd(sharePrice.bigIntValue, amount, assetsToReceiveInUsd?.bigIntValue);
  const costInUnderlyingAsset = cCostInUnderlyingAsset(costInUsd, underlyingAssetPrice?.bigIntValue);

  return {
    ...mergeQueryStates([underlyingSymbolRest, simulateRest, strategyRest, underlyingAssetRest, sharesRest]),
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

export interface ViewPreviewWithdraw {
  cost: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}

export const useFetchViewWithdrawCostInUsdAndUnderlying = (
  amount: string,
  subStrategy?: Address
): Displayable<ViewPreviewWithdraw> => {
  const {
    data: { costInUnderlyingAsset, costInUsd },
    ...rest
  } = useFetchWithdrawCostInUsdAndUnderlying(amount, subStrategy);

  return {
    ...rest,
    data: {
      cost: {
        tokenAmount: formatFetchBigIntToViewBigInt(costInUnderlyingAsset, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(costInUsd, walletBalanceDecimalsOptions),
      },
    },
  };
};
