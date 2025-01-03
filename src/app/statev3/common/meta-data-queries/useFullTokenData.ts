import { Address, erc20Abi } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { metadataQueryConfig } from "../../../../shared/state/settings/config";
import { mergeQueryStates } from "../../../../shared/formatters/mergeQueryStates";
import { useReadContract } from "wagmi";
import { strategyConfig } from "../../settings/config";
import { AssetBaseConfig } from "../../settings/configTypes";
import { assetsConfig } from "../../settings/landingMarketConfig";
import { useToken } from "@shared";

export interface FullAssetData extends Omit<AssetBaseConfig, "address"> {
  decimals?: number;
}

// todo rename hook
export const useFullTokenData = (asset?: Address | undefined): FetchData<FullAssetData> => {
  const config = asset ? assetsConfig[asset] || strategyConfig[asset] : undefined;

  const { data, ...dataRest } = useToken(asset);

  const { data: name, ...nameRest } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "name",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  return {
    ...mergeQueryStates([dataRest, nameRest]),
    data: {
      name,
      ...data,
      ...config,
      logo: config?.logo || data?.logo,
    },
  };
};
