import { FlexRow, Icon, Typography } from '@shared'
import gauntletIcon from '@assets/logos/logo-gauntlet.svg'

export const GauntletOptimized: React.FC<{
  className?: string
}> = ({ className = "" }) => {
  return (
    <FlexRow className={`gap-1 items-center border-metallicBorder py-1 px-2 rounded-lg 
    border border-solid bg-smallElements-rewardAPY ${className}`}>
      <Icon width={10} src={gauntletIcon} alt="gauntlet-icon" />
      <Typography type="bold" className='uppercase'>optimized</Typography>
    </FlexRow>
  )
}
