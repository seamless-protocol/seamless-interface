import { DisplayMoney, FlexCol, FlexRow, Typography } from '@shared'
import { ClaimModal } from './ClaimModal'

export const ClaimCard = () => {
  return (
    <FlexCol className='shadow-card px-8 py-10 w-full bg-neutral-0 rounded-card'>
      <Typography type='regular4'>Rewards</Typography>
      <FlexRow className='justify-between items-center'>
        <DisplayMoney typography='bold6' viewValue='764.23' symbol='$' symbolPosition='before' />

        <ClaimModal />
      </FlexRow>
    </FlexCol>
  )
}
