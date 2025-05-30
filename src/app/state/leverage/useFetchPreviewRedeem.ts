import { leverageManagerAbi, leverageManagerAddress } from "../../generated";
import { readContractQueryOptions } from "wagmi/query";
import { getConfig, queryContract } from "../../utils/queryContractUtils";
import { Address, parseUnits } from "viem";
import { useQuery } from "@tanstack/react-query";
import { disableCacheQueryConfig } from "../../statev3/settings/queryConfig";
import { fetchCollateralAsset } from "../../statev3/queries/CollateralAsset.all";
import { fetchDecimals } from "../../../shared";

interface FetchPreviewRedeemInput {
  leverageToken: Address;
  amount: string;
}

interface PreviewRedeemData {
  collateral: bigint;
  debt: bigint;
  equity: bigint;
  shares: bigint;
  tokenFee: bigint;
  treasuryFee: bigint;
}

export const fetchPreviewRedeem = async ({
  leverageToken,
  amount,
}: FetchPreviewRedeemInput): Promise<PreviewRedeemData> => {
  const collateral = await fetchCollateralAsset({ leverageToken });
  const decimals = await fetchDecimals(collateral);
  const amountBigInt = parseUnits(amount, decimals);

  return await queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: leverageManagerAddress,
      abi: leverageManagerAbi,
      functionName: "previewRedeem",
      args: [leverageToken, amountBigInt],
    }),
  });
};

export const useFetchPreviewRedeem = (leverageToken?: Address, amount?: string) => {
  return useQuery({
    queryKey: ["fetchPreviewRedeem", leverageToken, amount],
    queryFn: () => fetchPreviewRedeem({ leverageToken: leverageToken!, amount: amount! }),
    enabled: !!leverageToken && !!amount,
    ...disableCacheQueryConfig,
  });
};
