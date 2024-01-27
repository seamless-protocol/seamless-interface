import { Box, Stack, Typography } from "@mui/material";

function StrategyDescription() {
  return (
    <Stack direction={"row"} spacing={"10px"}>
      <Box sx={{ display: "flex", justifyContent: "center", width: "33%" }}>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.8rem",
            fontWeight: "550",
          }}
        >
          Description
        </Typography>
      </Box>

      <Stack direction="column" spacing={"15px"}>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.7rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          This integrated Liquidity Market (ILM) uses cbETH deposits to borrow
          ETH, which is used to purchase more cbETH to achieve the targeted
          multiple.
        </Typography>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.7rem",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          This amplifies the participant's cbETH and ETH staking reward
          exposure.
        </Typography>
      </Stack>
    </Stack>
  );
}

export default StrategyDescription;
