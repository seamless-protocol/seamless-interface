import { Typography } from "@mui/material";

interface WalletDataProps {
  walletBalance: string;
  walletBalanceUSD: string;
}

function WalletData({ walletBalance, walletBalanceUSD }: WalletDataProps) {
  return (
    <>
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
    </>
  );
}

export default WalletData;
