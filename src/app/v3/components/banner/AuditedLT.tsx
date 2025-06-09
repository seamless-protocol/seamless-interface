import { DisplayMoney, ExternalLink, FlexRow, Icon, Typography } from "@shared";
import { CertoraAuditReportLink } from "@router";

/* ----------- */
/*    Icons    */
/* ----------- */
import cantinaIcon from "@assets/logos/cantina.svg";
import sherlockIcon from "@assets/logos/sherlock.svg";
import { useFetchPlatformTVL } from "../../../statev3/common/hooks/useFetchPlatformTVL";

export const AuditedLT = () => {
  const { TVL, ...restTVL } = useFetchPlatformTVL();

  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col md:flex-row items-center justify-between bg-holographic rounded-full text-white shadow-xl py-6 px-8">
          {/* Auditors Section */}
          <FlexRow className="items-center space-x-4">
            <Typography type="medium3" className="font-semibold tracking-wide">
              Leverage Tokens Audited by
            </Typography>
            <Icon src={cantinaIcon} alt="Cantina Logo" width={100} height={1} className="filter invert" />
            <Typography type="medium3" className="font-semibold tracking-wide">
              and
            </Typography>
            <Icon src={sherlockIcon} alt="Sherlock Logo" width={120} height={1} className="filter invert" />
            <ExternalLink url={CertoraAuditReportLink} className="ml-2 text-medium3 underline hover:text-gray-200">
              Read Audit
            </ExternalLink>
          </FlexRow>

          {/* TVL Section */}
          <FlexRow className="items-center space-x-2 mt-4 md:mt-0">
            <Typography type="medium3" className="">
              Platform TVL:
            </Typography>
            <DisplayMoney typography="medium3" {...TVL} {...restTVL} />
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
