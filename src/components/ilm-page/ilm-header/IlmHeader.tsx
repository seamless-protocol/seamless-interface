import { Container, Stack } from "@mui/material";
import HeaderContainer from "../../common/HeaderContainer";
import { useFetchIlmHeaderInfo } from "../../../hooks/useFetchIlmHeaderInfo";
import LoadingComponent from "../../common/LoadingComponent";
import IlmHeaderTitle from "./IlmHeaderTitle";
import IlmHeaderStatsBox from "./IlmHeaderStatsBox";

function IlmHeader() {
  // const { isLoading, collateralUSD } = useFetchIlmHeaderInfo();
  const isLoading = true;

  return (
    <HeaderContainer>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"row"}
          spacing={9}
          sx={{
            alignItems: "center",
          }}
        >
          <IlmHeaderTitle />

          {isLoading ? (
            <LoadingComponent />
          ) : (
            <IlmHeaderStatsBox
              title="Total market size"
              value={collateralUSD}
            />
          )}
        </Stack>
      </Container>
    </HeaderContainer>
  );
}

export default IlmHeader;
