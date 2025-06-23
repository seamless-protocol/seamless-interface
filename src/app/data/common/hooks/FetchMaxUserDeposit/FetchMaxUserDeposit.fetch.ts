import { Address } from "viem";
import { fetchToken } from "@shared";
import { fetchAssetBalance } from "../../queries/useFetchViewAssetBalance";
import { fetchMaxDeposit } from "./FetchMaxDeposit.fetch";
import { cMaxUserDeposit } from "./cMaxUserDeposit.math";

export const fetchMaxUserDeposit = async (address: Address, underlyingAddress: Address, userAddress: Address) => {
  const [token, maxDeposit, assetBalance] = await Promise.all([
    fetchToken(underlyingAddress),
    fetchMaxDeposit(address, underlyingAddress),
    fetchAssetBalance(underlyingAddress, userAddress),
  ]);

  const max = cMaxUserDeposit(maxDeposit, assetBalance);

  return {
    maxUserDeposit: max
      ? {
        bigIntValue: max,
        decimals: token?.decimals,
        symbol: token?.symbol,
      }
      : undefined,
    token,
    maxDeposit,
    assetBalance,
  };
};
