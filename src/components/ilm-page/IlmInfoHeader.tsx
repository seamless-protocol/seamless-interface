import { Container, Stack, Typography } from "@mui/material";
import HeaderContainer from "../common/HeaderContainer";
import { useFetchIlmHeaderInfo } from "../../hooks/useFetchIlmHeaderInfo";

function IlmInfoHeader() {
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
          <Stack
            direction={"column"}
            spacing={"5px"}
            sx={{ marginBottom: "10px" }}
          >
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              Integrated Liquidity Market
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "#DC91C1", lineHeight: "20px" }}
            >
              Simplify your flow with integrated borrowing strategies
            </Typography>
          </Stack>

          <Stack direction={"column"}>
            <Typography variant="h6" sx={{ color: "#DC91C1" }}>
              Total market size
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              ${collateralUSD}
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </HeaderContainer>
  );
}

export default IlmInfoHeader;
