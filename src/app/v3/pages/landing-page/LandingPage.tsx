import { FlexCol, FlexRow, PageContainer, TabButton, TabContent, TabProvider } from "@shared";
import { Dashboard } from "./tabs/dashboard/Dashboard";
import { StakingTab } from "./tabs/staking/StakingTab";
import { MorphoVaultsTab } from "./tabs/morpho-vaults/MorphoVaultsTab";

type Tabs = "Dashboard" | "Staking" | "Vaults";

export const LandingPage = () => {
  return (
    <PageContainer className="flex justify-center py-6 pb-12">
      <TabProvider<Tabs> defaultTab="Vaults">
        {/* todo: responsive */}
        <FlexCol className="gap-1 w-full md:max-w-page-content">
          <FlexRow className="w-full gap-1 border-b-navy-100 border-b-thin overflow-x-auto md:overflow-x-hidden overflow-y-hidden whitespace-nowrap">
            <TabButton<Tabs> data-cy="tab-vaults" tab="Vaults">
              Vaults
            </TabButton>
            {import.meta.env.VITE_STAKING_FEATURE === "true" && (
              <TabButton<Tabs> data-cy="tab-staking" tab="Staking">
                Staking
              </TabButton>
            )}
            <TabButton<Tabs> data-cy="tab-dashboard" tab="Dashboard">
              Dashboard
            </TabButton>
          </FlexRow>

          <TabContent<Tabs> tab="Vaults">
            <div className="mt-8">
              <MorphoVaultsTab />
            </div>
          </TabContent>
          {import.meta.env.VITE_STAKING_FEATURE === "true" && (
            <TabContent<Tabs> tab="Staking">
              <div className="mt-8">
                <StakingTab />
              </div>
            </TabContent>
          )}
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
