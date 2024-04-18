import { FlexCol, Typography, DisplayTokenAmount, FlexRow } from '@shared'
import { Address } from 'viem';
import { useFetchViewDetailUserReserveData } from '../../../../../state/lending-borrowing/hooks/useFetchViewDetailUserReserveData';

export const Summary: React.FC<{
  asset: Address;
}> = ({ asset }) => {
  const {
    data: { supplied },
    ...rest
  } = useFetchViewDetailUserReserveData(asset);

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
      <Typography type="bold3">Summary</Typography>
      <FlexRow className='gap-1 items-center'>
        <Typography type="bold2">Remaining supply</Typography>
        <DisplayTokenAmount
          {...rest}
          {...supplied.tokenAmount}
          typography="medium2"
        />
      </FlexRow>
    </FlexCol >
  )
}
