import { Stack, Typography } from "@mui/material";
import LoadingComponent from "../../../../../components/loading/LoadingComponent";
import WalletData from "./WalletData";

interface WalletDataBoxProps {
  isLoading?: boolean;
  label: string;
  walletBalance: string;
  walletBalanceUSD: string;
}

function WalletDataBox({
  isLoading,
  label,
  walletBalance,
  walletBalanceUSD,
}: WalletDataBoxProps) {
  return (
    <Stack>
      <Typography
        sx={{
          fontFamily: "Verdana",
          fontSize: "0.7rem",
          color: "#000000",
        }}
      >
        {label}
      </Typography>

      {isLoading ? (
        <LoadingComponent size="1.5rem" />
      ) : (
        <WalletData
          walletBalance={walletBalance}
          walletBalanceUSD={walletBalanceUSD}
        />
      )}
    </Stack>
  );
}

export default WalletDataBox;
