import { FlexCol, Typography, DisplayTokenAmount, FlexRow, DisplayValue } from "@shared";
import { Address } from "viem";
import { useFetchViewDetailUserReserveData } from "../../../../../state/lending-borrowing/hooks/useFetchViewDetailUserReserveData";
import { useFetchViewUserAccountData } from "../../../../../state/lending-borrowing/queries/useFetchViewUserAccountData";
import {
  Action,
  useFetchViewHealthFactorAfterAction,
} from "../../../../../state/lending-borrowing/hooks/useFetchViewHealthFactorAfterAction";

export const Summary: React.FC<{
  asset: Address;
  amount: string;
}> = ({ asset, amount }) => {
  const {
    data: { supplied },
    ...rest
  } = useFetchViewDetailUserReserveData(asset);

  const {
    data: userAccountData,
    isLoading: isUserAccountDataLoading,
    isFetched: isUserAccountDataFetched,
  } = useFetchViewUserAccountData();

  const {
    data: healthFactorAfterWithdraw,
    isLoading: isFutureHealthFactorLoading,
    isFetched: isFutureHealthFactorFetched,
  } = useFetchViewHealthFactorAfterAction({ reserve: asset, amount, action: Action.Withdraw });

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4 text-navy-600">
      <Typography type="bold3">Summary</Typography>
      <FlexRow className="gap-1 justify-between">
        <Typography type="bold2">Remaining supply</Typography>
        <DisplayTokenAmount {...rest} {...supplied.tokenAmount} typography="medium2" className="text-navy-1000" />
      </FlexRow>
      <FlexRow className="gap-1 justify-between">
        <Typography type="bold2">Health factor </Typography>
        <DisplayValue
          isLoading={isUserAccountDataLoading}
          isFetched={isUserAccountDataFetched}
          viewValue={userAccountData?.healthFactor?.viewValue}
          typography="medium2"
          className="text-navy-1000"
        />
      </FlexRow>
      <FlexRow className="gap-1 justify-between">
        <Typography type="bold2">Future health factor </Typography>
        <DisplayValue
          isLoading={isFutureHealthFactorLoading}
          isFetched={isFutureHealthFactorFetched}
          viewValue={healthFactorAfterWithdraw?.viewValue}
          typography="medium2"
          className="text-navy-1000"
        />
      </FlexRow>
    </FlexCol>
  );
};
