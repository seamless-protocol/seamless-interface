// src/utils/queryClient.ts
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => {
      // eslint-disable-next-line no-console
      console.error("QueryCache onError");
      // eslint-disable-next-line no-console
      console.error({ e });
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// This is due to an issue with react-query serializing cache keys with bigint args. https://github.com/TanStack/query/issues/3082
// eslint-disable-next-line func-names
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export const getQueryClient = (): QueryClient => {
  return queryClient;
};

export const CustomQueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
