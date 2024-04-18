export function maxBigInt(values: Array<bigint | undefined>): bigint | undefined {
  // Filter out undefined values
  const validValues = values.filter((value): value is bigint => value !== undefined);

  // If no valid values are found, return undefined
  if (validValues.length === 0) {
    return undefined;
  }

  // Reduce the array to find the maximum value
  return validValues.reduce((max, value) => (value > max ? value : max), validValues[0]);
}
