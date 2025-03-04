import {type TokenData} from "../types/TokenData";
import {type StakedSeam} from "../types/StakedSeam";
import { stakedSeamAddress } from "@generated";
import { Address } from "viem";
import { useToken} from "@shared";

export const useFetchTokenData = (): StakedSeam => {
    // TODO: where to get these addresses?
    const token: Address = stakedSeamAddress;
    const asset: Address = "0x1C7a460413dD4e964f96D8dFC56E7223cE88CD85";
    const { data: underlyingAssetTokenData } = useToken(asset);
    const { data: underlyingTokenData} = useToken(token);

    const assetData:TokenData = {
        ...underlyingAssetTokenData,
        address: asset
    }
    const tokenData:StakedSeam = {
        ...underlyingTokenData,
        address: token,
        asset: assetData
    }
  return tokenData;
};