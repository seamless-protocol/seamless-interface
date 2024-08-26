import { ExternalLink, FlexRow, Icon, Typography } from "@shared";
import { CertoraAuditReportLink } from "@router";

/* ----------- */
/*    Icons    */
/* ----------- */
import certoraIcon from "@assets/common/certora.svg";

export const Audited = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-blueGradient rounded-[100px] text-white">
          <FlexRow className="items-center justify-between">
            <FlexRow className="items-center gap-2">
              <Typography type="medium3">Audited by</Typography>
              <Icon src={certoraIcon} alt="certora-logo" width={82} height={24} />
              <ExternalLink className="text-medium3" url={CertoraAuditReportLink}>
                Read Audi
              </ExternalLink>
            </FlexRow>
            <FlexRow>
              <Typography type="medium3">Platform TVL</Typography>
              <Typography type="medium3">Audited by</Typography>
              <Typography type="medium3">Audited by</Typography>
            </FlexRow>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
