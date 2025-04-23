// src/hooks/useCountry.ts
import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";
import { fetchBlacklist } from "./Blacklist.fetch";
import { IS_DEV_MODE } from "../../../../../globals";

async function fetchUserCountry(): Promise<string> {
  const queryClient = getQueryClient();

  return queryClient.fetchQuery({
    queryKey: ["fetchUserCountry"],
    queryFn: async () => {
      if (IS_DEV_MODE && import.meta.env.VITE_DEV_COUNTRY) {
        return import.meta.env.VITE_DEV_COUNTRY;
      }
      const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
      if (!res.ok) throw new Error("CF trace failed");
      const txt = await res.text();
      const m = txt.match(/loc=([A-Z]{2})/);
      return m?.[1] || "US";
    },
    ...queryConfig.metadataQueryConfig,
  });
}

interface CountryData {
  country: string;
  isRestricted: boolean;
}
export async function fetchCountryData(): Promise<CountryData> {
  const [blacklist, country] = await Promise.all([fetchBlacklist(), fetchUserCountry()]);
  return {
    country,
    isRestricted: blacklist.includes(country),
  };
}
