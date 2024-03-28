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
  TypographyV2,
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
    type: "ILM",
  },
  {
    icon: randomAsset,
    title: "Supply ETH",
    subTitle: "Ethereum",
    tags: ["LEND"],
    apy: "3.2%",
    type: "LEND",
  },
  {
    icon: randomAsset,
    title: "Supply ETH",
    subTitle: "Ethereum",
    tags: ["LEND"],
    apy: "3.2%",
    type: "LEND",
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
  const [selectedAssetIndex, setSelectedAssetIndex] = useState<
    number | undefined
  >(undefined);

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
                <TypographyV2 type="bold1">Strategy</TypographyV2>
                <TypographyV2 type="bold1">APY, up to</TypographyV2>
              </FlexRow>
              {mockAssets.map((asset, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setSelectedAssetIndex(
                      selectedAssetIndex === index ? undefined : index
                    )
                  }
                  className={`relative overflow-hidden
                            ${selectedAssetIndex === index ? "rounded-r-lg after:content-[''] after:block after:absolute after:inset-0 after:border-r-4 after:border-navy-600 after:rounded-r-lg" : ""}`}
                >
                  <AssetCard
                    isSelected={selectedAssetIndex === index}
                    icon={asset.icon}
                    title={asset.title}
                    subTitle={asset.subTitle}
                    tags={asset.tags}
                    apy={asset.apy}
                    type={asset.type}
                    hideBorder={index === mockAssets.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-7">
            <div className="bg-neutral-0 px-8 shadow-card rounded-card py-6">
              <MyFormProvider
                methods={methods}
                onSubmit={handleSubmit(() => {})}
              >
                <FlexCol className="gap-8">
                  <FlexCol className="gap-6">
                    <FlexCol className="gap-">
                      <TypographyV2 type="bold4">Add to strategy</TypographyV2>
                      <TypographyV2 type="regular3">
                        Multiply wstETH staking rewards
                      </TypographyV2>
                    </FlexCol>
                    <RHFAmountInput {...mockProps} />
                  </FlexCol>

                  <FlexCol className="gap-4">
                    <TypographyV2 type="bold3">Multiplier</TypographyV2>
                    <FlexCol>
                      <RHFInputSliderField name="test" min="0" max="2" />
                      <FlexRow className="justify-between pl-1">
                        <TypographyV2 type="medium3">3x</TypographyV2>
                        <TypographyV2 type="medium3">5x</TypographyV2>
                        <TypographyV2 type="medium3">10x</TypographyV2>
                      </FlexRow>
                    </FlexCol>
                  </FlexCol>

                  <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
                    <TypographyV2 type="bold3">Summary</TypographyV2>
                    <FlexRow className="text-navy-600 justify-between">
                      <TypographyV2 type="bold2">Estimated APY</TypographyV2>
                      <TypographyV2 type="medium2" className="text-navy-1000">
                        9.33%
                      </TypographyV2>
                    </FlexRow>
                    <FlexRow className="text-navy-600 justify-between">
                      <TypographyV2 type="bold2">Rewards APR</TypographyV2>
                      <TypographyV2 type="medium2" className="text-navy-1000">
                        9.33%
                      </TypographyV2>
                    </FlexRow>
                    <FlexRow className="text-navy-600 justify-between">
                      <TypographyV2 type="bold2">
                        Est. time to break even
                      </TypographyV2>
                      <TypographyV2 type="medium2" className="text-navy-1000">
                        3 days
                      </TypographyV2>
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
                  <img src={diagramPng} alt="ilmDiagram" />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
