import { Stack, Typography } from "@mui/material";

interface StrategyInfoNumericContentProps {
  primaryValue: string;
  secondaryValue?: string;
}

function StrategyInfoNumericContent({
  primaryValue,
  secondaryValue,
}: StrategyInfoNumericContentProps) {
  return (
    <Stack
      direction={"column"}
      spacing={"2"}
      sx={{
        height: "40px",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "BlinkMacSystemFont",
          fontSize: "0.8rem",
          marginTop: "5px",
          textAlign: "center",
        }}
      >
        {primaryValue}
      </Typography>
      {secondaryValue && (
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.7rem",
            textAlign: "center",
          }}
        >
          {secondaryValue}
        </Typography>
      )}
    </Stack>
  );
}

export default StrategyInfoNumericContent;
