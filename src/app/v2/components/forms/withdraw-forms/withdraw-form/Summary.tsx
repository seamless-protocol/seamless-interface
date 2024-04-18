import { FlexCol, Typography, FlexRow, DisplayTokenAmount } from '@shared'
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
    <FlexCol>
      <Typography type="description">Transaction overview</Typography>
      <FlexCol className="border-divider border-[0.667px] rounded-md  p-3 gap-1">
        <FlexRow className="text-navy-600 justify-between">
          <Typography type="bold2">Remaining supply</Typography>
          <DisplayTokenAmount
            {...rest}
            {...supplied.tokenAmount}
            typography="medium2"
          />

        </FlexRow>
      </FlexCol>
    </FlexCol>
  )
}
