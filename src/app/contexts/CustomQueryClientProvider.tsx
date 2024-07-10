// src/utils/queryClient.ts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// This is due to an issue with react-query serializing cache keys with bigint args. https://github.com/TanStack/query/issues/3082
BigInt.prototype['toJSON'] = function () {
  return this.toString()
}

export const getQueryClient = (): QueryClient => {
  return queryClient;
};

export const CustomQueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
