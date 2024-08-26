import { DisplayMoney, ExternalLink, FlexRow, Icon, Typography } from "@shared";
import { CertoraAuditReportLink } from "@router";

/* ----------- */
/*    Icons    */
/* ----------- */
import certoraIcon from "@assets/common/certora.svg";
import { useFetchViewLendingPoolInfo } from "../../../v2/pages/test-page/hooks/useFetchViewLendingPoolInfo";

export const Audited = () => {
  const { data, ...rest } = useFetchViewLendingPoolInfo();

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
            <FlexRow className="gap-2">
              <Typography type="medium3">Platform TVL:</Typography>
              <DisplayMoney typography="medium3" {...data?.totalMarketSizeUsd} {...rest} />
            </FlexRow>
          </FlexRow>
        </div>
      </div>
    </div>
  );
};
