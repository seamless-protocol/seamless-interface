import contractsInfo from "../../config/addresses/deployed-contracts.json";

export function getContractInfo(contractName: string): {
  address: string;
  abi: any[];
} {
  return contractsInfo[contractName];
}
