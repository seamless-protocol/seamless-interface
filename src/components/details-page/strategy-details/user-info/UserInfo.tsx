import { Divider } from "@mui/material";
import UserInfoContainer from "./UserInfoContainer";
import UserInfoHeader from "./UserInfoHeader";
import UserWalletInfo from "./UserWalletInfo";
import DepositRow from "./DepositRow";
import { useFetchUserInfo } from "../../../../hooks/useFetchUserInfo";
import WithdrawRow from "./WithdrawRow";

function UserInfo() {
  const { isLoading, cbEthBalance, cbEthBalanceUSD } = useFetchUserInfo();

  return (
    <UserInfoContainer>
      <UserInfoHeader />
      <UserWalletInfo isLoading={isLoading} walletBalance={cbEthBalance} />
      <Divider
        variant="fullWidth"
        sx={{ marginTop: "40px", marginBottom: "20px" }}
      />
      <DepositRow
        isLoading={isLoading}
        walletBalance={cbEthBalance}
        walletBalanceUSD={cbEthBalanceUSD}
      />
      <Divider
        variant="fullWidth"
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      />
      <WithdrawRow />
    </UserInfoContainer>
  );
}

export default UserInfo;
