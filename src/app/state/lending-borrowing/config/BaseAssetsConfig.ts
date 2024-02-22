import { Address, zeroAddress } from "viem";
import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  rwstETH_ADDRESS,
  sDAI_ADDRESS,
  sUSDC_ADDRESS,
  sUSDbC_ADDRESS,
  sWETH_ADDRESS,
  scbETH_ADDRESS,
  srwstETH_ADDRESS,
  swstETH_ADDRESS,
  variableDebtSeamDAI_ADDRESS,
  variableDebtSeamUSDC_ADDRESS,
  variableDebtSeamUSDbC_ADDRESS,
  variableDebtSeamWETH_ADDRESS,
  variableDebtSeamcbETH_ADDRESS,
  variableDebtSeamwstETH_ADDRESS,
} from "../../../meta/constants";
import ethLogo from "@assets/tokens/eth.svg";
import usdbcLogo from "@assets/tokens/usdbc.svg";
import cbethLogo from "@assets/tokens/cbeth.svg";
import usdcLogo from "@assets/tokens/usdc.svg";
import daiLogo from "@assets/tokens/dai.svg";
import wstethLogo from "@assets/tokens/wsteth.svg";

export interface BaseAssetConfig {
  name?: string;
  symbol?: string;
  logo?: string;
  hide: boolean;
  address: Address;
  sTokenAddress: Address;
  debtTokenAddress: Address; // Variable debt token address because stable borrow rate is not supported
}

export const baseAssets: BaseAssetConfig[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: ethLogo,
    hide: false,
    address: WETH_ADDRESS,
    sTokenAddress: sWETH_ADDRESS,
    debtTokenAddress: variableDebtSeamWETH_ADDRESS,
  },
  {
    name: "USD Base Coin",
    symbol: "USDbC",
    logo: usdbcLogo,
    hide: false,
    address: USDBC_ADDRESS,
    sTokenAddress: sUSDbC_ADDRESS,
    debtTokenAddress: variableDebtSeamUSDbC_ADDRESS,
  },
  {
    name: "Coinbase Wrapped STaked Ether",
    symbol: "cbETH",
    logo: cbethLogo,
    hide: false,
    address: CBETH_ADDRESS,
    sTokenAddress: scbETH_ADDRESS,
    debtTokenAddress: variableDebtSeamcbETH_ADDRESS,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    logo: usdcLogo,
    hide: false,
    address: USDC_ADDRESS,
    sTokenAddress: sUSDC_ADDRESS,
    debtTokenAddress: variableDebtSeamUSDC_ADDRESS,
  },
  {
    name: "Dai",
    symbol: "DAI",
    logo: daiLogo,
    hide: false,
    address: DAI_ADDRESS,
    sTokenAddress: sDAI_ADDRESS,
    debtTokenAddress: variableDebtSeamDAI_ADDRESS,
  },
  {
    name: "Wrapped liquid Staked Ether 2.0",
    symbol: "wstETH",
    logo: wstethLogo,
    hide: false,
    address: WSTETH_ADDRESS,
    sTokenAddress: swstETH_ADDRESS,
    debtTokenAddress: variableDebtSeamwstETH_ADDRESS,
  },
  {
    hide: true,
    address: rwstETH_ADDRESS,
    sTokenAddress: srwstETH_ADDRESS,
    debtTokenAddress: zeroAddress,
  },
];
