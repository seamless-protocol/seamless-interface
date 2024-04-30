// todo: move this file to some other folder?

export function multiplyBigInts(values: (bigint | undefined)[]): bigint | undefined {
  if (values.some(value => value === undefined)) {
    return undefined;
  }
  return values.reduce((acc, value) => acc! * value!, BigInt(1));
}

export function divideBigInts(numerator: bigint | undefined, denominator: bigint | undefined): bigint | undefined {
  if (numerator === undefined || denominator === undefined || denominator === BigInt(0)) {
    return undefined;
  }
  return numerator / denominator;
}

export function expBigInt(base?: bigint, exponent?: number): bigint | undefined {
  if (base === undefined) return undefined;
  if (exponent === undefined) return undefined;

  return BigInt(`${base.toString()}e${exponent}`);
}
