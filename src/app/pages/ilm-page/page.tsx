import { StrategiesTable } from "./components/StrategiesTable";
import { HeadingContainer } from "../../components/header/HeadingContainer";
import { Heading } from "./components/Heading";
import { Button, PageContainer, useNotificationContext } from "../../../shared";

export const IlmPage = () => {
  const { showNotification } = useNotificationContext();

  return (
    <PageContainer>
      <HeadingContainer>
        <Button
          onClick={() => {
            showNotification({
              content: "This is a test notification!",
              status: "success",
              txHash: "0x234",
            });
          }}
        >
          test
        </Button>
        <Heading />
      </HeadingContainer>
      <StrategiesTable />
    </PageContainer>
  );
};
