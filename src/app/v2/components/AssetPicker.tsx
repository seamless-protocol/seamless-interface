import { FlexRow, Typography } from "@shared";

import { AssetCardProps, AssetCard } from "./AssetCard";
import { useAssetPickerState } from "../hooks/useAssetPickerState";
import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  rwstETH_ADDRESS,
} from "@meta";

const mockAssets: AssetCardProps[] = [
  {
    address: WSTETH_ADDRESS,
    isStrategy: true,
    tags: ["ILM"],
    apy: "12.74%",
  },
  {
    address: WETH_ADDRESS,
    tags: ["LEND"],
    apy: "3.2%",
  },
  {
    address: CBETH_ADDRESS,
    tags: ["LEND"],
    apy: "4.5%",
  },
  {
    address: USDBC_ADDRESS,
    isStrategy: true,
    tags: ["ILM"],
    apy: "8.2%",
  },
  {
    address: DAI_ADDRESS,
    tags: ["LEND"],
    apy: "2.5%",
  },
  {
    address: USDC_ADDRESS,
    tags: ["LEND"],
    apy: "3.5%",
  },
  {
    address: rwstETH_ADDRESS,
    tags: ["LEND"],
    isStrategy: true,
    apy: "10%",
  },
];

export const AssetPicker = () => {
  // get all assets
  const { asset, isStrategy, setAsset, setIsStrategy } = useAssetPickerState({});

  return (
    <div>
      <div className="bg-neutral-0 shadow-card rounded-2xl py-6">
        <div className="h-12" />
        <FlexRow
          className="py-2 px-6 pr-8 bg-neutral-100 justify-between 
      border-solid border-b border-b-navy-100"
        >
          <Typography type="bold1">Strategy</Typography>
          <Typography type="bold1">APY, up to</Typography>
        </FlexRow>
        {mockAssets.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              const { address, isStrategy } = item;
              setAsset(asset === address ? undefined : address);
              setIsStrategy(isStrategy);
            }}
          >
            <AssetCard isSelected={item.address === asset && Boolean(item.isStrategy) === isStrategy} {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};
