import { parseUnits } from "viem";
import { ViewBigInt, formatFetchBigIntToViewBigInt } from "../../../../../shared";
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../../statev3/settings/queryConfig";

const APY_DECIMALS = 2;

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
export interface EtherFiApyData {
  sevenDayApr: number;
  sevenDayRestakingApr: number;
  tvl: number;
  bufferEth: number;
  aprPreFees: ViewBigInt;
}

/**
 * Fetches Ether.fi’s protocol‐detail, renames all fields, computes the “pre‐fees” APR,
 * and returns everything in one object conforming to EtherFiApyData.
 */
export async function fetchEtherFiData(): Promise<EtherFiApyData> {
  const queryClient = getQueryClient();

  return queryClient.fetchQuery({
    queryKey: ["etherFiData"],
    ...queryConfig.semiSensitiveDataQueryConfig,
    queryFn: async (): Promise<EtherFiApyData> => {
      const res = await fetch("https://app.ether.fi/api/protocol/protocol-detail");
      if (!res.ok) {
        throw new Error(`Failed to fetch Ether.fi data (status ${res.status}): ${res.statusText}`);
      }
      const raw = (await res.json()) as EtherFiRawResponse;

      // 2) Rename snake_case → camelCase:
      const sevenDayApr = raw["7_day_apr"];
      const sevenDayRestakingApr = raw["7_day_restaking_apr"];
      const tvl = raw.tvl;
      const bufferEth = raw.buffer_eth;

      const aprPreFeesFloat = sevenDayApr / 0.9 + sevenDayRestakingApr;

      const aprPreFeesBigInt = parseUnits(aprPreFeesFloat.toString(), APY_DECIMALS);

      // 5) Wrap in ViewBigInt so UI can show “%” with correct precision
      const aprPreFeesView: ViewBigInt = formatFetchBigIntToViewBigInt({
        bigIntValue: aprPreFeesBigInt,
        decimals: APY_DECIMALS,
        symbol: "%",
      });

      // 6) Return everything in one shape matching EtherFiApyData
      return {
        sevenDayApr,
        sevenDayRestakingApr,
        tvl,
        bufferEth,
        aprPreFees: aprPreFeesView,
      };
    },
  });
}
