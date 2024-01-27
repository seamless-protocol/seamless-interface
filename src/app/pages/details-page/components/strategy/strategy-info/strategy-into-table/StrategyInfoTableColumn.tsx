import { Box, Typography } from "@mui/material";
import StrategyInfoTableNumericCell from "./StrategyInfoTableNumericCell";

interface StrategyInfoTableColumnProps {
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
}: StrategyInfoTableColumnProps) {
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
