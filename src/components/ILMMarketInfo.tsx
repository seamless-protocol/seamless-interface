import { Box, Container, Typography } from "@mui/material";
import StrategiesTable from "./strategies-table/StrategiesTable";

function ILMMarketInfo() {
  return (
    <Container
      disableGutters
      maxWidth={"lg"}
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        marginTop: "-40px",
        position: "relative",
        containerSize: "100%",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          marginTop: "16px",
          marginLeft: "16px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1.2rem",
            fontFamily: "Verdana",
            color: "#000000",
          }}
        >
          Integrated Lending Market
        </Typography>
        <Typography
          sx={{
            fontWeight: 200,
            fontSize: "0.9rem",
            fontFamily: "Verdana",
            color: "#000000",
          }}
        >
          Loop your position to multiply your size
        </Typography>
      </Box>
      <StrategiesTable />
    </Container>
  );
}

export default ILMMarketInfo;
