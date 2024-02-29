import { FlexCol, FlexRow, Typography } from "../../../../shared";
import { useFetchViewLendingPoolInfo } from "../../../state/lending-borrowing/hooks/useFetchViewLendingPoolInfo";
import { HeadingColumn } from "./HeadingColumn";

export const Heading = () => {
  const { isFetched, data } = useFetchViewLendingPoolInfo();

  return (
    <FlexCol className="gap-5 text-text-primary">
      <FlexCol>
        <Typography type="h1">Seamless Markets</Typography>
        <Typography type="description" color="light">
          Paving the way for Modern DeFi with lending, borrowing, and automated
          strategies
        </Typography>
      </FlexCol>
      <FlexRow className="gap-8">
        <HeadingColumn
          title="Total market size"
          {...data?.totalMarketSizeUsd}
          isFetched={isFetched}
        />
        <HeadingColumn
          title="Total available"
          {...data?.totalAvailableUsd}
          isFetched={isFetched}
        />
        <HeadingColumn
          title="Total borrows"
          {...data?.totalBorrowsUsd}
          isFetched={isFetched}
        />
      </FlexRow>
    </FlexCol>
  );
};
