import { Address } from "viem";
import { walletBalanceDecimalsOptions } from "@meta";
import { Displayable, ViewBigInt, formatFetchBigIntToViewBigInt } from "@shared";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchMaxUserDeposit } from "./FetchMaxUserDeposit.fetch";

export const getFetchViewMaxUserDepositQueryKey = (
  address?: Address,
  userAddress?: Address,
  underylingAddress?: Address
) => ["maxUserDeposit", address, userAddress, underylingAddress];

// todo delete old useFetchViewMaxUserDeposit in ILMs, and use this one everywhere instead.
export const useFetchViewMaxUserDeposit = (address?: Address, underylingAddress?: Address): Displayable<ViewBigInt> => {
  const { address: userAddress } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: getFetchViewMaxUserDepositQueryKey(address, userAddress, underylingAddress),
    queryFn: () => fetchMaxUserDeposit(address as Address, underylingAddress as Address, userAddress as Address),
    enabled: !!address && !!underylingAddress && !!userAddress,
    ...queryConfig.semiSensitiveDataQueryConfig,
  });

  return {
    ...rest,
    data: formatFetchBigIntToViewBigInt(data?.maxUserDeposit, walletBalanceDecimalsOptions),
  };
};
