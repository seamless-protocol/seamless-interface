import { Address, erc20Abi } from "viem";
import { FetchData } from "../../../../shared/types/Fetch";
import { useSeamlessContractRead } from "../../../../shared/wagmi-wrapper/hooks/useSeamlessContractRead";
import { metadataQueryConfig } from "../../../../shared/state/settings/config";
import { mergeQueryStates } from "../../../../shared/formatters/mergeQueryStates";
import { StrategyConfig } from "../../settings/configTypes";
import { strategiesConfig } from "../../settings/config";

export interface FullAssetData extends Omit<StrategyConfig, "address"> {
  decimals?: number;
}

// todo rename hook
export const useFullTokenData = (asset?: Address | undefined): FetchData<FullAssetData> => {
  const config = asset ? strategiesConfig[asset] : undefined;

  const { data: decimals, ...decimalRest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const { data: symbol, ...symbolRest } = useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "symbol",
    query: { ...metadataQueryConfig, enabled: !!asset },
  });

  const { data: name, ...nameRest } = useSeamlessContractRead({
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
    } as FullAssetData,
  };
};
