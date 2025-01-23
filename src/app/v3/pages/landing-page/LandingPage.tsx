import { FlexCol, FlexRow, PageContainer, TabButton, TabContent, TabProvider } from "@shared";
import { ILMsTab } from "./tabs/ilms/ILMsTab";
import { Dashboard } from "./tabs/dashboard/Dashboard";
import { StakingTab } from "./tabs/staking/StakingTab";
import { MorphoVaultsTab } from "./tabs/morpho-vaults/MorphoVaultsTab";

type Tabs = "ILMs" | "Dashboard" | "Staking" | "Vaults";

export const LandingPage = () => {
  return (
    <PageContainer className="flex justify-center py-6 pb-12">
      <TabProvider<Tabs> defaultTab="ILMs">
        {/* todo: responsive */}
        <FlexCol className="gap-1 w-full md:max-w-page-content">
          <FlexRow className="w-full gap-1 border-b-navy-100 border-b-thin">
            <TabButton<Tabs> data-cy="tab-ilms" tab="ILMs">
              ILMs
            </TabButton>
            <TabButton<Tabs> data-cy="tab-vaults" tab="Vaults">
              Vaults
            </TabButton>
            <TabButton<Tabs> data-cy="tab-staking" tab="Staking">
              Staking
            </TabButton>
            <TabButton<Tabs> data-cy="tab-dashboard" tab="Dashboard">
              Dashboard
            </TabButton>
          </FlexRow>

          <TabContent<Tabs> tab="ILMs">
            <div className="mt-8">
              <ILMsTab />
            </div>
          </TabContent>
          <TabContent<Tabs> tab="Vaults">
            <div className="mt-8">
              <MorphoVaultsTab />
            </div>
          </TabContent>
          <TabContent<Tabs> tab="Staking">
            <div className="mt-8">
              <StakingTab />
            </div>
          </TabContent>
          <TabContent<Tabs> tab="Dashboard">
            <div className="mt-8">
              <Dashboard />
            </div>
          </TabContent>
        </FlexCol>
      </TabProvider>
    </PageContainer>
  );
};
