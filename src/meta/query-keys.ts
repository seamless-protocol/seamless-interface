export const Scopes = {
  morpho: "morpho",
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
  functionName: string;
  queryType: QueryTypes;
  scope: string;
}
