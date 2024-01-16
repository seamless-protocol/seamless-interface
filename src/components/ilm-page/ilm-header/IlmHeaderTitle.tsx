import { Stack, Typography } from "@mui/material";

function IlmHeaderTitle() {
  return (
    <Stack direction={"column"} spacing={"5px"} sx={{ marginBottom: "10px" }}>
      <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
        Integrated Liquidity Market
      </Typography>
      <Typography variant="h6" sx={{ color: "#DC91C1", lineHeight: "20px" }}>
        Simplify your flow with integrated borrowing strategies
      </Typography>
    </Stack>
  );
}

export default IlmHeaderTitle;
