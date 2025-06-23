import { DisplayMoney, ExternalLink, Icon, Typography } from "@shared";
import { cantinaLTAuditReportLink, sherlockLTAuditReportLink } from "@router";
import cantinaIcon from "@assets/logos/cantina.svg";
import sherlockIcon from "@assets/logos/sherlock.svg";
import { useFetchPlatformTVL } from "../../../data/common/hooks/useFetchPlatformTVL";

export const AuditedLT = () => {
  const { TVL, ...restTVL } = useFetchPlatformTVL();

  return (
    <div className="flex justify-center px-2 sm:px-4 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between bg-holographic rounded-2xl md:rounded-[100px] text-white shadow-xl py-5 px-6 sm:px-8">
          {/* Auditors Section */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-center md:text-left">
            <Typography type="medium3" className="font-semibold tracking-wide">
              Leverage Tokens Audited by
            </Typography>
            <ExternalLink url={cantinaLTAuditReportLink}>
              <Icon src={cantinaIcon} alt="Cantina Logo" className="w-20 md:w-[100px] h-auto filter invert" />
            </ExternalLink>
            <Typography type="medium3" className="font-semibold tracking-wide">
              and
            </Typography>
            <ExternalLink url={sherlockLTAuditReportLink}>
              <Icon src={sherlockIcon} alt="Sherlock Logo" className="w-24 md:w-[120px] h-auto filter invert" />
            </ExternalLink>
          </div>

          {/* TVL Section */}
          <div className="flex items-center justify-center gap-x-2">
            <Typography type="medium3">Platform TVL:</Typography>
            <DisplayMoney typography="medium3" {...TVL} {...restTVL} />
          </div>
        </div>
      </div>
    </div>
  );
};
