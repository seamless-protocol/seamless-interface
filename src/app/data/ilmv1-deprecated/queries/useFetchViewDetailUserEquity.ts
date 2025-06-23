import { Address } from "viem";
import { useFetchStrategyAsset } from "../metadata/useFetchStrategyAsset";
import {
  DecimalsOptions,
  Displayable,
  fFetchBigIntStructured,
  formatFetchBigIntToViewBigInt,
  fUsdValueStructured,
  mergeQueryStates,
  useToken,
} from "@shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { ViewDetailUserEquity } from "../types/ViewDetailUserEquity";
import { useFetchAssetBalance } from "../../common/queries/useFetchViewAssetBalance";
import { useFetchViewAssetTotalSupply } from "../../common/queries/useFetchViewAssetTotalSupply";
import { useFetchDetailEquity } from "./useFetchViewEquity.all";

export const cUserEquity = (equityValue?: bigint, strategyBalanceValue?: bigint, strategyTotalSupplyValue?: bigint) => {
  if (equityValue == null || strategyBalanceValue == null || strategyTotalSupplyValue == null) return undefined;

  const divider = strategyTotalSupplyValue;
  if (divider === 0n) return undefined;

  return (equityValue * strategyBalanceValue) / divider;
};

export const cUserEquityUsd = (
  equityUsdValue?: bigint,
  strategyBalanceValue?: bigint,
  strategyTotalSupplyValue?: bigint
) => {
  if (equityUsdValue == null || strategyBalanceValue == null || strategyTotalSupplyValue == null) return undefined;

  const divider = strategyTotalSupplyValue;
  if (divider === 0n) return undefined;

  return (equityUsdValue * strategyBalanceValue) / divider;
};

interface DetailUserEquity {
  userEquity: FetchBigInt | undefined;
  userEquityUsd: FetchBigInt | undefined;
}

export const useFetchDetailUserEquity = (strategy: Address): FetchData<DetailUserEquity> => {
  const { data: underlyingAsset, ...underlyingAssetRest } = useFetchStrategyAsset(strategy);

  const { data: tokenData, ...tokenRest } = useToken(underlyingAsset);

  const {
    data: { equity, equityUsd },
    ...equityRest
  } = useFetchDetailEquity(strategy);

  const { data: strategyBalance, ...assetBalanceRest } = useFetchAssetBalance(strategy);

  const { data: strategyTotalSupply, ...totalSupplyRest } = useFetchViewAssetTotalSupply(strategy);

  const userEquity = cUserEquity(equity?.bigIntValue, strategyBalance?.bigIntValue, strategyTotalSupply?.bigIntValue);
  const userEquityUsd = cUserEquityUsd(
    equityUsd?.bigIntValue,
    strategyBalance?.bigIntValue,
    strategyTotalSupply?.bigIntValue
  );

  return {
    ...mergeQueryStates([underlyingAssetRest, tokenRest, equityRest, assetBalanceRest, totalSupplyRest]),
    data: {
      userEquity: fFetchBigIntStructured(userEquity, tokenData.decimals, tokenData.symbol),
      userEquityUsd: fUsdValueStructured(userEquityUsd),
    },
  };
};

export const useFetchViewDetailUserEquity = (
  strategy: Address,
  decimalsOptions?: Partial<DecimalsOptions>
): Displayable<ViewDetailUserEquity> => {
  const {
    data: { userEquity, userEquityUsd },
    ...rest
  } = useFetchDetailUserEquity(strategy);

  return {
    ...rest,
    data: {
      tokenAmount: userEquity ? formatFetchBigIntToViewBigInt(userEquity, decimalsOptions) : undefined,
      dollarAmount: userEquityUsd ? formatFetchBigIntToViewBigInt(userEquityUsd, decimalsOptions) : undefined,
    },
  };
};
