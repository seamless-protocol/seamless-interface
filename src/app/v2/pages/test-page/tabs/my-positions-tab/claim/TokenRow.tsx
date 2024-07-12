
import { FlexRow, FlexCol, DisplayTokenAmount, DisplayMoney, Icon } from '@shared';

// todo: props needs to be edited probably? loading state,address etc...
interface TokenRowProps {
  logo: string;
  value: number;
  dollarAmount: number;
  symbol: string;
}

const TokenRow: React.FC<TokenRowProps> = ({ logo, value, dollarAmount, symbol }) => {
  return (
    <FlexCol>
      <FlexRow className="items-center gap-1 justify-end">
        <Icon src={logo} alt={symbol} width={16} />
        <DisplayTokenAmount typography='bold2' viewValue={value.toString()} symbol={symbol} />
      </FlexRow>
      <FlexRow className='justify-end'>
        <DisplayMoney typography='regular1' viewValue={dollarAmount.toString()} symbol='$' symbolPosition='before' />
      </FlexRow>
    </FlexCol>
  );
};

export default TokenRow;
