import { QueryKey } from "@tanstack/react-query";
import { sha256, toBytes } from "viem";

export const Scopes = {
  common: "common",
  morpho: "morpho",
  fuul: "fuul",
  governance: "governance",
};

export enum QueryTypes {
  // eslint-disable-next-line no-unused-vars
  GRAPH_QL_QUERY = "GRAPH_QL_QUERY",
  // eslint-disable-next-line no-unused-vars
  HOOK = "HOOK",
  // eslint-disable-next-line no-unused-vars
  CHILD_API_QUERY = "CHILD_API_QUERY",
}

export function getHashedQueryKey(data: { queryKey: QueryKey }): Record<string, QueryKey> {
  const { queryKey } = data;
  const keyStr = JSON.stringify(queryKey);
  const hash = sha256(toBytes(keyStr));
  return { [hash]: queryKey };
}

/**
 * Return:
 *  - the raw QueryKey arrays you passed in, AND
 *  - each hash‑map wrapped in a single‑element array
 */
export function generateInvalidationKeys(...queryKeys: QueryKey[]): QueryKey[] {
  const originals = queryKeys;
  const hashedArrs = queryKeys.map((qk) => {
    const hashObj = getHashedQueryKey({ queryKey: qk });
    return [hashObj] as QueryKey;
  });

  return [...originals, ...hashedArrs];
}
