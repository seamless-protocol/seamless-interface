import { Box, Stack, Typography } from "@mui/material";
import StrategyInfoTable from "./StrategyInfoTable";

interface StrategyInfoProps {
  sx?: any;
}

function StrategyInfo({ sx }: StrategyInfoProps) {
  return (
    <Stack direction={"row"} spacing={"10px"} sx={sx}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          //TODO: fix this
          width: "33%",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontWeight: 550,
            fontSize: "0.8rem",
          }}
        >
          Strategy info
        </Typography>
      </Box>
      <StrategyInfoTable />
    </Stack>
  );
}

export default StrategyInfo;
