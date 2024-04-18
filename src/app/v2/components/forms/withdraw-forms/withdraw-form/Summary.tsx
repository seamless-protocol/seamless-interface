import { FlexCol, Typography, DisplayTokenAmount } from '@shared'
import { Address } from 'viem';
import { useFetchViewDetailUserReserveData } from '../../../../../state/lending-borrowing/hooks/useFetchViewDetailUserReserveData';
import { DataRow } from '../../DataRow';

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
      <DataRow label="Remaining supply"><DisplayTokenAmount
        {...rest}
        {...supplied.tokenAmount}
        typography="medium2"
      />
      </DataRow>
    </FlexCol>
  )
}
