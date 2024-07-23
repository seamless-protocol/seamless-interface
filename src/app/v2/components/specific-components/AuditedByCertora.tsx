import { ExternalLink, FlexRow, Image, Typography } from '@shared'

import certoraLogo from "@assets/logos/logo-certora.svg";

const CertoraAuditReportLink = "https://www.certora.com/reports/seamless";

export const AuditedByCertora = () => {
  return (
    <FlexRow className='flex-col md:flex-row rounded-card gap-2 items-center p-2 px-4 bg-blueGradient justify-between text-white'>
      <Typography type='bold3'>Audited by</Typography>
      <FlexRow className='items-center'>
        <Image src={certoraLogo} alt='certora-logo' width={40} className='mt-[-50px]' />
        <Typography type='bold3'>Certora</Typography>
      </FlexRow>

      <ExternalLink url={CertoraAuditReportLink}>
        <Typography type='bold3'>Read audit report</Typography>
      </ExternalLink>
    </FlexRow>
  )
}
