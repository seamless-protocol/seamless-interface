import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  scbETH_ADDRESS,
  sDAI_ADDRESS,
  sUSDbC_ADDRESS,
  sUSDC_ADDRESS,
  sWETH_ADDRESS,
  swstETH_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  wstETHBooster_ADDRESS,
} from "@meta";
import { RouterConfig } from "@router";
import { ExternalLink } from "@shared";
import { Address } from "viem";

const assetLinks = {
  lending: {
    [USDBC_ADDRESS]: sUSDbC_ADDRESS,
    [USDC_ADDRESS]: sUSDC_ADDRESS,
    [WETH_ADDRESS]: sWETH_ADDRESS,
    [CBETH_ADDRESS]: scbETH_ADDRESS,
    [DAI_ADDRESS]: sDAI_ADDRESS,
    [WSTETH_ADDRESS]: swstETH_ADDRESS,
  },
  strategy: {
    [WSTETH_ADDRESS]: wstETHBooster_ADDRESS,
  },
};

export const VaultsLink: React.FC<{
  asset?: Address;
  isStrategy?: boolean;
}> = ({ asset, isStrategy }) => {
  const validAssets = isStrategy ? assetLinks.strategy : assetLinks.lending;

  if (asset == null || !validAssets[asset]) {
    return null;
  }

  return (
    <ExternalLink url={RouterConfig.Builder.vaults(validAssets[asset])} className="text-regular3">
      Analytics
    </ExternalLink>
  );
};
