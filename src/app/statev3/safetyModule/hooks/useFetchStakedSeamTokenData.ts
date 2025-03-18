import { type StakedAsset, type StakedSeam } from "../types/StakedSeam";
import { Address } from "viem";
import { fetchToken } from "@shared";
import { SEAM_ADDRESS, STAKED_SEAM_ADDRESS } from "@meta";
import { useQuery } from "@tanstack/react-query";

export const fetchStakedSeamTokenData = async (stakedToken: Address, asset: Address) => {
  try {
    const [assetTokenData, underlyingAsset] = await Promise.all([fetchToken(asset), fetchToken(stakedToken)]);

    const assetData: StakedAsset = {
      ...assetTokenData,
      address: asset,
    };
    const tokenData: StakedSeam = {
      ...underlyingAsset,
      address: stakedToken,
      asset: assetData,
    };

    return tokenData;
  } catch (error) {
    console.error("Error fetching staked SEAM token data:", error);
    throw error;
  }
};

export const useFetchStakedSeamTokenData = () => {
  const token: Address = STAKED_SEAM_ADDRESS;
  const asset: Address = SEAM_ADDRESS;

  return useQuery({
    queryKey: ["useFetchStakedSeamTokenData", token, asset],
    queryFn: () => fetchStakedSeamTokenData(token, asset),
    enabled: Boolean(token) && Boolean(asset),
  });
};
