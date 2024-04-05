import { useEffect } from "react";
import { useQueryParam } from "use-query-params";
import { Address } from "viem";

interface AssetPickerStateHookProps {
  overrideUrlSlug?: {
    asset: string;
    isStrategy: string;
  };
}

export const useAssetPickerState = ({
  overrideUrlSlug = {
    asset: "asset",
    isStrategy: "isStrategy",
  },
}: AssetPickerStateHookProps) => {
  const [asset, setAsset] = useQueryParam<string | undefined>(overrideUrlSlug.asset);
  const [isStrategyParam, setIsStrategyQueryParam] = useQueryParam<boolean | undefined>(overrideUrlSlug.isStrategy);

  return {
    asset: asset as Address,
    isStrategy: Boolean(isStrategyParam),
    setAsset,
    setIsStrategy: setIsStrategyQueryParam,
  };
};

export const useClearAssetPickerStateOnLeave = ({
  overrideUrlSlug = {
    asset: "asset",
    isStrategy: "isStrategy",
  },
}: AssetPickerStateHookProps) => {
  const { setAsset, setIsStrategy } = useAssetPickerState({ overrideUrlSlug });

  useEffect(() => {
    setAsset(undefined);
    setIsStrategy(undefined);
  }, []);
};
