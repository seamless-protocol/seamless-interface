export const FIVE_SECONDS_IN_MS = 5 * 1000;
export const ONE_MINUTE_IN_MS = 60 * 1000;
export const FIVE_MINUTE_IN_MS = 60 * 5 * 1000;
export const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export const disableCacheQueryConfig = {
  staleTime: 0,
  gcTime: 0,
};

export const metadataQueryConfig = {
  staleTime: Infinity,
};

export const infiniteCacheQueryConfig = {
  staleTime: Infinity,
  gcTime: Infinity,
};

export const semiSensitiveDataQueryConfig = {
  staleTime: 60 * 1000, // one minute
};

export const heavyDataQueryConfig = {
  staleTime: 5 * 60 * 60 * 1000, // 5 hours
  gcTime: 5 * 60 * 60 * 1000, // 5 hours
};

export const analyticsDataQueryConfig = {
  staleTime: ONE_HOUR_IN_MS,
  gcTime: ONE_HOUR_IN_MS,
};

export const walletDataQueryConfig = {
  staleTime: ONE_HOUR_IN_MS,
  gcTime: ONE_HOUR_IN_MS,
};

export const platformDataQueryConfig = {
  staleTime: ONE_HOUR_IN_MS,
  gcTime: ONE_HOUR_IN_MS,
};

export const queryConfig = {
  disableCacheQueryConfig,
  metadataQueryConfig,
  infiniteCacheQueryConfig,
  semiSensitiveDataQueryConfig,
  heavyDataQueryConfig,
  analyticsDataQueryConfig,
  walletDataQueryConfig,
  platformDataQueryConfig,
};
