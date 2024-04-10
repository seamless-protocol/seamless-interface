import { useEffect } from "react";
import { useQueryParam } from "use-query-params";
import { Address } from "viem";

export interface OverrideUrlSlug {
  asset: string;
  isStrategy: string;
}

export interface AssetPickerStateHookProps {
  overrideUrlSlug?: OverrideUrlSlug;
}

export const useAssetPickerState = ({ overrideUrlSlug }: AssetPickerStateHookProps) => {
  const [asset, setAsset] = useQueryParam<string | undefined>(overrideUrlSlug?.asset || "");
  const [isStrategyParam, setIsStrategyQueryParam] = useQueryParam<string | undefined>(
    overrideUrlSlug?.isStrategy || ""
  );

  return {
    asset: asset as Address,
    isStrategy: isStrategyParam === "true",
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
