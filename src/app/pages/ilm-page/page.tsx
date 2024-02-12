import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { PageContainer } from "../../../shared";

import imageTest from "@assets/wsteth-diagram.svg";
import cbeth from "@assets/cbeth.svg";

//3
import imageTest3 from "/wsteth-diagram.svg";
import cbeth3 from "/cbeth.svg";

export const IlmPage = () => {
  return (
    <PageContainer>
      <HeadingContainer>
        <Heading />
      </HeadingContainer>
      <img src={cbeth} />
      <img src={imageTest} />
      asd2
      <img src={cbeth3} />
      <img src={imageTest3} />
      asd3
      <StrategiesTable />
    </PageContainer>
  );
};
