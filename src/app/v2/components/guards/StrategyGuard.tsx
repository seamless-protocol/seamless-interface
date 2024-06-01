import React from 'react'
import { Address } from 'viem'
import { useAssetsContext } from '../../../state/contexts'

export const StrategyGuard: React.FC<{
  asset?: Address,
  children?: React.ReactNode
}> = ({ asset, children }) => {

  const { getAssetTypeByAddress } = useAssetsContext();

  if (getAssetTypeByAddress(asset) === "Strategy") return children;

  return null;
}
