import { DisplayMoney, ExternalLink, FlexRow, Icon, Typography } from "@shared";
import { CertoraAuditReportLink } from "@router";

/* ----------- */
/*    Icons    */
/* ----------- */
import certoraIcon from "@assets/common/certora.svg";
import { useFetchViewLendingPoolInfo } from "../../hooks/useFetchViewLendingPoolInfo";

export const Audited = () => {
  const { data, ...rest } = useFetchViewLendingPoolInfo();

  return (
    <div className="flex justify-center px-2 md:px-0">
      <div className="w-full max-w-page-content">
        <div className="flex flex-col justify-center text-center w-full md:flex-row py-4 px-8 bg-blueGradient rounded-[100px] text-white">
          <FlexRow className="md:flex-row flex-col md:gap-0 gap-4 items-center justify-between w-full">
            <FlexRow className="items-center gap-2">
              <Typography type="medium3">Audited by</Typography>
              <Icon className="mt-[4px]" src={certoraIcon} alt="certora-logo" width={82} height={24} />
              <ExternalLink className="text-medium3 ml-2" url={CertoraAuditReportLink}>
                Read Audit
              </ExternalLink>
            </FlexRow>
            <FlexRow className="gap-2">
              <Typography type="medium3">Platform TVL:</Typography>
              <DisplayMoney typography="medium3" {...data?.totalAvailableUsd} {...rest} />
            </FlexRow>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
