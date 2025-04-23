import { useQuery } from "@tanstack/react-query";
import { fetchCountryData } from "./UserCountry.fetch";

export function useCountryData() {
  return useQuery({
    queryKey: ["hookCountryData"],
    queryFn: () => fetchCountryData(),
  });
}
