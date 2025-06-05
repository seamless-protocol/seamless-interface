import { useQuery } from "@tanstack/react-query";
import { Address, parseUnits } from "viem";
import { readContractQueryOptions } from "wagmi/query";
import { fetchDecimals } from "../../../../shared";
import { leverageManagerAbi, leverageManagerAddress } from "../../../generated";
import { fetchCollateralAsset } from "../../../statev3/queries/CollateralAsset.all";
import { disableCacheQueryConfig } from "../../../statev3/settings/queryConfig";
import { getConfig, queryContract } from "../../../utils/queryContractUtils";

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

  const previewRedeemData = await queryContract({
    ...readContractQueryOptions(getConfig(), {
      address: leverageManagerAddress,
      abi: leverageManagerAbi,
      functionName: "previewRedeem",
      args: [leverageToken, amountBigInt],
    }),
  });
  return previewRedeemData;
};

export const useFetchPreviewRedeem = (leverageToken?: Address, amount?: string) => {
  return useQuery({
    queryKey: ["fetchPreviewRedeem", leverageToken, amount],
    queryFn: () => fetchPreviewRedeem({ leverageToken: leverageToken!, amount: amount! }),
    enabled: !!leverageToken && !!amount,
    ...disableCacheQueryConfig,
  });
};
