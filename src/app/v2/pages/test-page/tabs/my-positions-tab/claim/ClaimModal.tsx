import { FlexCol, FlexRow, Modal, Typography, Buttonv2, DisplayMoney } from '@shared';
import TokenRow from './TokenRow';

import seamLogo from '@assets/tokens/seam.svg';

const TOKENS_MOCK = [
  {
    logo: seamLogo,
    value: 10.3443,
    dollarAmount: 10000,
    symbol: "SEAM",
  },
  {
    logo: seamLogo,
    value: 2.3443,
    dollarAmount: 2000,
    symbol: "esSEAM",
  },
  {
    logo: seamLogo,
    value: 3.3443,
    dollarAmount: 3000,
    symbol: "USDC",
  },
]

export const ClaimModal = () => {
  return (
    <Modal
      header='Claim rewards'
      size="small"
      buttonProps={{
        children: "Claim",
        className: "text-bold3 bg-metalic text-neutral-0 rounded-[10px] p-2 px-8 items-center",
      }}
    >
      <FlexCol className="gap-8">
        <FlexCol className="gap-6">
          <FlexCol className='gap-1'>
            <Typography type='bold2'>Transaction overview</Typography>
            <FlexCol className='gap-5 shadow-card rounded-card bg-background-selected p-4 pt-6'>
              {/* Tokens display section using TokenRow */}
              {TOKENS_MOCK.map((token, index) => (
                <TokenRow
                  key={index}
                  logo={token.logo}
                  value={token.value}
                  dollarAmount={token.dollarAmount}
                  symbol={token.symbol}
                />
              ))}
              <FlexRow className='justify-between items-center mt-4'>
                <Typography type='bold1'>Total worth</Typography>
                <DisplayMoney typography='bold2' viewValue='764.23' symbol='$' symbolPosition='before' />
              </FlexRow>
            </FlexCol>
          </FlexCol>

          <Buttonv2 className="text-bold2" >Claim all rewards</Buttonv2>
        </FlexCol>
      </FlexCol>
    </Modal>
  )
}
