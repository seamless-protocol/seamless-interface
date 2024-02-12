import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { PageContainer } from "../../../shared";

import imageTest from "../../../assets/wsteth-diagram.svg";

export const IlmPage = () => {
  return (
    <PageContainer>
      <HeadingContainer>
        <Heading />
      </HeadingContainer>
      <img src={imageTest} />
      asd
      <StrategiesTable />
    </PageContainer>
  );
};
