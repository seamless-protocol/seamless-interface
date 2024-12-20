import { FlexCol, FlexRow, PageContainer, TabButton, TabContent, TabProvider } from "@shared";
import { ILMsTab } from "./tabs/ilms/ILMsTab";
import { Dashboard } from "./tabs/dashboard/Dashboard";
import { MorphoVaultsTab } from "./tabs/morpho-vaults/MorphoVaultsTab";
import { IS_DEV_MODE } from "../../../../globals";

type Tabs = "ILMs" | "Dashboard" | "Vaults";

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
            {IS_DEV_MODE && <TabButton<Tabs> data-cy="tab-vaults" tab="Vaults">
              Vaults
            </TabButton>}
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
