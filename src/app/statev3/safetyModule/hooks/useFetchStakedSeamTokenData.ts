import { StakedAsset, type StakedSeam } from "../types/StakedSeam";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { useQuery } from "@tanstack/react-query";

export const fetchStakedSeamTokenData = async (stakedAsset: Address, asset: Address) => {
  try {
    const [underlyingAssetTokenData, underlyingTokenData] = await Promise.all([
      fetchToken(asset),
      fetchToken(stakedAsset),
    ]);

    const assetData: StakedAsset = {
      ...underlyingAssetTokenData,
      address: asset,
    };
    const tokenData: StakedSeam = {
      ...underlyingTokenData,
      address: stakedAsset,
      asset: assetData,
    };

    return tokenData;
  } catch (error) {
    console.error("Error fetching staked seam token data:", error);
    throw error;
  }
};

export const useFetchStakedSeamTokenData = () => {
  const stakedAsset: Address = STAKED_SEAM_ADDRESS;
  const asset: Address = SEAM_ADDRESS;

  return useQuery({
    queryKey: ["useFetchStakedSeamTokenData", stakedAsset, asset],
    queryFn: () => fetchStakedSeamTokenData(stakedAsset, asset),
    enabled: Boolean(stakedAsset) && Boolean(asset),
  });
};
