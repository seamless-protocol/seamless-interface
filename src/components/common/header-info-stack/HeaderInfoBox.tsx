import { Box, Typography } from "@mui/material";

interface HeaderInfoBoxProps {
  label: string;
  value: string;
}

function HeaderInfoBox({ label, value }: HeaderInfoBoxProps) {
  return (
    <Box sx={{ marginRight: "40px" }}>
      <Typography
        sx={{
          color: "#C0C0C0",
          fontFamily: "Verdana",
          fontSize: "0.9rem",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: "1.1rem",
          fontFamily: "Verdana",
          color: "#FFFFEF",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

export default HeaderInfoBox;
