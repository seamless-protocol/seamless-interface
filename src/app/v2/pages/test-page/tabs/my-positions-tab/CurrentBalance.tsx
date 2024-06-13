import { Address } from "viem";
import { useFetchViewDetailUserReserveData } from "../../../../../state/lending-borrowing/hooks/useFetchViewDetailUserReserveData";
import { DisplayMoney, DisplayTokenAmount, FlexCol, Tooltip, Typography } from "@shared";
import { useFetchViewDetailUserEquity } from "../../../../../state/loop-strategy/hooks/useFetchViewDetailUserEquity";
import { useFetchViewAssetBalance } from "../../../../../state/common/queries/useFetchViewAssetBalance";
import { walletBalanceDecimalsOptionsTemp } from "../../../../../../meta";

const CurrentBalanceStrategy: React.FC<{ asset: Address }> = ({ asset }) => {
  const {
    data: { tokenAmount, dollarAmount },
    ...restEquity
  } = useFetchViewDetailUserEquity(asset, walletBalanceDecimalsOptionsTemp);

  const {
    data: { balance },
    ...restBalance
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
        <DisplayTokenAmount {...restBalance} {...balance} typography="bold3" className="md:max-w-32" />
      </Tooltip>
      <DisplayMoney {...restEquity} {...dollarAmount} typography="secondary12" />
    </>
  );
};

const CurrentBalanceLending: React.FC<{ asset: Address }> = ({ asset }) => {
  const {
    data: { supplied },
    ...restReserveData
  } = useFetchViewDetailUserReserveData(asset);

  return (
    <FlexCol>
      <DisplayTokenAmount {...restReserveData} {...supplied.tokenAmount} typography="bold3" />
      <DisplayMoney {...restReserveData} {...supplied.dollarAmount} />
    </FlexCol>
  );
};

export const CurrentBalance: React.FC<{ asset: Address; isStrategy: boolean }> = ({ asset, isStrategy }) => {
  return isStrategy ? <CurrentBalanceStrategy asset={asset} /> : <CurrentBalanceLending asset={asset} />;
};
