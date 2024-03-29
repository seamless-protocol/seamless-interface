import { Heading } from "./Heading";
import { AssetCard, AssetCardProps } from "./AssetCard";

import randomAsset from "@assets/tokens/wsteth.svg";
import diagramPng from "@assets/wsteth-diagram.svg";

import {
  Accordion,
  AccordionItem,
  FlexCol,
  FlexRow,
  MyFormProvider,
  RHFAmountInput,
  RHFInputSliderField,
  Typography,
} from "@shared";
import { useForm } from "react-hook-form";
import { Address } from "viem";
import { sWETH_ADDRESS } from "@meta";
import { useState } from "react";

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

const mockProps = {
  name: "amount",
  assetAddress: sWETH_ADDRESS as Address,
  walletBalance: {
    value: "1.0",
    viewValue: "1",
    bigIntValue: BigInt("1000000000000000000"),
    symbol: "ETH",
  },
  usdValue: "2000 USD",
};

export const EarnTab = () => {
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<number | undefined>(undefined);

  const methods = useForm<{
    amount: string;
  }>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit } = methods;

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
              <MyFormProvider methods={methods} onSubmit={handleSubmit(() => {})}>
                <FlexCol className="gap-8">
                  <FlexCol className="gap-6">
                    <FlexCol className="gap-">
                      <Typography type="bold4">Add to strategy</Typography>
                      <Typography type="regular3">Multiply wstETH staking rewards</Typography>
                    </FlexCol>
                    <RHFAmountInput {...mockProps} />
                  </FlexCol>

                  <FlexCol className="gap-4">
                    <Typography type="bold3">Multiplier</Typography>
                    <FlexCol>
                      <RHFInputSliderField name="test" min="0" max="2" />
                      <FlexRow className="justify-between pl-1">
                        <Typography type="medium3">3x</Typography>
                        <Typography type="medium3">5x</Typography>
                        <Typography type="medium3">10x</Typography>
                      </FlexRow>
                    </FlexCol>
                  </FlexCol>

                  <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
                    <Typography type="bold3">Summary</Typography>
                    <FlexRow className="text-navy-600 justify-between">
                      <Typography type="bold2">Estimated APY</Typography>
                      <Typography type="medium2" className="text-navy-1000">
                        9.33%
                      </Typography>
                    </FlexRow>
                    <FlexRow className="text-navy-600 justify-between">
                      <Typography type="bold2">Rewards APR</Typography>
                      <Typography type="medium2" className="text-navy-1000">
                        9.33%
                      </Typography>
                    </FlexRow>
                    <FlexRow className="text-navy-600 justify-between">
                      <Typography type="bold2">Est. time to break even</Typography>
                      <Typography type="medium2" className="text-navy-1000">
                        3 days
                      </Typography>
                    </FlexRow>
                  </FlexCol>

                  <button
                    className="text-bold3 bg-metalic text-neutral-0 rounded-[100px]
                  py-4 px-32 items-center text-center"
                  >
                    Add to strategy
                  </button>
                </FlexCol>
              </MyFormProvider>
            </div>

            <div className="bg-neutral-0 shadow-card rounded-card py-6 px-8 mt-4">
              <Accordion>
                <AccordionItem title="Learn more about this strategy">
                  <img src={diagramPng} alt="ilmDiagram" className="hover:scale-125 ease-in duration-150" />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
