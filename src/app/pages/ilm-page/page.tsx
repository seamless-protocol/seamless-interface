import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { FlexCol, PageContainer } from "../../../shared";
import { BaseAssetsTable } from "./components/BaseAssetsTable";
import { TestComponent } from "./components/TestComponent";

export const IlmPage = () => {
  return (
    <PageContainer>
      <HeadingContainer>
        <Heading />
      </HeadingContainer>
      <FlexCol className="gap-10">
        <StrategiesTable />
        <BaseAssetsTable />
        <TestComponent />
      </FlexCol>
    </PageContainer>
  );
};
