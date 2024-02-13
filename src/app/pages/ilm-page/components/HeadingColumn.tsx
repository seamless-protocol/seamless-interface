import { DisplayMoney, FlexCol, Typography } from "../../../../shared";

interface HeadingColumnProps {
  title: string;
  value: string | undefined;
  symbol: string | undefined;
  isFetched: boolean | undefined;
}

export const HeadingColumn: React.FC<HeadingColumnProps> = ({
  title,
  value,
  symbol,
  isFetched,
}) => {
  return (
    <FlexCol className="min-h-14">
      <Typography type="description" color="light">
        {title}
      </Typography>
      <DisplayMoney
        typography="main21"
        value={value}
        symbol={symbol}
        symbolColor="light"
        isFetched={isFetched}
      />
    </FlexCol>
  );
};
