import { Address } from "viem";
import { protocolDataProviderAbi, protocolDataProviderAddress } from "../../../generated";
import { RQResponse, useSeamlessContractRead } from "../../../../shared";
import { FetchBigInt, FetchData } from "../../../../shared/types/Fetch";
import { formatFetchBigIntToViewBigInt } from "../../../../shared/utils/helpers";
import { ViewReserveCaps } from "../types/ViewReserveCaps";

interface AssetCaps {
  supplyCap: FetchBigInt;
  borrowCap: FetchBigInt;
}

export const useFetchReserveCaps = (asset?: Address): FetchData<AssetCaps> => {
  const { data, ...rest } = useSeamlessContractRead({
    address: protocolDataProviderAddress,
    abi: protocolDataProviderAbi,
    functionName: "getReserveCaps",
    args: [asset!],
    query: {
      enabled: !!asset
    }
  });

  return {
    ...rest,
    data: {
      supplyCap: {
        bigIntValue: data?.[1] || 0n,
        decimals: 0,
        symbol: "",
      },
      borrowCap: {
        bigIntValue: data?.[0] || 0n,
        decimals: 0,
        symbol: "",
      },
    },
  };
};

export const useFetchViewReserveCaps = (asset: Address): RQResponse<ViewReserveCaps> => {
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
