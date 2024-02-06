import { Address } from "viem";
import EthLogo from "../../../../assets/eth.svg";
import {
  WETH_ADDRESS,
  sWETH_ADDRESS,
  variableDebtSeamWETH_ADDRESS,
} from "../../../meta/constants";

export interface AssetMarketConfig {
  name: string;
  symbol: string;
  logo: string;
  address: Address;
  sTokenAddress: Address;
  debtTokenAddress: Address; // Variable debt token address because stable borrow rate is not supported
}

export const lendingAssets: AssetMarketConfig[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: EthLogo,
    address: WETH_ADDRESS,
    sTokenAddress: sWETH_ADDRESS,
    debtTokenAddress: variableDebtSeamWETH_ADDRESS,
  },
];
