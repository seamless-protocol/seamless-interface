import { OverrideUrlSlug } from "../../../../../hooks/useAssetPickerState";

export const assetSlugConfig: OverrideUrlSlug = {
  asset: "asset",
  isStrategy: "isStrategy",
};

export const earnInputConfig = {
  name: "amount",
  overrideUrlSlug: assetSlugConfig,
};
