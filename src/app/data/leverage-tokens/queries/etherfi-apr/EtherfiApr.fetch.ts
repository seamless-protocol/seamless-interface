import { ViewNumber, formatFetchNumberToViewNumber } from "@shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { IS_DEV_MODE } from "../../../../../globals";

/**
 * 1) The shape of the JSON returned by Ether.fi’s /protocol-detail endpoint:
 *    {
 *      "7_day_apr": 2.68,
 *      "7_day_restaking_apr": 1.3050994875671165,
 *      "tvl": 2216669,
 *      "buffer_eth": 51363
 *    }
 */
interface EtherFiRawResponse {
  "7_day_apr": number;
  "7_day_restaking_apr": number;
  tvl: number;
  buffer_eth: number;
}

/**
 * 2) Our “mapped” return type, with renamed fields (camelCase),
 *    plus a ViewBigInt for the computed aprPreFees.
 */
export interface EtherFiAprData {
  sevenDayApr: number;
  sevenDayRestakingApr: number;
  tvl: number;
  bufferEth: number;
  totalAPR: ViewNumber;
  stakingAPR: ViewNumber;
  restakingAPR: ViewNumber;
}

/**
 * Fetches Ether.fi’s protocol‐detail, renames all fields, computes the fees APR,
 * and returns everything in one object conforming to EtherFiApyData.
 */

// todo: how do i felter APY per LT?
export async function fetchEtherFiApr(): Promise<EtherFiAprData> {
  const queryClient = getQueryClient();

  return queryClient.fetchQuery({
    queryKey: ["etherFiData"],
    ...queryConfig.semiSensitiveDataQueryConfig,
    queryFn: async (): Promise<EtherFiAprData> => {
      const res = await fetch("https://misc-cache.seamlessprotocol.com/etherfi-protocol-detail");
      if (!res.ok) {
        throw new Error(`Failed to fetch Ether.fi data (status ${res.status}): ${res.statusText}`);
      }
      const raw = (await res.json()) as EtherFiRawResponse;

      const sevenDayApr = raw["7_day_apr"];
      const sevenDayRestakingApr = raw["7_day_restaking_apr"];
      const { tvl, buffer_eth: bufferEth } = raw;

      const totalAPR = sevenDayApr + sevenDayRestakingApr;

      return {
        sevenDayApr,
        sevenDayRestakingApr,
        tvl,
        bufferEth,
        totalAPR: formatFetchNumberToViewNumber({
          value: totalAPR,
          symbol: "%",
        }),
        stakingAPR: formatFetchNumberToViewNumber({
          value: sevenDayApr,
          symbol: "%",
        }),
        restakingAPR: formatFetchNumberToViewNumber({
          value: sevenDayRestakingApr,
          symbol: "%",
        }),
      };
    },
    retry: IS_DEV_MODE ? 0 : 3,
  });
}
