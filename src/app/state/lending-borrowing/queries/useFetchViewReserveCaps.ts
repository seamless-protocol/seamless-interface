import { Address, parseUnits } from "viem";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";
import { Displayable, useToken, mergeQueryStates } from "../../../../shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewReserveCaps } from "../types/ViewReserveCaps";
import { useReadContract } from "wagmi";

interface AssetCaps {
  supplyCap: FetchBigInt;
  borrowCap: FetchBigInt;
}

export const useFetchReserveCaps = (asset?: Address): FetchData<AssetCaps> => {
  const {
    data: { decimals },
    ...tokenRest
  } = useToken(asset);

  const { data, ...rest } = useReadContract({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveCaps",
    args: [asset!],
    query: {
      enabled: !!asset,
    },
  });

  return {
    ...mergeQueryStates([tokenRest, rest]),
    data: {
      supplyCap: {
        bigIntValue: parseUnits(data?.[1].toString() || "0", decimals || 0),
        decimals,
        symbol: "",
      },
      borrowCap: {
        bigIntValue: parseUnits(data?.[0].toString() || "0", decimals || 0),
        decimals,
        symbol: "",
      },
    },
  };
};

export const useFetchViewReserveCaps = (asset: Address): Displayable<ViewReserveCaps> => {
  const {
    data: { supplyCap, borrowCap },
    ...rest
  } = useFetchReserveCaps(asset);

  return {
    ...rest,
    data: {
      supplyCap: formatFetchBigIntToViewBigInt(supplyCap),
      borrowCap: formatFetchBigIntToViewBigInt(borrowCap),
    },
  };
};
