import { type UnderlyingAsset, type StakedSeam } from "../types/StakedSeam";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { useQuery } from "@tanstack/react-query";

export const fetchStakedSeamTokenData = async (stakedTokenAddress: Address, underlyingAssetAddress: Address) => {
  try {
    const [underlyingAssetData, stakedAssetData] = await Promise.all([
      fetchToken(underlyingAssetAddress),
      fetchToken(stakedTokenAddress),
    ]);

    const underlyingAsset: UnderlyingAsset = {
      ...underlyingAssetData,
      address: underlyingAssetAddress,
    };
    const stakedSeamData: StakedSeam = {
      ...stakedAssetData,
      address: stakedTokenAddress,
      underlying: underlyingAsset,
    };

    return stakedSeamData;
  } catch (error) {
    console.error("Error fetching staked SEAM token data:", error);
    throw error;
  }
};

export const useFetchStakedSeamTokenData = () => {
  return useQuery({
    queryKey: ["useFetchStakedSeamTokenData", STAKED_SEAM_ADDRESS, SEAM_ADDRESS],
    queryFn: () => fetchStakedSeamTokenData(STAKED_SEAM_ADDRESS, SEAM_ADDRESS),
  });
};
