// todo move utils from shared to utils folder
import { formatUnits } from "viem";

export const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
export const COMPOUNDING_PERIODS_APY = 1;

export function formatUnitsToNumber(value: string | bigint | undefined, decimals: number) {
  return Number(formatUnits((value || 0) as bigint, decimals));
}
