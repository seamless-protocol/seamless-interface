import { Address, erc20Abi } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { metadataQueryConfig } from "../../../../shared/state/settings/config";
import { mergeQueryStates } from "../../../../shared/formatters/mergeQueryStates";
import { assetsConfig } from "../../settings/config";
import { AssetBaseConfig } from "../../settings/configTypes";
import { useReadContract } from "wagmi";
import { strategyConfig } from "../../../statev3/settings/config";

export interface FullAssetData extends Omit<AssetBaseConfig, "address"> {
  decimals?: number;
}

// todo rename hook
export const useFullTokenData = (asset?: Address | undefined): FetchData<FullAssetData> => {
  const config = asset
    ? assetsConfig[asset] || strategyConfig[asset]
    : undefined;

  const { data: decimals, ...decimalRest } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const { data: symbol, ...symbolRest } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "symbol",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const { data: name, ...nameRest } = useReadContract({
    address: asset,
    abi: erc20Abi,
    functionName: "name",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  return {
    ...mergeQueryStates([decimalRest, symbolRest, nameRest]),
    data: {
      symbol,
      name,
      decimals,
      ...config,
    },
  };
};
