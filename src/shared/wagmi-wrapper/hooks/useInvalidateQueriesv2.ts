import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { getHashedQueryKey } from "@meta";

/**
 * `useInvalidateQueries` Hook
 *
 * A React hook that provides a function to invalidate multiple queries in the React Query cache. This is particularly useful for ensuring data consistency by forcing refetch of specified queries after mutations or other data-altering operations.
 *
 * ## Key Features:
 * - **Batch Invalidation**: Allows for invalidating multiple queries at once, reducing the complexity of managing cache consistency across the application.
 * - **Flexible Query Identification**: Works with a flexible system for identifying queries to be invalidated, leveraging the application's query key management.
 *
 * ## Usage:
 *
 * ```tsx
 * const { invalidateMany } = useInvalidateQueriesv2();
 *
 * // Invalidate specific queries by their identifiers
 * invalidateMany(["userList", "profileData"]);
 * ```
 *
 * This hook abstracts the complexity of directly interacting with the React Query cache for query invalidation, providing a simplified interface for a common operation.
 *
 * @returns An object containing the `invalidateMany` function, which can be used to invalidate multiple queries based on their identifiers.
 */

export function useInvalidateQueriesv2() {
  const queryClient = useQueryClient();

  const invalidateMany = async (queries: (QueryKey | undefined)[]) => {
    const promises: any[] = [];

    // Invalidate child queries
    Object.entries(queries).forEach(([_, queryKey]) => {
      promises.push(queryClient.invalidateQueries({ queryKey }));
    });
    await Promise.all(promises);

    const parentPromises: any[] = [];
    // Invalidate parent queries
    Object.entries(queries).forEach(([_, queryKey]) => {
      const parentQueryKey = queryKey
        ? getHashedQueryKey({
            queryKey,
          })
        : undefined;

      parentPromises.push(
        queryClient.invalidateQueries({
          queryKey: [parentQueryKey],
        })
      );
    });

    await Promise.all(parentPromises);
  };

  return { invalidateMany };
}
