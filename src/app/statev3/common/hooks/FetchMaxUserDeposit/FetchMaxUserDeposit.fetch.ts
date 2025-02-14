import { Address } from "viem";
import { FetchBigInt, fetchToken } from "@shared";
import { fetchAssetBalance } from "../../queries/useFetchViewAssetBalance";
import { fetchMaxDeposit } from "./FetchMaxDeposit.fetch";
import { cMaxUserDeposit } from "./cMaxUserDeposit.math";

export const fetchMaxUserDeposit = async (address: Address, underlyingAddress: Address, userAddress: Address) => {
  const [token, maxDeposit, assetBalance] = await Promise.all([
    fetchToken(underlyingAddress),
    fetchMaxDeposit(address),
    fetchAssetBalance(underlyingAddress, userAddress),
  ]);

  const max = cMaxUserDeposit(maxDeposit, assetBalance) as FetchBigInt;

  return {
    maxUserDeposit: max
      ? {
          bigIntValue: max?.bigIntValue,
          decimals: max?.decimals,
          symbol: max?.symbol,
        }
      : undefined,
    token,
    maxDeposit,
    assetBalance,
  };
};
