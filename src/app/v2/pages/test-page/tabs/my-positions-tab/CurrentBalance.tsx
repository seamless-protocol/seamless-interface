import { Address } from "viem";
import { useFetchViewDetailUserReserveData } from "../../../../../state/lending-borrowing/hooks/useFetchViewDetailUserReserveData";
import { DisplayMoney, DisplayTokenAmount, FlexCol, Tooltip, Typography } from "@shared";
import { useFetchViewDetailUserEquity } from "../../../../../state/loop-strategy/hooks/useFetchViewDetailUserEquity";
import { useFetchViewAssetBalance } from "../../../../../state/common/queries/useFetchViewAssetBalance";
import { walletBalanceDecimalsOptionsTemp } from "../../../../../../meta";

const CurrentBalanceStrategy: React.FC<{ asset: Address }> = ({ asset }) => {
  const {
    data: { tokenAmount, dollarAmount },
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
      <Tooltip
        tooltip={
          <FlexCol>
            <Typography type="secondary12">
              {balance.viewValue} {balance.symbol}
            </Typography>
            <Typography type="secondary12">
              {tokenAmount?.viewValue} {tokenAmount?.symbol}
            </Typography>
          </FlexCol>
        }
        size="small"
      >
        <DisplayTokenAmount
          {...balance}
          isLoading={isStrategyBalanceLoading}
          isFetched={isStrategyBalanceFetched}
          typography="bold3"
          className="max-w-32"
        />
      </Tooltip>
      <DisplayMoney
        {...dollarAmount}
        isLoading={isEquityDataLoading}
        isFetched={isEquityDataFetched}
        typography="secondary12"
      />
    </>
  );
};

const CurrentBalanceLending: React.FC<{ asset: Address }> = ({ asset }) => {
  const {
    data: { supplied },
    isLoading: isUserReservesDataLoading,
    isFetched: isUserReservesDataFetched,
  } = useFetchViewDetailUserReserveData(asset);

  return (
    <FlexCol>
      <DisplayTokenAmount
        {...supplied.tokenAmount}
        isLoading={isUserReservesDataLoading}
        isFetched={isUserReservesDataFetched}
        typography="bold3"
      />
      <DisplayMoney
        {...supplied.dollarAmount}
        isLoading={isUserReservesDataLoading}
        isFetched={isUserReservesDataFetched}
      />
    </FlexCol>
  );
};

export const CurrentBalance: React.FC<{ asset: Address; isStrategy: boolean }> = ({ asset, isStrategy }) => {
  return isStrategy ? <CurrentBalanceStrategy asset={asset} /> : <CurrentBalanceLending asset={asset} />;
};
