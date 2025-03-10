import { Address } from "viem";
import { base } from "@wagmi/core/chains";
import { useQuery } from "@tanstack/react-query";
import { fetchFullVaultInfoMapped } from "../full-morpho-info/FullVaultInfo.fetch";
import { MorphoQueryKeys } from "../../query-keys";

export const useFetchFormattedFullVaultInfos = (addresses: Address[], chainId = base.id) => {
  return useQuery({
    queryKey: MorphoQueryKeys.fullVaultInfos(addresses, chainId),
    queryFn: () => Promise.all(addresses.map((address) => fetchFullVaultInfoMapped(address, chainId))),
  });
};
