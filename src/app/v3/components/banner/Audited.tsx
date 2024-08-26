import { DisplayMoney, ExternalLink, FlexRow, Icon, Typography } from "@shared";
import { CertoraAuditReportLink } from "@router";

/* ----------- */
/*    Icons    */
/* ----------- */
import certoraIcon from "@assets/common/certora.svg";

export const Audited = () => {
  // const equity = useFetchFormattedEquity();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-blueGradient rounded-[100px] text-white">
          <FlexRow className="items-center justify-between w-full">
            <FlexRow className="items-center gap-2">
              <Typography type="medium3">Audited by</Typography>
              <Icon className="mt-[4px]" src={certoraIcon} alt="certora-logo" width={82} height={24} />
              <ExternalLink className="text-medium3 ml-2" url={CertoraAuditReportLink}>
                Read Audit
              </ExternalLink>
            </FlexRow>
            <FlexRow>
              <Typography type="medium3">Platform TVL</Typography>
              <DisplayMoney />
            </FlexRow>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
