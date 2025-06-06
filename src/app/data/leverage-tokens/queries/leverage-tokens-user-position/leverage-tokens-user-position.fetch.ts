// src/state/leverage/hooks/useFetchUserLeveragePositions.ts
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";
import { Address, erc20Abi } from "viem";
import { useQuery } from "@tanstack/react-query";
import { LeverageToken, mockLeverageTokens } from "../all-leverage-tokens/mockLeverageTokens";
import { getConfig } from "../../../../utils/queryContractUtils";

/**
 * Represents a leverage token that the user holds (balance > 0).
 * We return the full LeverageToken object for convenience.
 */
export interface UserLeveragePosition {
  token: LeverageToken;
  balance: bigint;
}

const fetchLeverageTokensUserPosition = async (user: Address | undefined): Promise<UserLeveragePosition[]> => {
  if (!user) return [];

  const promises: Promise<UserLeveragePosition | undefined>[] = mockLeverageTokens.map(async (lt) => {
    try {
      const balance: bigint = await readContract(getConfig(), {
        address: lt.address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [user],
      });

      if (balance > 0n) {
        return { token: lt, balance };
      }
    } catch {
      return undefined;
    }
    return undefined;
  });

  const results = await Promise.all(promises);

  return results.filter((item): item is UserLeveragePosition => item !== undefined);
};

export const useFetchLeverageTokensUserPosition = () => {
  const account = useAccount();

  return useQuery<UserLeveragePosition[]>({
    queryKey: ["hookFetchLeverageTokensUserPosition", account?.address],
    queryFn: () => fetchLeverageTokensUserPosition(account?.address),
    enabled: !!account?.address,
  });
};
