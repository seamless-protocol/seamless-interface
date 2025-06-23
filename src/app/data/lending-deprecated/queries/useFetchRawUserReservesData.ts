import { useAccount, useReadContract } from "wagmi";
import { poolDataProviderAbi, poolDataProviderAddress } from "../../../generated";
import { AAVE_ADDRESS_PROVIDER } from "@meta";
import { Address } from "viem";

export const useFetchRawUserReservesData = () => {
  const account = useAccount();

  return useReadContract({
    address: poolDataProviderAddress,
    abi: poolDataProviderAbi,
    functionName: "getUserReservesData",
    args: [AAVE_ADDRESS_PROVIDER, account.address as Address],
    query: {
      enabled: !!account.address,
    },
  });
};
