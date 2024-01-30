import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { PageContainer } from "../../../shared";

export const IlmPage = () => {
  return (
    <PageContainer>
      <HeadingContainer>
        <Heading />
      </HeadingContainer>
      <StrategiesTable />
    </PageContainer>
  );
};
