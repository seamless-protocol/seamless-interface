import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { PageContainer } from "../../../shared";

//alias
import imageTest from "@assets/wsteth-diagram.svg";
import cbeth from "@assets/cbeth.svg";

//2
import imageTest2 from "/public/wsteth-diagram.svg";
import cbeth2 from "/public/cbeth.svg";

//3
import imageTest3 from "/wsteth-diagram.svg";
import cbeth3 from "/cbeth.svg";

//4
import imageTest4 from "/wsteth-diagram.svg?url";
import cbeth4 from "/cbeth.svg?url";

export const IlmPage = () => {
  return (
    <PageContainer>
      <HeadingContainer>
        <Heading />
      </HeadingContainer>
      alias
      <img src={cbeth} />
      <img src={imageTest} />
      public
      <img src={cbeth2} />
      <img src={imageTest2} />
      publicr
      <img src={cbeth3} />
      <img src={imageTest3} />
      public.url
      <img src={cbeth4} />
      <img src={imageTest4} />
      <StrategiesTable />
    </PageContainer>
  );
};
