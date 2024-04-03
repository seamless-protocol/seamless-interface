import { FlexRow, Typography } from "@shared";

import randomAsset from "@assets/tokens/wsteth.svg";
import { AssetCardProps, AssetCard } from "./AssetCard";
import { useAssetPickerState } from "../hooks/useAssetPickerState";

const mockAssets: AssetCardProps[] = [
  {
    address: "0x1",
    isStrategy: true,
    icon: randomAsset,
    title: "Multiply wstETH staking rewards",
    subTitle: "Wrapped Liquid Staked ETH",
    tags: ["ILM"],
    apy: "12.74%",
  },
  {
    address: "0x2",
    icon: randomAsset,
    title: "Supply ETH",
    subTitle: "Ethereum",
    tags: ["LEND"],
    apy: "3.2%",
  },
  {
    address: "0x3",
    icon: randomAsset,
    title: "Supply ETH",
    subTitle: "Ethereum",
    tags: ["LEND"],
    apy: "3.2%",
  },
  {
    address: "0x4",
    isStrategy: true,
    icon: randomAsset,
    title: "Multiply wstETH staking rewards",
    subTitle: "Wrapped Liquid Staked ETH",
    tags: ["ILM"],
    apy: "12.74%",
  },
  {
    address: "0x5",
    icon: randomAsset,
    title: "Supply ETH",
    subTitle: "Ethereum",
    tags: ["LEND"],
    apy: "3.2%",
  },
  {
    address: "0x6",
    icon: randomAsset,
    title: "Supply ETH",
    subTitle: "Ethereum",
    tags: ["LEND"],
    apy: "3.2%",
  },
];

export const AssetPicker = () => {
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
              setAsset(address);
              setIsStrategy(isStrategy);
            }}
          >
            <AssetCard
              isSelected={item.address === asset && Boolean(item.isStrategy) === isStrategy}
              {...item}
              hideBorder={index === mockAssets.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
