import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { PageContainer } from "../../../shared";

//alias
import imageTest from "@assets/wsteth-diagram.svg";
import imageTestPng from "@assets/wsteth-diagram.png";
import cbeth from "@assets/cbeth.svg";

export const IlmPage = () => {
  return (
    <PageContainer>
      <HeadingContainer>
        <Heading />
      </HeadingContainer>
      alias
      <img src={cbeth} />
      svg rep
      {imageTest}
      svg non
      <img src={imageTest} />
      png
      <img src={imageTestPng} />
      <StrategiesTable />
    </PageContainer>
  );
};
