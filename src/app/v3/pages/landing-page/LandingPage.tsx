import { FlexCol, FlexRow, PageContainer, TabButton, TabContent, TabProvider } from "@shared";
import { Dashboard } from "./tabs/dashboard/Dashboard";
import { ILMsTab } from "./tabs/ilms/ILMsTab";

type Tabs = "ILMs" | "Dashboard";

export const LandingPageRedesign = () => {
  return (
    <PageContainer className="flex justify-center py-12">
      <TabProvider<Tabs> defaultTab="ILMs">
        {/* todo: responsive */}
        <FlexCol className="gap-1 w-full md:max-w-[1020px]">
          <FlexRow className="w-full gap-1 border-b-navy-100 border-b-thin">
            <TabButton<Tabs> tab="ILMs">ILMs</TabButton>
            <TabButton<Tabs> tab="Dashboard">Dashboard</TabButton>
          </FlexRow>

          <TabContent<Tabs> tab="ILMs">
            <div className="mt-8">
              <ILMsTab />
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
