import { ExternalLink, FlexCol, FlexRow, Icon, PageContainer, Typography } from "@shared";

import seamlessIcon from "@assets/logos/logo-seamless.svg";
import { disourseUrl, govFaqUrl, snapShotUrl, tallyUrl } from "@router";
import { GovInfoCard } from "./components/GovInfoCard";
import { DelegatedPowerCard } from "./components/DelegatedPowerCard";

export const GovernancePage = () => {
  return (
    <PageContainer className="flex justify-center py-6 pb-12 md:px-0 px-2">
      <FlexCol className="gap-16 w-full md:max-w-page-content">
        <FlexCol className="gap-8">
          <FlexRow className="gap-2">
            <Icon src={seamlessIcon} alt="community-governance" width={48} height={48} />
            <Typography type="medium7">Community Governance</Typography>
          </FlexRow>

          <div>
            <Typography type="regular3">
              Seamless is a fully decentralized, community governed protocol by the SEAM token-holders. SEAM
              token-holders collectively discuss, propose, and vote on upgrades to the protocol. SEAM token-holders
              (Base network only) can either vote themselves on new proposals or delegate to an address of choice.
            </Typography>
          </div>

          <FlexRow className="gap-5">
            <ExternalLink url={tallyUrl}>Tally</ExternalLink>
            <ExternalLink url={snapShotUrl}>SnapShots</ExternalLink>
            <ExternalLink url={disourseUrl}>Forum</ExternalLink>
            <ExternalLink url={govFaqUrl}>FAQ</ExternalLink>
          </FlexRow>
        </FlexCol>
        <div className="grid grid-cols-5 md:grid-cols-9 gap-4">
          <div className="col-span-5">
            <GovInfoCard />
          </div>
          <div className="col-span-5 md:col-span-4">
            <DelegatedPowerCard />
          </div>
        </div>
      </FlexCol>
    </PageContainer>
  );
};
