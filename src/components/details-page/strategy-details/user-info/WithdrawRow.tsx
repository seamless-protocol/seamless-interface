import { Button, Stack, Typography } from "@mui/material";
import { useFetchWithdrawInfo } from "../../../../hooks/useFetchWithdrawInfo";

function WithdrawRow() {
  const { userEquity, userEquityUSD } = useFetchWithdrawInfo();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.7rem",
            color: "#000000",
          }}
        >
          Available to withdraw
        </Typography>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#000000",
          }}
        >
          {userEquity}cbETH
        </Typography>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.7rem",
            color: "#000000",
          }}
        >
          ${userEquityUSD}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        disableRipple
        size="small"
        sx={{
          backgroundColor: "#0DA8EB",
          borderRadius: "3px",
          "&:hover": {
            backgroundColor: "#0DA8EB",
          },
        }}
      >
        Withdraw
      </Button>
    </Stack>
  );
}

export default WithdrawRow;
