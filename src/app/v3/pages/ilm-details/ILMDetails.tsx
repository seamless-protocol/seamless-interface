import { FlexCol, FlexRow, PageContainer } from "@shared";
import { StrategyDetails } from "./components/strategy-details/StrategyDetails";
import { FormContainer } from "./components/forms/FormContainer";
import { StrategyPickerButton } from "./components/strategy-picker/StrategyPickerButton";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const ILMDetails = () => {
  const navigate = useNavigate();
  const { address } = useParams();
  return (
    <PageContainer className="flex justify-center py-2 md:py-12">
      <FlexCol className="gap-1 w-full md:max-w-page-content">
        <FlexRow className="py-6 items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon width={24} height={24} />
          </button>
          <StrategyPickerButton strategy={address as Address} />
        </FlexRow>

        <FlexRow className="w-full gap-8">
          <div className="flex flex-grow">
            <StrategyDetails />
          </div>
          <div className="w-full md:w-[450px] flex flex-none">
            <FormContainer />
          </div>
        </FlexRow>
      </FlexCol>
    </PageContainer>
  );
};
