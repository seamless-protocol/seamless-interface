import { FAQ } from "./FAQ";
import { ExternalLink, FlexCol, FlexRow, Typography } from "@shared";
import { gitBookUrl, RouterConfig } from "@router";
import { VaultsLink } from "../../../../../components/specific-components/VaultsLink";
import { Address } from "viem";
import { hasFaqByAddress } from "../../../../../../state/settings/configUtils";

export const AdditionalInfo: React.FC<{
  asset?: Address;
  subStrategy?: Address;
}> = ({ asset, subStrategy }) => {
  if (!asset) return null;

  return (
    <div className="join join-vertical w-full bg-white shadow-card rounded-card">
      {/* <div className="collapse collapse-arrow join-item border-b">
        <input type="radio" name="my-accordion-4" defaultChecked />
        <div className="collapse-title">
          <Typography type="medium4">Historical Performance</Typography>
        </div>
        <div className="collapse-content">
          <HistoricalPerformance />
        </div>
      </div> */}
      {hasFaqByAddress(asset) && (
        <div className="collapse collapse-arrow join-item border-b">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title">
            <Typography type="medium4">FAQ</Typography>
          </div>
          <div className="collapse-content">
            <FAQ asset={asset} />
          </div>
        </div>
      )}
      <div className="collapse collapse-arrow join-item">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title">
          <Typography type="medium4">Resource Links</Typography>
        </div>
        <div className="collapse-content">
          <FlexCol className="gap-2">
            <FlexRow className="gap-3 items-center">
              <ExternalLink url={gitBookUrl} className="text-regular3">
                Gitbook
              </ExternalLink>
              <ExternalLink url={RouterConfig.Builder.baseScanAddress(subStrategy || "")} className="text-regular3">
                Basescan
              </ExternalLink>
              <VaultsLink asset={asset} />
            </FlexRow>
          </FlexCol>
        </div>
      </div>
    </div>
  );
};
