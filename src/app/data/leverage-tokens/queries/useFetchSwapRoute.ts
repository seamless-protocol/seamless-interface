import { Address } from "viem";
import { useFetchSimulateDeposit } from "../../ilmv1-deprecated/queries/useFetchSimulateDeposit";
import { useAccount } from "wagmi";
import {
  Displayable,
  FetchBigInt,
  FetchData,
  fFetchBigIntStructured,
  formatFetchBigIntToViewBigInt,
  fUsdValueStructured,
  mergeQueryStates,
  useToken,
  ViewBigInt,
} from "@shared";
import { walletBalanceDecimalsOptions } from "@meta";
import { useFetchStrategyAsset } from "../../ilmv1-deprecated/metadata/useFetchStrategyAsset";
import { cValueInUsd } from "../../common/math/cValueInUsd";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { useFetchDepositSharesToReceive } from "../../ilmv1-deprecated/queries/useFetchDepositSharesToReceive";

export interface SharesToReceiveData {
  sharesToReceive?: FetchBigInt;
  sharesToReceiveInUsd?: FetchBigInt;
}

export const useFetchSwapRoute = (amount: string, subStrategy?: Address): FetchData<SharesToReceiveData> => {
  const account = useAccount();

  const { data: underlyingAsset, ...configRest } = useFetchStrategyAsset(subStrategy);
  const {
    data: { symbol: underlyingAssetSymbol, decimals: strategyDecimals },
    ...underlyingAssetRest
  } = useToken(underlyingAsset);
  const { data: shares, ...sharesRest } = useFetchSimulateDeposit(account.address as Address, amount, subStrategy);

  const { data: sharePrice, ...sharePriceRest } = useFetchAssetPrice({
    asset: subStrategy,
  });

  const sharesToReceive = shares?.bigIntValue === undefined ? undefined : (shares.bigIntValue * 999n) / 1000n;
  const sharesToReceiveInUsd = cValueInUsd(sharesToReceive, sharePrice?.bigIntValue, shares.decimals);

  return {
    ...mergeQueryStates([sharesRest, sharePriceRest, configRest, underlyingAssetRest]),
    data: {
      sharesToReceive: fFetchBigIntStructured(sharesToReceive, strategyDecimals, underlyingAssetSymbol),
      sharesToReceiveInUsd: fUsdValueStructured(sharesToReceiveInUsd),
    },
  };
};

export interface ViewSharesToReceive {
  sharesToReceive?: ViewBigInt;
  sharesToReceiveInUsd?: ViewBigInt;
}

export const useFetchViewDepositSharesToReceive = (
  amount: string,
  subStrategy?: Address
): Displayable<ViewSharesToReceive> => {
  const {
    data: { sharesToReceive, sharesToReceiveInUsd },
    ...rest
  } = useFetchDepositSharesToReceive(amount, subStrategy);

  return {
    ...rest,
    data: {
      sharesToReceive: formatFetchBigIntToViewBigInt(sharesToReceive, walletBalanceDecimalsOptions),
      sharesToReceiveInUsd: formatFetchBigIntToViewBigInt(sharesToReceiveInUsd, walletBalanceDecimalsOptions),
    },
  };
};
