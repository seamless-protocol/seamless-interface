import { QueryKey } from "@tanstack/react-query";
import SHA256 from "crypto-js/sha256";

export const Scopes = {
  morpho: "morpho",
  fuul: "fuul",
};

export enum QueryTypes {
  // eslint-disable-next-line no-unused-vars
  GRAPH_QL_QUERY = "GRAPH_QL_QUERY",
  // eslint-disable-next-line no-unused-vars
  HOOK = "HOOK",
  // eslint-disable-next-line no-unused-vars
  CHILD_API_QUERY = "CHILD_API_QUERY",
}

export interface SeamlessQueryKey {
  [hash: string]: QueryKey;
}

export function getHashedQueryKey(data: { queryKey: QueryKey }): SeamlessQueryKey {
  const { queryKey } = data;
  const keyStr = JSON.stringify(queryKey);
  const hash = SHA256(keyStr).toString();
  return { [hash]: queryKey };
}
