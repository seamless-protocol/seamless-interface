import { useAccount } from "wagmi";
import { useSeamlessContractRead } from "../../../../shared";
import {
  poolDataProviderAbi,
  poolDataProviderAddress,
} from "../../../generated";
import { AAVE_ADDRESS_PROVIDER } from "../../../meta";
import { Address } from "viem";

export const useFetchRawUserReservesData = () => {
  const account = useAccount();

  return useSeamlessContractRead({
    address: poolDataProviderAddress,
    abi: poolDataProviderAbi,
    functionName: "getUserReservesData",
    args: [AAVE_ADDRESS_PROVIDER, account.address as Address],
  });
};
