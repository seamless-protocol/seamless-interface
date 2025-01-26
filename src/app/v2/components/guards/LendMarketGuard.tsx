import React from "react";
import { Address } from "viem";
import { useFetchAssetByAddress } from "../../../state/common/hooks/useFetchAssetByAddress";

export const LendMarketGuard: React.FC<{
  asset?: Address;
  children?: React.ReactNode;
}> = ({ asset, children }) => {
  const { data } = useFetchAssetByAddress(asset);

  if (!data?.isStrategy) return children;

  return null;
};
