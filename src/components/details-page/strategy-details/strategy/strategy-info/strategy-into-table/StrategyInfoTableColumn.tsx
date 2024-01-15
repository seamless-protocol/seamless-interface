import { Box, Typography } from "@mui/material";
import StrategyInfoTableNumericCell from "./StrategyInfoTableNumericCell";

interface StrategyInfoTableBoxProps {
  isLoading: boolean;
  label: string;
  primaryValue: string;
  secondaryValue?: string;
}

function StrategyInfoTableColumn({
  isLoading,
  label,
  primaryValue,
  secondaryValue,
}: StrategyInfoTableBoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          color: "#C0C0C0",
          fontFamily: "Verdana",
          fontSize: "0.7rem",
          marginBottom: "5px",
        }}
      >
        {label}
      </Typography>

      <StrategyInfoTableNumericCell
        isLoading={isLoading}
        primaryValue={primaryValue}
        secondaryValue={secondaryValue}
      />
    </Box>
  );
}

export default StrategyInfoTableColumn;
