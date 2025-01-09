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
  const { address } = useParams();
  const { isConnected } = useAccount();

  return (
    <PageContainer className="flex justify-center py-6 pb-12 px-4 md:px-0">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <FlexRow className="py-6 items-center gap-4">
          <button onClick={() => navigate(RouterConfig.Routes.landingPage)}>
            <ArrowLeftIcon width={40} height={40} />
          </button>
          <StrategyPickerButton strategy={address as Address} />
        </FlexRow>

        <div className="mb-8">
          <StrategyHeading />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8 w-full items-start">
          <div className="md:sticky top-6 order-1 md:order-2 md:min-w-[460px]">
            <FormContainer />
          </div>

          <div className="flex flex-col gap-10 order-2 md:order-1">
            {isConnected && <CurrentHoldings />}
            <GraphComponent />
            <StrategyStats />
            <StrategyDetails />
          </div>
        </div>
      </FlexCol>
    </PageContainer>
  );
};
