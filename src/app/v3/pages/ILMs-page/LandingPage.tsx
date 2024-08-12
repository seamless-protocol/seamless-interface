import { FlexCol, FlexRow, PageContainer, TabButton, TabContent } from "@shared";
import { TabProvider } from "../../../../shared/contexts/tab-context/TabContext";
import { Link } from "react-router-dom";
import { RouterConfig } from "../../../router";
import { EarnTab } from "../../../v2/pages/test-page/tabs/earn-tab/EarnTab";
import { MyPositionsTab } from "../../../v2/pages/test-page/tabs/my-positions-tab/MyPositionsTab";

type Tabs = "Earn" | "My Positions";

export const LandingPage = () => {
  return (
    <PageContainer className="flex justify-center py-12">
      <TabProvider<Tabs> defaultTab="Earn">
        {/* todo: responsive */}
        <FlexCol className="gap-1 w-full md:max-w-[1020px]">
          <FlexRow className="w-full gap-1 border-b-navy-100 border-b-thin">
            <TabButton<Tabs> tab="Earn">ILMs</TabButton>
            <TabButton<Tabs> tab="My Positions">My Positions</TabButton>
          </FlexRow>

          <TabContent<Tabs> tab="Earn">
            <div className="mt-8">
              <EarnTab />
            </div>
          </TabContent>
          <TabContent<Tabs> tab="My Positions">
            <div className="mt-8">
              <MyPositionsTab />
            </div>
          </TabContent>
        </FlexCol>
      </TabProvider>
    </PageContainer>
  );
};
