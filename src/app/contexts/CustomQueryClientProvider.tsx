import * as Sentry from "@sentry/react";
import React from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => {
      if (!import.meta.env.VITE_QUERY_ERROR_LOGS_DISABLED) {
        console.error("QueryCache(Global error handler): Error while running query", { e });
      }
      Sentry.captureException(e);
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
