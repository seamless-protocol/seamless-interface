import { Button, Stack } from "@mui/material";
import { useFetchWithdrawInfo } from "../../../../hooks/useFetchWithdrawInfo";
import WalletDataBox from "./wallet-data-box/WalletDataBox";

function WithdrawRow() {
  const { isLoading, userEquity, userEquityUSD } = useFetchWithdrawInfo();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <WalletDataBox
        isLoading={isLoading}
        label="Available to withdraw"
        walletBalance={userEquity}
        walletBalanceUSD={userEquityUSD}
      />

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
