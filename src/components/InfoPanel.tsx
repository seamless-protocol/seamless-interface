import { Box, Container, Typography } from "@mui/material";
import { useFetchInfoPanel } from "../hooks/useFetchInfoPanel";

function InfoPanel() {
  const { totalBorrows } = useFetchInfoPanel();

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
      <Box>
        <Box>
          <Typography
            sx={{
              color: "#C0C0C0",
              fontFamily: "Verdana",
            }}
          >
            Total market size
          </Typography>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "1.5rem",
              fontFamily: "Verdana",
              color: "#FFFFEF",
            }}
          >
            {totalBorrows.toString()}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default InfoPanel;
