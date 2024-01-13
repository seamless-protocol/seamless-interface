import { Box, Typography } from "@mui/material";
import LoadingComponent from "../LoadingComponent";

interface HeaderInfoBoxProps {
  isLoading: boolean;
  label: string;
  value: string;
}

function HeaderInfoBox({ isLoading, label, value }: HeaderInfoBoxProps) {
  return (
    <Box sx={{ marginRight: "40px", width: "18%" }}>
      <Typography
        sx={{
          color: "#C0C0C0",
          fontFamily: "Verdana",
          fontSize: "0.9rem",
        }}
      >
        {label}
      </Typography>
      {isLoading ? (
        <LoadingComponent size="1.4rem" />
      ) : (
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
      )}
    </Box>
  );
}

export default HeaderInfoBox;
