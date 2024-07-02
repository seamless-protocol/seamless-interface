import { Address } from "viem";
import { useFetchAssetPrice } from "../../common/queries/useFetchViewAssetPrice";
import { useFetchSimulateDeposit } from "../queries/useFetchSimulateDeposit";
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
import { ONE_ETHER, walletBalanceDecimalsOptions } from "@meta";
import { useFetchStrategyAsset } from "../metadataQueries/useFetchStrategyAsset";

export const cSharesToReceive = (sharesValue?: bigint) => {
  if (sharesValue == null) return undefined;

  return (sharesValue * 999n) / 1000n;
};

export const cSharesToReceiveInUsd = (sharesToReceiveValue?: bigint, sharePriceValue?: bigint) => {
  if (sharePriceValue == null || sharesToReceiveValue == null) return undefined;

  return (sharesToReceiveValue * sharePriceValue) / ONE_ETHER;
};

interface SharesToReceiveData {
  sharesToReceive?: FetchBigInt;
  sharesToReceiveInUsd?: FetchBigInt;
}

export const useFetchDepositSharesToReceive = (
  amount: string,
  subStrategy?: Address
): FetchData<SharesToReceiveData> => {
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

  const sharesToReceive = cSharesToReceive(shares?.bigIntValue);
  const sharesToReceiveInUsd = cSharesToReceiveInUsd(sharesToReceive, sharePrice?.bigIntValue);

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
