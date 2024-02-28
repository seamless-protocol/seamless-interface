import { useQueryClient } from "@tanstack/react-query";
import { useQueryStore } from "../store/QueryStore"; // Adjust the import path as necessary

/**
 * `useInvalidateQueries` Hook
 *
 * A React hook that provides a function to invalidate multiple queries in the React Query cache. This is particularly useful for ensuring data consistency by forcing refetches of specified queries after mutations or other data-altering operations.
 *
 * ## Key Features:
 * - **Batch Invalidation**: Allows for invalidating multiple queries at once, reducing the complexity of managing cache consistency across the application.
 * - **Flexible Query Identification**: Works with a flexible system for identifying queries to be invalidated, leveraging the application's query key management.
 *
 * ## Usage:
 *
 * ```tsx
 * const { invalidateMany } = useInvalidateQueries();
 *
 * // Invalidate specific queries by their identifiers
 * invalidateMany(["userList", "profileData"]);
 * ```
 *
 * This hook abstracts the complexity of directly interacting with the React Query cache for query invalidation, providing a simplified interface for a common operation.
 *
 * @returns An object containing the `invalidateMany` function, which can be used to invalidate multiple queries based on their identifiers.
 */
export function useInvalidateQueries() {
  const queryClient = useQueryClient();
  const { getQueryKey } = useQueryStore();

  const invalidateMany = async (seamlessQueriesToInvalidate: string[]) => {
    const promises = seamlessQueriesToInvalidate.map((query) => {
      const queryKey = getQueryKey(query);
      return queryKey
        ? queryClient.invalidateQueries({ queryKey })
        : Promise.resolve();
    });
    await Promise.all(promises);
  };

  return { invalidateMany };
}
