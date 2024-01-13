import { Box, Stack, Typography } from "@mui/material";
import LoadingComponent from "../../../../common/LoadingComponent";

interface StrategyInfoTableBoxProps {
  isLoading: boolean;
  label: string;
  primaryValue: string;
  secondaryValue?: string;
}

function StrategyInfoTableBox({
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
      {isLoading ? (
        <LoadingComponent size="2rem" />
      ) : (
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
      )}
    </Box>
  );
}

export default StrategyInfoTableBox;
