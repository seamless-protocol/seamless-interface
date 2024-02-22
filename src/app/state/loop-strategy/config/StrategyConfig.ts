import { Address, zeroAddress } from "viem";
//TODO: Change this to strategy logo once it's known
import ilmwstETHLogo from "@assets/tokens/ilmwstETH.svg";
import EthLogo from "@assets/tokens/eth.svg";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import wstEthDiagram from "@assets/wsteth-diagram.png";
import { WSTETH_ADDRESS, WETH_ADDRESS } from "@meta";

interface AssetConfig {
  name: string;
  symbol: string;
  address: Address;
  logo: string;
}

interface CollateralAssetConfig {
  address: Address;
  sTokenAddress: Address;
  debtTokenAddress: Address;
}

export interface StrategyConfig {
  name: string;
  symbol: string;
  address: Address;
  logo: string;
  diagram: string;
  defaultApy: number;
  collateralAsset: CollateralAssetConfig;
  underlyingAsset: AssetConfig;
  debtAsset: AssetConfig;
}

export const ilmStrategies: StrategyConfig[] = [
  {
    name: "wstETH Booster",
    symbol: "ilmwstETH",
    address: "0x78390FdE18B72E4905F68f3B110c3B4D99Cf725A",
    logo: ilmwstETHLogo,
    diagram: wstEthDiagram,
    defaultApy: 7.74,
    collateralAsset: {
      address: "0xc9ae3B5673341859D3aC55941D27C8Be4698C9e4",
      sTokenAddress: "0xb01C5c4eB40d2F2b64Daa3170F89849d00eA6B44",
      debtTokenAddress: zeroAddress,
    },
    underlyingAsset: {
      name: "Wrapped liquid staked ETH",
      symbol: "wstETH",
      address: WSTETH_ADDRESS,
      logo: WstEthLogo,
    },
    debtAsset: {
      name: "Ethereum",
      symbol: "ETH",
      address: WETH_ADDRESS,
      logo: EthLogo,
    },
  },
];
