import { useQueryParam } from "use-query-params";
import { Address } from "viem";
import { useStateAssetByAddress } from "../../state/common/hooks/useFetchAllAssetsState";
import { LendMarketState, StrategyState } from "../../state/common/types/StateTypes";

export interface OverrideUrlSlug {
  asset: string;
  isStrategy: string;
}

export interface AssetPickerStateHookProps {
  overrideUrlSlug?: OverrideUrlSlug;
}

export const useAssetPickerState = ({
  overrideUrlSlug,
}: AssetPickerStateHookProps): {
  asset?: Address;
  isStrategy: boolean;
  setAsset: (newValue: string | undefined) => void;
  assetState: StrategyState | LendMarketState | undefined;
} => {
  const [asset, setAsset] = useQueryParam<string | undefined>(overrideUrlSlug?.asset || "");
  const { data: assetState } = useStateAssetByAddress(asset as Address | undefined);

  return {
    isStrategy: assetState?.isStrategy || false,
    assetState,
    asset: asset as Address | undefined,
    setAsset,
  };
};
