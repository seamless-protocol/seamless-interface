import { FlexCol, FlexRow, PageContainer, TabButton, TabContent } from "@shared";
import { TabProvider } from "../../../../shared/contexts/tab-context/TabContext";
import { EarnTab } from "./tabs/earn-tab/EarnTab";
import { MyPositionsTab } from "./tabs/my-positions-tab/MyPositionsTab";
import { Link } from "react-router-dom";
import { RouterConfig } from "../../../router";

type Tabs = "Earn" | "My Positions";

export const TestPage = () => {
  return (
    <PageContainer className="flex justify-center py-12">
      <TabProvider<Tabs> defaultTab="Earn">
        {/* todo: responsive */}
        <FlexCol className="gap-1 w-full max-w-[1020px]">
          <FlexRow className="w-full gap-1 border-b-navy-100 border-b-thin">
            <TabButton<Tabs> tab="Earn">Earn</TabButton>
            <Link
              to={RouterConfig.Routes.lendingAndBorrowing}
              className="min-w-32 relative py-4 text-bold3 text-navy-400"
            >
              Borrow (using legacy mode)
            </Link>
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
