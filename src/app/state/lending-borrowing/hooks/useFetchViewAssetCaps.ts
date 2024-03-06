import { Address } from "viem";
import { Displayable, useSeamlessContractRead } from "../../../../shared";
import {
  protocolDataProviderAbi,
  protocolDataProviderAddress,
} from "../../../generated";
import { Fetch, FetchBigInt } from "../../../../shared/types/Fetch";
import { useFetchAssetPrice } from "../../asset/hooks/useFetchViewAssetPrice";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewAssetCaps } from "../types/ViewAssetCaps";

interface AssetCaps {
  supplyCap: FetchBigInt;
  supplyCapUsd: FetchBigInt;
  borrowCap: FetchBigInt;
  borrowCapUsd: FetchBigInt;
}

export const useFetchAssetCaps = (asset: Address): Fetch<AssetCaps> => {
  const {
    isLoading: isCapsLoading,
    isFetched: isCapsFetched,
    data,
  } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveCaps",
    args: [asset],
  });

  let {
    isLoading: isPriceLoading,
    isFetched: isPriceFetched,
    price,
  } = useFetchAssetPrice(asset);
  price = price || 0n;

  let supplyCap = 0n,
    borrowCap = 0n;
  if (data) {
    [borrowCap, supplyCap] = data;
  }

  return {
    isLoading: isCapsLoading || isPriceLoading,
    isFetched: isCapsFetched && isPriceFetched,
    supplyCap: {
      bigIntValue: supplyCap,
      decimals: 0,
      symbol: "",
    },
    supplyCapUsd: {
      bigIntValue: supplyCap * price.bigIntValue,
      symbol: price.symbol,
      decimals: price.decimals,
    },
    borrowCap: {
      bigIntValue: borrowCap,
      decimals: 0,
      symbol: "",
    },
    borrowCapUsd: {
      bigIntValue: borrowCap * price.bigIntValue,
      symbol: price.symbol,
      decimals: price.decimals,
    },
  };
};

export const useFetchViewAssetCaps = (
  asset: Address
): Displayable<ViewAssetCaps> => {
  const {
    isLoading,
    isFetched,
    supplyCap,
    supplyCapUsd,
    borrowCap,
    borrowCapUsd,
  } = useFetchAssetCaps(asset);

  return {
    isLoading,
    isFetched,
    data: {
      supplyCap: {
        tokenAmount: formatFetchBigIntToViewBigInt(supplyCap),
        dollarAmount: formatFetchBigIntToViewBigInt(supplyCapUsd),
      },
      borrowCap: {
        tokenAmount: formatFetchBigIntToViewBigInt(borrowCap),
        dollarAmount: formatFetchBigIntToViewBigInt(borrowCapUsd),
      },
    },
  };
};
