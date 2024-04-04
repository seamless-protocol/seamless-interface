import { FlexRow, Typography } from "@shared";

import { AssetCard } from "./AssetCard";
import { useAssetPickerState } from "../hooks/useAssetPickerState";
import { useFetchAllMarkets } from "../../state/common/hooks/useFetchAllMarkets";

export const AssetPicker = () => {
  const { asset, isStrategy, setAsset, setIsStrategy } = useAssetPickerState({});

  const { data: allMarkets } = useFetchAllMarkets();

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
        {allMarkets?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              const { address, isStrategy } = item;
              setAsset(asset === address ? undefined : address);
              setIsStrategy(asset === address ? undefined : isStrategy);
            }}
          >
            <AssetCard isSelected={item.address === asset && Boolean(item.isStrategy) === isStrategy} {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};
