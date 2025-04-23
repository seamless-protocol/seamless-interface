import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { queryConfig } from "../../../settings/queryConfig";

export async function fetchBlacklist(): Promise<string[]> {
  const queryClient = getQueryClient();

  return queryClient.fetchQuery({
    queryKey: ["fetchBlacklist"],
    queryFn: async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/aws-samples/aws-waf-embargoed-countries-ofac/master/source/resources/embargoed-countries.json"
      );
      if (!res.ok) throw new Error("Failed to load embargo list");
      const data = await res.json();
      const codes: string[] = data["embargoed-countries"].map((c: any) => c.code);
      // Always include US for MVP
      return Array.from(new Set([...codes, "US"]));
    },
    ...queryConfig.metadataQueryConfig,
  });
}
