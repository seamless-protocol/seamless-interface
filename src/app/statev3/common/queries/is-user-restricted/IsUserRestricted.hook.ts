import { useQuery } from "@tanstack/react-query";
import { CountryDataKeys } from "../../query-keys/CountryDataQueryKeys";
import { useAccount } from "wagmi";
import { fetchIsUserRestricted } from "./IsUserRestricted.fetch";

export function useFetchIsUserRestricted() {
  const { isConnected } = useAccount();

  return useQuery({
    queryKey: CountryDataKeys.isUserRestricted(),
    queryFn: () => fetchIsUserRestricted(),
    enabled: isConnected,
  });
}
