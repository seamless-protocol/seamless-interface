import { Address } from "viem";
import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  sDAI_ADDRESS,
  sUSDC_ADDRESS,
  sUSDbC_ADDRESS,
  sWETH_ADDRESS,
  scbETH_ADDRESS,
  swstETH_ADDRESS,
  variableDebtSeamDAI_ADDRESS,
  variableDebtSeamUSDC_ADDRESS,
  variableDebtSeamUSDbC_ADDRESS,
  variableDebtSeamWETH_ADDRESS,
  variableDebtSeamcbETH_ADDRESS,
  variableDebtSeamwstETH_ADDRESS,
} from "../../../meta/constants";
import ethLogo from "../../../../assets/eth.svg";
import usdbcLogo from "../../../../assets/usdbc.svg";
import cbethLogo from "../../../../assets/cbeth.svg";
import usdcLogo from "../../../../assets/usdc.svg";
import daiLogo from "../../../../assets/dai.svg";
import wstethLogo from "../../../../assets/wsteth.svg";

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
    logo: ethLogo,
    address: WETH_ADDRESS,
    sTokenAddress: sWETH_ADDRESS,
    debtTokenAddress: variableDebtSeamWETH_ADDRESS,
  },
  {
    name: "USD Base Coin",
    symbol: "USDbC",
    logo: usdbcLogo,
    address: USDBC_ADDRESS,
    sTokenAddress: sUSDbC_ADDRESS,
    debtTokenAddress: variableDebtSeamUSDbC_ADDRESS,
  },
  {
    name: "Coinbase Wrapped STaked Ether",
    symbol: "cbETH",
    logo: cbethLogo,
    address: CBETH_ADDRESS,
    sTokenAddress: scbETH_ADDRESS,
    debtTokenAddress: variableDebtSeamcbETH_ADDRESS,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    logo: usdcLogo,
    address: USDC_ADDRESS,
    sTokenAddress: sUSDC_ADDRESS,
    debtTokenAddress: variableDebtSeamUSDC_ADDRESS,
  },
  {
    name: "Dai",
    symbol: "DAI",
    logo: daiLogo,
    address: DAI_ADDRESS,
    sTokenAddress: sDAI_ADDRESS,
    debtTokenAddress: variableDebtSeamDAI_ADDRESS,
  },
  {
    name: "Wrapped liquid Staked Ether 2.0",
    symbol: "wstETH",
    logo: wstethLogo,
    address: WSTETH_ADDRESS,
    sTokenAddress: swstETH_ADDRESS,
    debtTokenAddress: variableDebtSeamwstETH_ADDRESS,
  },
];
