import { FlexCol, FlexRow, DisplayMoney, Typography } from "../../../../shared";
import { useFetchIlmHeaderInfo } from "../../../state/ILM/hooks/useFetchIlmPageHeader";

export const Heading = () => {
  const { isFetched, data } = useFetchIlmHeaderInfo();
  return (
    <FlexCol className="gap-4 text-text-primary">
      <FlexCol>
        <Typography type="h1">Integrated Liquidity Market</Typography>
        <Typography type="description" color="light">
          Simplify your flow with integrated borrowing strategies
        </Typography>
      </FlexCol>
      <FlexRow className="gap-8">
        <FlexCol className="min-h-14">
          <Typography type="description" color="light">
            Total market size
          </Typography>
          <DisplayMoney
            typography="main21"
            {...data.totalMarketSize}
            symbolColor="light"
            isFetched={isFetched}
          />
        </FlexCol>
      </FlexRow>
    </FlexCol>
  );
};
