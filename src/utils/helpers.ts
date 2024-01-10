import { formatUnits } from "viem";
import contractsInfo from "../../config/addresses/deployed-contracts.json";

export function getContractInfo(contractName: string): {
  address: string;
  abi: any[];
} {
  return contractsInfo[contractName];
}

export function formatToNumber(value: string, decimals: number) {
  return Number(formatUnits(value as unknown as bigint, decimals));
}

export function formatOnTwoDecimals(input: string | number): string {
  if (!input) {
    return "0.00";
  }

  const parsedNumber = parseFloat(input.toString());

  if (parsedNumber >= 1000000) {
    return (parsedNumber / 1000000).toFixed(2) + "M";
  } else if (parsedNumber >= 1000) {
    return (parsedNumber / 1000).toFixed(2) + "K";
  } else {
    return parsedNumber.toFixed(2);
  }
}
