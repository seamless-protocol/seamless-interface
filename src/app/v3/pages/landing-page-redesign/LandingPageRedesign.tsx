import { FlexCol, FlexRow, PageContainer, TabButton, TabContent, TabProvider } from "@shared";
import { ILMsTab } from "./tabs/ilms-tab/ILMsTab";
import { Dashboard } from "./tabs/dashboard-tab/Dashboard";

type Tabs = "ILMs" | "My Positions";

export const LandingPageRedesign = () => {
  return (
    <PageContainer className="flex justify-center py-12">
      <TabProvider<Tabs> defaultTab="ILMs">
        {/* todo: responsive */}
        <FlexCol className="gap-1 w-full md:max-w-[1020px]">
          <FlexRow className="w-full gap-1 border-b-navy-100 border-b-thin">
            <TabButton<Tabs> tab="ILMs">ILMs</TabButton>
            <TabButton<Tabs> tab="My Positions">Dashboard</TabButton>
          </FlexRow>

          <TabContent<Tabs> tab="ILMs">
            <div className="mt-8">
              <ILMsTab />
            </div>
          </TabContent>
          <TabContent<Tabs> tab="My Positions">
            <div className="mt-8">
              <Dashboard />
            </div>
          </TabContent>
        </FlexCol>
      </TabProvider>
    </PageContainer>
  );
};
