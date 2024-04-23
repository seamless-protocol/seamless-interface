import { Address } from "viem";
import { useFetchViewDetailUserReserveData } from "../../../../../state/lending-borrowing/hooks/useFetchViewDetailUserReserveData";
import { DisplayTokenAmount, Tooltip } from "@shared";
import { useFetchViewDetailUserEquity } from "../../../../../state/loop-strategy/hooks/useFetchViewDetailUserEquity";
import { useFetchViewAssetBalance } from "../../../../../state/common/queries/useFetchViewAssetBalance";
import { walletBalanceDecimalsOptionsTemp } from "../../../../../../meta";

const CurrentBalanceStrategy: React.FC<{ asset: Address }> = ({ asset }) => {
  const {
    data: { tokenAmount },
    isLoading: isEquityDataLoading,
    isFetched: isEquityDataFetched,
  } = useFetchViewDetailUserEquity(asset, walletBalanceDecimalsOptionsTemp);

  const {
    data: { balance },
    isFetched: isStrategyBalanceFetched,
    isLoading: isStrategyBalanceLoading,
  } = useFetchViewAssetBalance(asset, walletBalanceDecimalsOptionsTemp);

  return (
    <>
      <DisplayTokenAmount
        {...tokenAmount}
        isLoading={isEquityDataLoading}
        isFetched={isEquityDataFetched}
        typography="bold3"
      />
      <Tooltip tooltip={balance?.symbol} size="small">
        <DisplayTokenAmount
          {...balance}
          isLoading={isStrategyBalanceLoading}
          isFetched={isStrategyBalanceFetched}
          typography="secondary12"
          className="max-w-24"
        />
      </Tooltip>
    </>
  );
};

const CurrentBalanceLending: React.FC<{ asset: Address }> = ({ asset }) => {
  const {
    data: { supplied },
    isLoading: isUserReservesDataLoading,
    isFetched: isUserReservesDataFetched,
  } = useFetchViewDetailUserReserveData(asset, walletBalanceDecimalsOptionsTemp);

  return (
    <DisplayTokenAmount
      {...supplied.tokenAmount}
      isLoading={isUserReservesDataLoading}
      isFetched={isUserReservesDataFetched}
      typography="bold3"
    />
  );
};

export const CurrentBalance: React.FC<{ asset: Address; isStrategy: boolean }> = ({ asset, isStrategy }) => {
  return isStrategy ? <CurrentBalanceStrategy asset={asset} /> : <CurrentBalanceLending asset={asset} />;
};
