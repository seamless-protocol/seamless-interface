import { Container } from "@mui/material";
import StrategiesTable from "./strategies-table/StrategiesTable";

function IlmMarketInfo() {
  return (
    <Container
      disableGutters
      maxWidth={"lg"}
      sx={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        marginTop: "-20px",
        position: "relative",
        containerSize: "100%",
      }}
    >
      <StrategiesTable />
    </Container>
  );
}

export default IlmMarketInfo;
