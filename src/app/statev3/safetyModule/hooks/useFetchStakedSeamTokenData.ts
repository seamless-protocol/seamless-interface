import { type StakedAsset, type StakedSeam } from "../types/StakedSeam";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { SEAM_ADDRESS, stakedSeamAddress } from "@meta";
import { useQuery } from "@tanstack/react-query";

export const fetchStakedSeamTokenData = async (token: Address, asset: Address) => {
  try {
    const [underlyingAssetTokenData, underlyingTokenData] = await Promise.all([fetchToken(asset), fetchToken(token)]);

    const assetData: StakedAsset = {
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
  const asset: Address = SEAM_ADDRESS;

  return useQuery({
    queryKey: ["useFetchStakedSeamTokenData", token, asset],
    queryFn: () => fetchStakedSeamTokenData(token, asset),
    enabled: Boolean(token) && Boolean(asset),
  });
};
