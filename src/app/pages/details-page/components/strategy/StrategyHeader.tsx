import { Typography } from "@mui/material";

function StrategyHeader() {
  return (
    <Typography
      sx={{
        marginTop: "16px",
        fontWeight: 600,
        fontSize: "1.0rem",
        fontFamily: "Verdana",
        color: "#000000",
      }}
    >
      Strategy status & configuration
    </Typography>
  );
}

export default StrategyHeader;
