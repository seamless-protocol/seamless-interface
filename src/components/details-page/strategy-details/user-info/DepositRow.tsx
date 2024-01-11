import { Button, Stack, Typography } from "@mui/material";

interface DepositRowProps {
  walletBalance: string;
  walletBalanceUSD: string;
}

function DepositRow({ walletBalance, walletBalanceUSD }: DepositRowProps) {
  return (
    <Stack
      direction="row"
      sx={{
        marginTop: "20px",
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
          Available to deposit
        </Typography>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#000000",
          }}
        >
          {walletBalance}cbETH
        </Typography>
        <Typography
          sx={{
            fontFamily: "Verdana",
            fontSize: "0.7rem",
            color: "#000000",
          }}
        >
          ${walletBalanceUSD}
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
        Deposit
      </Button>
    </Stack>
  );
}

export default DepositRow;
