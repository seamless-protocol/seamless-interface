import { FlexCol, TypographyV2, FlexRow } from "@shared";

import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export const Heading = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-5">
        <FlexCol className="gap-3">
          <FlexCol className="gap-2">
            <TypographyV2 type="bold5">Multiply wstETH staking rewards</TypographyV2>
            <TypographyV2 type="regular1">
              This integrated Liquidity Market (ILM) uses wstETH deposits to borrow ETH, which is used to purchase more
              wstETH to achieve the targeted multiple. This amplifies the participant&apos;s wstETH and ETH staking
              reward exposure.
            </TypographyV2>
          </FlexCol>
          <FlexRow className="gap-2">
            <TypographyV2 type="medium3">Learn more</TypographyV2>
            <ArrowRightCircleIcon width={22} />
          </FlexRow>
        </FlexCol>
      </div>
      <div className="col-span-7">
        <FlexRow className="gap-24 justify-center w-full mt-2">
          <FlexCol className="gap-1 text-center">
            <TypographyV2 type="regular3">TVL</TypographyV2>
            <TypographyV2 type="bold5">XX / XX</TypographyV2>
          </FlexCol>
          <FlexCol className="gap-1 text-center">
            <TypographyV2 type="regular3">APY, up to</TypographyV2>
            <TypographyV2 type="bold5">12.32%</TypographyV2>
          </FlexCol>
          <FlexCol className="gap-1 text-center">
            <TypographyV2 type="regular3">Oracle price</TypographyV2>
            <TypographyV2 type="bold5">$2.36k</TypographyV2>
          </FlexCol>
        </FlexRow>
      </div>
    </div>
  );
};
