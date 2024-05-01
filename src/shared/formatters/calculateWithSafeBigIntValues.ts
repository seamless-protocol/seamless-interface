type SafeCalculationResult = {
  result: bigint | undefined;
};

export function calculateWithSafeBigIntValues<T extends Record<string, bigint | number | undefined>>(
  inputs: T,
  // eslint-disable-next-line no-unused-vars
  calcFunction: (values: { [K in keyof T]: bigint }) => bigint
): SafeCalculationResult {
  // eslint-disable-next-line no-unused-vars
  const filteredValues: Partial<{ [K in keyof T]: bigint }> = {};
  let isAnyValueUndefined = false;

  (Object.keys(inputs) as Array<keyof T>).forEach(key => {
    const value = inputs[key];
    if (value === undefined) {
      isAnyValueUndefined = true;
    } else {
      filteredValues[key] = BigInt(value);
    }
  });

  if (isAnyValueUndefined) {
    return { result: undefined };
  }
  // eslint-disable-next-line no-unused-vars
  const result = calcFunction(filteredValues as { [K in keyof T]: bigint });
  return { result };
}
