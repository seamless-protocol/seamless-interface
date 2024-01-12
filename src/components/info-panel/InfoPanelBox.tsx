import { Box, Typography } from "@mui/material";

interface InfoPanelBoxProps {
  label: string;
  value: string;
}

function InfoPanelBox({ label, value }: InfoPanelBoxProps) {
  return (
    <Box sx={{ marginRight: "20px" }}>
      <Typography
        sx={{
          color: "#C0C0C0",
          fontFamily: "Verdana",
          fontSize: "1.1rem",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: "1.5rem",
          fontFamily: "Verdana",
          color: "#FFFFEF",
        }}
      >
        ${value}
      </Typography>
    </Box>
  );
}

export default InfoPanelBox;
