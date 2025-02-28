import { getQueryClient } from "../../../../contexts/CustomQueryClientProvider";
import { getEquityContractQueryOptions } from "../Equity/Equity.fetch";
import { getTotalSupplyContractQueryOptions } from "../../../common/queries/TotalSupply/TotalSupply.fetch";
import { Address } from "viem";
import { isEqual } from "lodash";

// Invalidation function that accepts an array of dependency keys
export const invalidateDependentQueries = (dependencyKeys: any[]) => {
  const queryClient = getQueryClient();

  queryClient.invalidateQueries({
    predicate: (query) => {
      // Check each dependency key: if any of them are found in the composite query key, invalidate the query
      return dependencyKeys.some((depKey) => query.queryKey.some((keyPart) => isEqual(keyPart, depKey)));
    },
  });
};

// Example usage:
// When equity data changes:
export const invalidateEquityAndDependents = (address: Address) => {
  const equityKey = getEquityContractQueryOptions(address).queryKey;
  invalidateDependentQueries([equityKey]);
};

// When totalSupply changes:
export const invalidateTotalSupplyAndDependents = (address: Address) => {
  const totalSupplyKey = getTotalSupplyContractQueryOptions(address).queryKey;
  invalidateDependentQueries([totalSupplyKey]);
};
