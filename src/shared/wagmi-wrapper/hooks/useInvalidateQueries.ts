import { QueryKey, useQueryClient } from "@tanstack/react-query";

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

  const invalidateMany = async (seamlessQueriesToInvalidate: QueryKey[]) => {
    const promises = seamlessQueriesToInvalidate.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey })
    );
    await Promise.all(promises);
  };

  return { invalidateMany };
}
