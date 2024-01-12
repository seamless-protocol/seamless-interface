import { Container } from "@mui/material";
import InfoPanelBox from "./InfoPanelBox";
import { useFetchInfoPanel } from "../../hooks/useFetchInfoPanel";

function InfoPanel() {
  const { equity, collateral, debt } = useFetchInfoPanel();

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        height: "226px",
        backgroundColor: "#8A247C",
      }}
      maxWidth={false}
    >
      <Container sx={{ display: "flex", flexDirection: "row" }}>
        <InfoPanelBox label="Equity" value={equity} />
        <InfoPanelBox label="Collateral" value={collateral} />
        <InfoPanelBox label="Debt" value={debt} />
      </Container>
    </Container>
  );
}

export default InfoPanel;
