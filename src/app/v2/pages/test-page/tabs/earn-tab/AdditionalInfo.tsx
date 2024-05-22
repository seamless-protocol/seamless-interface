import { Dune } from "./Dune";
import { FAQ } from "./FAQ";
import { ExternalLink, FlexCol, FlexRow, Typography } from "@shared";
import { gitBookUrl, vaultsFyiUrl } from "@router";

export const AdditionalInfo: React.FC<{
  isStrategy?: boolean;
}> = ({ isStrategy }) => {
  return (
    <div className="join join-vertical w-full bg-white shadow-card rounded-card">
      <div className="collapse collapse-arrow join-item border-b">
        <input type="radio" name="my-accordion-4" defaultChecked />
        <div className="collapse-title">
          <Typography type="medium4">Dune</Typography>
        </div>
        <div className="collapse-content">
          <Dune />
        </div>
      </div>
      <div className="collapse collapse-arrow join-item">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title">
          <Typography type="medium4">FAQ</Typography>
        </div>
        <div className="collapse-content">
          <FAQ />

          <FlexCol className="gap-2 md:items-end text-right">
            <FlexRow className="gap-3 items-center">
              <ExternalLink url={gitBookUrl} className="text-regular1">
                Gitbook
              </ExternalLink>
              {isStrategy && (
                <ExternalLink url={vaultsFyiUrl} className="text-regular1">
                  Analytics
                </ExternalLink>
              )}
            </FlexRow>
          </FlexCol>
        </div>
      </div>
    </div>
  );
};
