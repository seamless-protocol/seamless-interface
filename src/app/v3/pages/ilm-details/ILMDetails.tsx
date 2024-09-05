import { FlexCol, FlexRow, PageContainer } from "@shared";
import { StrategyDetails } from "./components/strategy-details/StrategyDetails";
import { StrategyStats } from "./components/strategy-details/strategy-stats/StrategyStats";
import { CurrentHoldings } from "./components/current-holdings/CurrentHoldings";
import { FormContainer } from "./components/forms/FormContainer";
import { StrategyPickerButton } from "./components/strategy-picker/StrategyPickerButton";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { RouterConfig } from "@router";
import { useAccount } from "wagmi";
import { GraphComponent } from "./components/graph/GraphComponent";
import { StrategyHeading } from "./components/strategy-heading/StrategyHeading";

export const ILMDetails = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { address } = useParams();
  const { isConnected } = useAccount();

  return (
    <PageContainer className="flex justify-center py-2 md:py-12 px-4 md:px-0">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <FlexRow className="py-6 items-center gap-4">
          <button onClick={() => navigate(RouterConfig.Routes.landingPage)}>
            <ArrowLeftIcon width={24} height={24} />
          </button>
          <StrategyPickerButton strategy={address as Address} />
        </FlexRow>

        <div className="mb-8">
          <StrategyHeading />
        </div>
        <div className="flex md:flex-row flex-col-reverse w-full gap-8 items-start">
          <FlexCol className="w-full md:w-2/3 gap-10">
            <GraphComponent />
            {isConnected && <CurrentHoldings />}
            <StrategyStats />
            <StrategyDetails />
          </FlexCol>
          <div className="w-full md:w-[450px]">
            <div className="flex-initial h-auto md:sticky">
              <FormContainer />
            </div>
          </div>
        </div>
      </FlexCol>
    </PageContainer>
  );
};
