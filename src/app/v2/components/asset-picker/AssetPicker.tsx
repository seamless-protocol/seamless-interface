import React from "react";
import { FlexRow, Typography } from "@shared";
import { AssetCard } from "./AssetCard";
import { AssetPickerStateHookProps, useAssetPickerState } from "../../hooks/useAssetPickerState";
import { StrategyState, LendMarketState } from "../../../state/common/types/StateTypes";
import { useFormSettingsContext } from "../forms/contexts/useFormSettingsContext";

export interface AssetPickerProps extends AssetPickerStateHookProps {
  size?: "small" | "normal" | "big";
  data?: (StrategyState | LendMarketState)[];
}

const sizeMap = {
  small: "320px",
  normal: "540px",
  big: "720px",
};

export const AssetPicker: React.FC<AssetPickerProps> = ({ overrideUrlSlug, size, data }) => {
  const { asset, setAsset } = useAssetPickerState({ overrideUrlSlug });
  const { setAsset: setFormAsset, setSubStrategy } = useFormSettingsContext();

  const maxHeightValue = size ? sizeMap[size] : undefined;
  const scrollableStyle: React.CSSProperties = {
    maxHeight: maxHeightValue,
    overflowY: maxHeightValue ? "auto" : undefined,
  };

  return (
    <div className="bg-neutral-100 shadow-card rounded-2xl py-4">
      <FlexRow className="py-2 px-6 pr-8 bg-neutral-100 justify-between border-solid border-b border-b-navy-100">
        <Typography type="bold1">Strategy</Typography>
        <Typography type="bold1">Est. APY</Typography>
      </FlexRow>
      <div
        style={scrollableStyle}
        className="overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100"
      >
        {data?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              const { address, isStrategy } = item;
              if (item.address === asset) {
                setAsset(undefined);
                setFormAsset(undefined);
              } else {
                setAsset(address);
                setFormAsset(address);
              }
              if (!isStrategy) setSubStrategy(undefined);
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
