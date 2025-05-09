import * as Sentry from "@sentry/react";
import React from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IS_DEV_MODE } from "../../globals";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

export const CustomQueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {IS_DEV_MODE && <ReactQueryDevtools initialIsOpen={false} />}
  </QueryClientProvider>
);
