export type AssetType = "Asset" | "Strategy";
export type TagType = "LEND" | "ILM";

export interface AssetBase {
  address?: string
  type: AssetType;
  tags: TagType[];
  // todo add apy? and any other sortable/filterable data
}
export interface AssetState extends AssetBase {
  address?: string
}
export interface StrategyState extends AssetBase {
  address?: string
}