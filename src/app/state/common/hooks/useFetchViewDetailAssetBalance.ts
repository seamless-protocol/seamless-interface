import { Address } from "viem";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { Displayable, fUsdValueStructured, mergeQueryStates } from "../../../../shared";
import { useFetchAssetPrice } from "../queries/useFetchViewAssetPrice";
import { ViewDetailAssetBalance } from "../types/ViewDetailAssetBalance";
import { useFetchAssetBalance } from "../queries/useFetchViewAssetBalance";
import { cValueInUsd } from "../math/cValueInUsd";

export interface DetailAssetBalance {
  balance?: FetchBigInt;
  balanceUsd?: FetchBigInt;
}

export const useFetchDetailAssetBalance = (token: Address): FetchData<DetailAssetBalance> => {
  const { data: balance, ...balanceRest } = useFetchAssetBalance(token);

  const { data: price, ...priceRest } = useFetchAssetPrice({ asset: token });

  const balanceUsd = cValueInUsd(balance?.bigIntValue, price?.bigIntValue, balance?.decimals);

  return {
    ...mergeQueryStates([balanceRest, priceRest]),
    data: {
      balance,
      balanceUsd: fUsdValueStructured(balanceUsd),
    },
  };
};

export const useFetchViewDetailAssetBalance = (token: Address): Displayable<ViewDetailAssetBalance> => {
  const {
    data: { balance, balanceUsd },
    ...rest
  } = useFetchDetailAssetBalance(token);

  return {
    ...rest,
    data: {
      balance: {
        tokenAmount: formatFetchBigIntToViewBigInt(balance),
        dollarAmount: formatFetchBigIntToViewBigInt(balanceUsd),
      },
    },
  };
};
