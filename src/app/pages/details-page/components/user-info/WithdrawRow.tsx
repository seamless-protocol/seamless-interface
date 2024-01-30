import { Button, Stack } from "@mui/material";
import WalletDataBox from "./wallet-data-box/WalletDataBox";

interface WithdrawRowProps {
  isLoading?: boolean;
  walletBalance: string;
  walletBalanceUSD: string;
}
function WithdrawRow({
  isLoading,
  walletBalance,
  walletBalanceUSD,
}: WithdrawRowProps) {
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
        walletBalance={walletBalance}
        walletBalanceUSD={walletBalanceUSD}
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
