import { Address, erc20Abi } from "viem";
import { useSeamlessContractRead } from "../../../../shared";
import { metadataQueryConfig } from "../../settings/config";

export const useFetchAssetDecimals = (asset: Address) => {
  return useSeamlessContractRead({
    address: asset,
    abi: erc20Abi,
    functionName: "decimals",
    query: metadataQueryConfig,
  });
};
