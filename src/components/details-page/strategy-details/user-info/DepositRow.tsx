import { Button, Stack } from "@mui/material";
import WalletDataBox from "./wallet-data-box/WalletDataBox";

interface DepositRowProps {
  isLoading?: boolean;
  walletBalance: string;
  walletBalanceUSD: string;
}

function DepositRow({
  isLoading,
  walletBalance,
  walletBalanceUSD,
}: DepositRowProps) {
  return (
    <Stack
      direction="row"
      sx={{
        marginTop: "20px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <WalletDataBox
        isLoading={isLoading}
        label="Available to deposit"
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
        Deposit
      </Button>
    </Stack>
  );
}

export default DepositRow;
