import { Stack, Typography } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LoadingComponent from "../../../common/LoadingComponent";

interface UserWalletInfoProps {
  isLoading?: boolean;
  walletBalance: string;
}

function UserWalletInfo({ isLoading, walletBalance }: UserWalletInfoProps) {
  return (
    <Stack
      direction="row"
      padding={0}
      spacing={2}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "25px",
        height: "25px",
      }}
    >
      <AccountBalanceWalletOutlinedIcon
        sx={{
          backgroundColor: "#F3F3F3",
          borderRadius: "8px",
          padding: "5px",
        }}
      ></AccountBalanceWalletOutlinedIcon>
      <Stack>
        <Typography
          sx={{
            fontSize: "0.8rem",
            fontFamily: "Verdana",
            color: "#000000",
          }}
        >
          Wallet balance
        </Typography>
        {isLoading ? (
          <LoadingComponent size="1.2rem" />
        ) : (
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.8rem",
              fontFamily: "Verdana",
              color: "#000000",
            }}
          >
            {walletBalance}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

export default UserWalletInfo;
