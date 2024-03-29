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
  TypographyVX,
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
                <TypographyVX type="bold1">Strategy</TypographyVX>
                <TypographyVX type="bold1">APY, up to</TypographyVX>
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
                      <TypographyVX type="bold4">Add to strategy</TypographyVX>
                      <TypographyVX type="regular3">Multiply wstETH staking rewards</TypographyVX>
                    </FlexCol>
                    <RHFAmountInput {...mockProps} />
                  </FlexCol>

                  <FlexCol className="gap-4">
                    <TypographyVX type="bold3">Multiplier</TypographyVX>
                    <FlexCol>
                      <RHFInputSliderField name="test" min="0" max="2" />
                      <FlexRow className="justify-between pl-1">
                        <TypographyVX type="medium3">3x</TypographyVX>
                        <TypographyVX type="medium3">5x</TypographyVX>
                        <TypographyVX type="medium3">10x</TypographyVX>
                      </FlexRow>
                    </FlexCol>
                  </FlexCol>

                  <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
                    <TypographyVX type="bold3">Summary</TypographyVX>
                    <FlexRow className="text-navy-600 justify-between">
                      <TypographyVX type="bold2">Estimated APY</TypographyVX>
                      <TypographyVX type="medium2" className="text-navy-1000">
                        9.33%
                      </TypographyVX>
                    </FlexRow>
                    <FlexRow className="text-navy-600 justify-between">
                      <TypographyVX type="bold2">Rewards APR</TypographyVX>
                      <TypographyVX type="medium2" className="text-navy-1000">
                        9.33%
                      </TypographyVX>
                    </FlexRow>
                    <FlexRow className="text-navy-600 justify-between">
                      <TypographyVX type="bold2">Est. time to break even</TypographyVX>
                      <TypographyVX type="medium2" className="text-navy-1000">
                        3 days
                      </TypographyVX>
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
