import { FlexCol, Typography, FlexRow, Modal, useFullTokenData } from "@shared";

import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import diagramPng from "@assets/wsteth-diagram.svg";
import { useAssetPickerState } from "../../../../hooks/useAssetPickerState";
import { useTokenDescription } from "../../../../../../shared/state/meta-data-queries/useTokenDescription";
import { assetSlugConfig } from "./config/SlugConfig";

export const Heading = () => {
  const { asset } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });
  const { data: tokenData } = useFullTokenData(asset);
  const description = useTokenDescription(asset);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-5">
        <FlexCol className="gap-3">
          <FlexCol className="gap-2 min-h-20">
            <Typography type="bold5">{tokenData.name || "Choose your strategy to earn APY"}</Typography>
            <Typography type="regular1">{description}</Typography>
          </FlexCol>
          <Modal
            size="biger"
            buttonProps={{
              children: (
                <FlexRow className="gap-2">
                  <Typography type="medium3">Learn more</Typography>
                  <ArrowRightCircleIcon width={22} />
                </FlexRow>
              ),
            }}
          >
            <img src={diagramPng} alt="ilmDiagram" />
          </Modal>
        </FlexCol>
      </div>
      <div className="col-span-7">
        <FlexRow className="gap-24 justify-center w-full mt-2">
          <FlexCol className="gap-1 text-center">
            <Typography type="regular3">TVL</Typography>
            <Typography type="bold5">XX / XX</Typography>
          </FlexCol>
          <FlexCol className="gap-1 text-center">
            <Typography type="regular3">APY, up to</Typography>
            <Typography type="bold5">12.32%</Typography>
          </FlexCol>
          <FlexCol className="gap-1 text-center">
            <Typography type="regular3">Oracle price</Typography>
            <Typography type="bold5">$2.36k</Typography>
          </FlexCol>
        </FlexRow>
      </div>
    </div>
  );
};
