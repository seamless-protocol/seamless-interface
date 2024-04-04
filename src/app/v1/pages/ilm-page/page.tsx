import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { FlexCol, PageContainer } from "../../../../shared";
import { BaseAssetsTable } from "./components/BaseAssetsTable";
import { useFetchAllMarkets } from "../../../state/common/hooks/useFetchAllMarkets";

export const IlmPage = () => {
  const { data } = useFetchAllMarkets();
  console.log(data);
  return (
    <PageContainer>
      <HeadingContainer>
        <Heading />
      </HeadingContainer>
      <FlexCol className="gap-10">
        <StrategiesTable />
        <BaseAssetsTable />
      </FlexCol>
    </PageContainer>
  );
};
