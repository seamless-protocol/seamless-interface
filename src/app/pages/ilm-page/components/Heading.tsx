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
