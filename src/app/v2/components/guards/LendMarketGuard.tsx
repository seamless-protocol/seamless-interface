import React from "react";
import { Address } from "viem";
import { useStateAssetByAddress } from "../../../state/common/hooks/useFetchAllAssetsState";

export const LendMarketGuard: React.FC<{
  asset?: Address;
  children?: React.ReactNode;
}> = ({ asset, children }) => {
  const { data } = useStateAssetByAddress(asset);

  if (!data?.isStrategy) return children;

  return null;
};
