import { type TokenData } from "../types/TokenData";
import { type StakedSeam } from "../types/StakedSeam";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { stakedSeamAddress } from "@meta";
import { useQuery } from "@tanstack/react-query";

export const fetchStakedSeamTokenData = async (token: Address, asset: Address) => {
  try {
    const [underlyingAssetTokenData, underlyingTokenData] = await Promise.all([fetchToken(asset), fetchToken(token)]);

    const assetData: TokenData = {
      ...underlyingAssetTokenData,
      address: asset,
    };
    const tokenData: StakedSeam = {
      ...underlyingTokenData,
      address: token,
      asset: assetData,
    };

    return tokenData;
  } catch (error) {
    console.error("Error fetching staked seam token data:", error);
    throw error;
  }
};

export const useFetchStakedSeamTokenData = () => {
  const token: Address = stakedSeamAddress;
  const asset: Address = "0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85";

  return useQuery({
    queryKey: ["useFetchStakedSeamTokenData", token, asset],
    queryFn: () => fetchStakedSeamTokenData(token, asset),
    enabled: Boolean(token) && Boolean(asset),
  });
};
