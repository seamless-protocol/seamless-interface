import { FlexCol, FlexRow, Typography } from "../../../../shared";
import { useFetchIlmPageHeader } from "../../../state/ILM/hooks/useFetchIlmPageHeader";
import { HeadingColumn } from "./HeadingColumn";

export const Heading = () => {
  const { isFetched, data } = useFetchIlmPageHeader();

  return (
    <FlexCol className="gap-5 text-text-primary">
      <FlexCol>
        <Typography type="h1">Integrated Liquidity Market</Typography>
        <Typography type="description" color="light">
          Simplify your flow with integrated borrowing strategies
        </Typography>
      </FlexCol>
      <FlexRow className="gap-8">
        <HeadingColumn
          title="Total market size"
          value={data?.totalMarketSizeUsd.viewValue}
          symbol={data?.totalMarketSizeUsd.symbol}
          isFetched={isFetched}
        />
        <HeadingColumn
          title="Total available"
          value={data?.totalAvailableUsd.viewValue}
          symbol={data?.totalAvailableUsd.symbol}
          isFetched={isFetched}
        />
        <HeadingColumn
          title="Total borrows"
          value={data?.totalBorrowsUsd.viewValue}
          symbol={data?.totalBorrowsUsd.symbol}
          isFetched={isFetched}
        />
      </FlexRow>
    </FlexCol>
  );
};
