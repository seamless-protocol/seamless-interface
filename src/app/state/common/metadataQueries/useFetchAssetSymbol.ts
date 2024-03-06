import { Address, erc20Abi } from "viem";
import { metadataQueryConfig } from "../../settings/config";
import { useSeamlessContractRead } from "../../../../shared";

export const useFetchAssetSymbol = (asset: Address) => {
  return useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "symbol",
    query: metadataQueryConfig,
  });
};
