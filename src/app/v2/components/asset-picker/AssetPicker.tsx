import React from "react";
import { FlexRow, Typography } from "@shared";
import { AssetCard } from "./AssetCard";
import { AssetPickerStateHookProps, useAssetPickerState } from "../../hooks/useAssetPickerState";
import { StrategyState, LendMarketState } from "../../../state/common/types/StateTypes";

export interface AssetPickerProps extends AssetPickerStateHookProps {
  data?: (StrategyState | LendMarketState)[];
}

export const AssetPicker: React.FC<AssetPickerProps> = ({ overrideUrlSlug, data }) => {
  const { asset, setAsset } = useAssetPickerState({ overrideUrlSlug });

  return (
    <div className="bg-neutral-100 shadow-card rounded-2xl py-4">
      <FlexRow className="py-2 px-6 pr-8 bg-neutral-100 justify-between border-solid border-b border-b-navy-100">
        <Typography type="bold1">Strategy</Typography>
        <Typography type="bold1">Est. APY</Typography>
      </FlexRow>
      <div className="overflow-y-auto md:max-h-[65vh] scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
        {data?.map((item, index) => (
          <div
            data-cy={`asset-card-${item.address}`}
            key={index}
            onClick={() => {
              const { address } = item;
              if (item.address === asset) {
                setAsset(undefined);
              } else {
                setAsset(address);
              }
            }}
          >
            {item.address ? (
              <AssetCard isSelected={item.address === asset} address={item.address} isStrategy={item.isStrategy} />
            ) : (
              <span />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
