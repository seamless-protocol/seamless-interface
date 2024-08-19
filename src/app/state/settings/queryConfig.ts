export const disableCacheQueryConfig = {
  staleTime: 0,
  gcTime: 0,
};

export const metadataQueryConfig = {
  staleTime: Infinity,
};

export const semiSensitiveDataQueryConfig = {
  staleTime: 60 * 1000, // one minute
};

export const FIVE_SECONDS_IN_MS = 5 * 1000;
export const ONE_MINUTE_IN_MS = 60 * 1000;
export const ONE_HOUR_IN_MS = 60 * 60 * 1000;
