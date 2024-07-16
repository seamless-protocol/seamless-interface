import { FlexRow, FlexCol, DisplayTokenAmount, DisplayMoney, Icon, ViewBigInt } from "@shared";

// todo: props needs to be edited probably? loading state,address etc...
interface TokenRowProps {
  logo: string;
  tokenAmount: ViewBigInt;
  dollarAmount: ViewBigInt;
}

const TokenRow: React.FC<TokenRowProps> = ({ tokenAmount, dollarAmount, logo }) => {
  return (
    <FlexCol>
      <FlexRow className="items-center gap-1 justify-end">
        <Icon src={logo} alt={tokenAmount.symbol || "symbol"} width={16} />
        <DisplayTokenAmount typography="bold2" {...tokenAmount} />
      </FlexRow>
      <FlexRow className="justify-end">
        <DisplayMoney typography="regular1" {...dollarAmount} symbolPosition="before" />
      </FlexRow>
    </FlexCol>
  );
};

export default TokenRow;
