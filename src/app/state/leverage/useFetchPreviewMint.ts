import { leverageManagerAbi, leverageManagerAddress } from "../../generated";
import { readContractQueryOptions } from "wagmi/query";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { Address, parseUnits } from "viem";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../statev3/settings/queryConfig";
import { fetchCollateralAsset } from "../../statev3/queries/CollateralAsset.all";
import { fetchDecimals } from "../../../shared";

interface FetchPreviewMintInput {
  leverageToken: Address;
  amount: string;
}

interface PreviewMintData {
  collateral: bigint;
  debt: bigint;
  equity: bigint;
  shares: bigint;
  tokenFee: bigint;
  treasuryFee: bigint;
}

export const fetchPreviewMint = async ({ leverageToken, amount }: FetchPreviewMintInput): Promise<PreviewMintData> => {
  const collateral = await fetchCollateralAsset({ leverageToken });
  const decimals = await fetchDecimals(collateral);
  const amountBigInt = parseUnits(amount, decimals);

  return await queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: leverageManagerAddress,
      abi: leverageManagerAbi,
      functionName: "previewMint",
      args: [leverageToken, amountBigInt],
    }),
  });
};

export const useFetchPreviewMint = (leverageToken?: Address, amount?: string) => {
  return useQuery({
    queryKey: ["fetchPreviewMint", leverageToken, amount],
    queryFn: () => fetchPreviewMint({ leverageToken: leverageToken!, amount: amount! }),
    enabled: !!leverageToken && !!amount,
    ...disableCacheQueryConfig,
  });
};
