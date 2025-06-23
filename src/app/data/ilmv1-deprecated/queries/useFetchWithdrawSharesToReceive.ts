import { Address } from "viem";
import { walletBalanceDecimalsOptions } from "@meta";
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
import { useAccount } from "wagmi";
import { useFetchSimulateWithdraw } from "./useFetchSimulateWithdraw";
import { useFetchStrategyAsset } from "../metadata/useFetchStrategyAsset";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";

const cAssetsToReceive = (assetsValue?: bigint) => {
  if (assetsValue == null) return undefined;

  return (assetsValue * 999n) / 1000n;
};

const cAssetsToReceiveUsd = (
  assetsToReceiveValue?: bigint,
  underlyingAssetPriceValue?: bigint,
  underlyingAssetDecimals?: number
) => {
  if (assetsToReceiveValue == null || underlyingAssetPriceValue == null || underlyingAssetDecimals == null)
    return undefined;

  return (assetsToReceiveValue * underlyingAssetPriceValue) / 10n ** BigInt(underlyingAssetDecimals);
};

export interface PreviewWithdraw {
  assetsToReceive?: FetchBigInt;
  assetsToReceiveInUsd?: FetchBigInt;
}

export const useFetchWithdrawSharesToReceive = (amount: string, subStrategy?: Address): FetchData<PreviewWithdraw> => {
  const account = useAccount();

  const { data: underlyingAsset, ...strategyRest } = useFetchStrategyAsset(subStrategy);

  const {
    data: { symbol: underlyingAssetSymbol, decimals: underlyingAssetDecimals },
    ...underlyingSymbolRest
  } = useToken(underlyingAsset);

  const { data: assets, ...simulateRest } = useFetchSimulateWithdraw(account.address as Address, amount, subStrategy);

  const { data: underlyingAssetPrice, ...underlyingAssetRest } = useFetchAssetPrice({
    asset: underlyingAsset,
  });

  const assetsToReceive = cAssetsToReceive(assets?.bigIntValue);
  const assetsToReceiveInUsd = cAssetsToReceiveUsd(
    assetsToReceive,
    underlyingAssetPrice.bigIntValue,
    underlyingAssetDecimals
  );

  return {
    ...mergeQueryStates([underlyingSymbolRest, simulateRest, strategyRest, underlyingAssetRest]),
    data: {
      assetsToReceive: fFetchBigIntStructured(assetsToReceive, underlyingAssetDecimals, underlyingAssetSymbol),
      assetsToReceiveInUsd: fUsdValueStructured(assetsToReceiveInUsd),
    },
  };
};

export interface ViewPreviewWithdraw {
  assetsToReceive: {
    tokenAmount: ViewBigInt;
    dollarAmount: ViewBigInt;
  };
}

export const useFetchViewWithdrawSharesToReceive = (
  amount: string,
  subStrategy?: Address
): Displayable<ViewPreviewWithdraw> => {
  const {
    data: { assetsToReceive, assetsToReceiveInUsd },
    ...rest
  } = useFetchWithdrawSharesToReceive(amount, subStrategy);

  return {
    ...rest,
    data: {
      assetsToReceive: {
        tokenAmount: formatFetchBigIntToViewBigInt(assetsToReceive, walletBalanceDecimalsOptions),
        dollarAmount: formatFetchBigIntToViewBigInt(assetsToReceiveInUsd, walletBalanceDecimalsOptions),
      },
    },
  };
};
