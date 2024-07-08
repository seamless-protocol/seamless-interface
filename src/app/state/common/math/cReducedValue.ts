/**
 * Calculates the reduced value based on the given reduction percentage.
 *
 * @param {number} reductionPercentage - The percentage by which to reduce the value.
 * @param {bigint} value - The original value to be reduced.
 * @returns {bigint | undefined} - The reduced value or undefined if the input value is not provided.
 */

export const getReducedValue = (reductionPercentage: number, value?: bigint) => {
  if (value == null) return undefined;

  const multiplier = BigInt(1000 - reductionPercentage * 10);

  return (value * multiplier) / 1000n;
};
