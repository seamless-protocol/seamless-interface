import React from "react";
import { Address } from "viem";
import { useFetchAssetByAddress } from "../../../statev3/common/hooks/useFetchAssetByAddress";

export const StrategyGuard: React.FC<{
  asset?: Address;
  children?: React.ReactNode;
}> = ({ asset, children }) => {
  const { data } = useFetchAssetByAddress(asset);

  if (data?.isStrategy) return children;

  return null;
};
