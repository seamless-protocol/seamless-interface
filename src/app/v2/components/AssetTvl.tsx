import React from "react";
import { Address } from "viem";
import { DisplayMoney, DisplayPercentageProps } from "@shared";
import { useFetchViewDetailTotalSupplied } from "../../state/lending-borrowing/hooks/useFetchViewDetailTotalSupplied";
import { useFetchViewDetailEquity } from "../../state/loop-strategy/queries/useFetchViewEquity";
import { useStateStrategyByAddress } from "../../state/common/hooks/useFetchAllAssets";

interface AssetTvlProps extends DisplayPercentageProps {
  asset: Address;
  isStrategy: boolean;
}

const StrategyTvl: React.FC<{ asset: Address }> = ({ asset, ...rest }) => {
  const { data } = useStateStrategyByAddress(asset);

  const {
    data: { dollarAmount },
    isLoading,
    isFetched,
    // todo why -> length - 1 here?
  } = useFetchViewDetailEquity(data?.subStrategyData[data?.subStrategyData?.length - 1].address);

  return <DisplayMoney isLoading={isLoading} isFetched={isFetched} {...dollarAmount} {...rest} />;
};

const LendingTvl: React.FC<{ asset: Address }> = ({ asset, ...rest }) => {
  const {
    data: {
      totalSupplied: { dollarAmount },
    },
    isLoading,
    isFetched,
  } = useFetchViewDetailTotalSupplied(asset);

  return <DisplayMoney isLoading={isLoading} isFetched={isFetched} {...rest} {...dollarAmount} />;
};

export const AssetTvl: React.FC<AssetTvlProps> = ({ asset, isStrategy, ...rest }) => {
  return isStrategy ? <StrategyTvl asset={asset} {...rest} /> : <LendingTvl asset={asset} {...rest} />;
};
