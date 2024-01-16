import { Container, Stack } from "@mui/material";
import HeaderContainer from "../../common/HeaderContainer";
import { useFetchIlmHeaderInfo } from "../../../hooks/useFetchIlmHeaderInfo";
import IlmHeaderTitle from "./IlmHeaderTitle";
import IlmHeaderStatsBox from "./IlmHeaderStatsBox";

function IlmHeader() {
  const { collateralUSD } = useFetchIlmHeaderInfo();

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
          <IlmHeaderStatsBox title="Total market size" value={collateralUSD} />
        </Stack>
      </Container>
    </HeaderContainer>
  );
}

export default IlmHeader;
