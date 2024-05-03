import { parseUnits } from "viem";

export const fParseUnits = (value: string, decimals?: number) => {
  if (decimals == null) return undefined;

  return parseUnits(value, decimals);
};
