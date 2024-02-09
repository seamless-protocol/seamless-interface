import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Card, PageContainer } from "../../../shared";
import { useParams } from "react-router-dom";
import { Heading } from "./components/Heading";
import { StrategyStatusAndConfiguration } from "./components/StrategyStatusAndConfiguration";
import { YourInfo } from "./components/your-info/YourInfo";
import { useState } from "react";
import { TabSelector } from "./components/tab/TabSelector";

type PageParams = {
  id: string;
};

export const IlmDetailsPage = () => {
  const { id } = useParams<PageParams>();
  const [selectedCard, setSelectedCard] = useState<"overview" | "yourInfo">(
    "overview"
  );

  return (
    <PageContainer>
      <HeadingContainer displayBackButton>
        {/* todo: if no id ? */}
        <Heading id={Number(id || 0)} />
      </HeadingContainer>
      <div className="flex flex-col xxl:items-center mt-[-46px]">
        <div className="mx-2 lg:mx-10 xl:mx-24 xxl:w-[1440px]">
          <TabSelector
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />

          <div className="flex flex-row gap-4 pt-4">
            <div
              className={`w-full text-text-secondary lg:block ${selectedCard === "overview" ? "" : "hidden"}`}
            >
              <Card>
                <StrategyStatusAndConfiguration id={Number(id || 0)} />
              </Card>
            </div>

            <div
              className={`w-full mb-24 md:mb-1 lg:w-[500px] text-text-secondary lg:block ${selectedCard === "yourInfo" ? "" : "hidden"}`}
            >
              <Card>
                <YourInfo id={Number(id || 0)} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
