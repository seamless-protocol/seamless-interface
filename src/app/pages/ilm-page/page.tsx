import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { PageContainer } from "../../../shared";

//alias
import imageTest from "@assets/wsteth-diagram.svg";
import imageTest2 from "@assets/diagram.svg";
import cbeth from "@assets/cbeth.svg";

export const IlmPage = () => {
  return (
    <PageContainer>
      <HeadingContainer>
        <Heading />
      </HeadingContainer>
      alias
      <img src={cbeth} />
      <img src={imageTest} />
      <img src={imageTest2} />
      <StrategiesTable />
    </PageContainer>
  );
};
