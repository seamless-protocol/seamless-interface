import { Heading } from "./Heading";
import { AssetCard, AssetCardProps } from "./AssetCard";

import randomAsset from "@assets/tokens/wsteth.svg";

import { FlexRow, Typography } from "@shared";
import { useState } from "react";
import { FormWrapper } from "./form/FormWrapper";

const mockAssets: AssetCardProps[] = [
  {
    icon: randomAsset,
    title: "Multiply wstETH staking rewards",
    subTitle: "Wrapped Liquid Staked ETH",
    tags: ["ILM"],
    apy: "12.74%",
  },
  {
    icon: randomAsset,
    title: "Supply ETH",
    subTitle: "Ethereum",
    tags: ["LEND"],
    apy: "3.2%",
  },
  {
    icon: randomAsset,
    title: "Supply ETH",
    subTitle: "Ethereum",
    tags: ["LEND"],
    apy: "3.2%",
  },
];

export const EarnTab = () => {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | undefined>(undefined);

  return (
    <div>
      <Heading />
      <div className="mt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-5">
            <div className="bg-neutral-0 shadow-card rounded-2xl py-6">
              <div className="h-12" />
              <FlexRow
                className="py-2 px-6 pr-8 bg-neutral-100 justify-between 
                border-solid border-b border-b-navy-100"
              >
                <Typography type="bold1">Strategy</Typography>
                <Typography type="bold1">APY, up to</Typography>
              </FlexRow>
              {mockAssets.map((asset, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedAssetIndex(selectedAssetIndex === index ? undefined : index)}
                >
                  <AssetCard
                    isSelected={selectedAssetIndex === index}
                    icon={asset.icon}
                    title={asset.title}
                    subTitle={asset.subTitle}
                    tags={asset.tags}
                    apy={asset.apy}
                    hideBorder={index === mockAssets.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-7">
            <div className="bg-neutral-0 px-8 shadow-card rounded-card py-6">
              <FormWrapper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
