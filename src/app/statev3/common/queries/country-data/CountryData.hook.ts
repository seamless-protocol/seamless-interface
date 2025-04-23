import { useQuery } from "@tanstack/react-query";
import { fetchCountryData } from "./UserCountry.fetch";
import { CountryDataKeys } from "../../query-keys/CountryDataQueryKeys";
import { useAccount } from "wagmi";

export function useCountryData() {
  const { isConnected } = useAccount();

  return useQuery({
    queryKey: CountryDataKeys.countryData(),
    queryFn: () => fetchCountryData(),
    enabled: isConnected,
  });
}
