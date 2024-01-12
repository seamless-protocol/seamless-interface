import { Divider } from "@mui/material";
import UserInfoContainer from "./UserInfoContainer";
import UserInfoHeader from "./UserInfoHeader";
import UserWalletInfo from "./UserWalletInfo";
import DepositRow from "./DepositRow";
import { useFetchUserInfo } from "../../../../hooks/useFetchUserInfo";
import WithdrawRow from "./WithdrawRow";

function UserInfo() {
  const { cbEthBalance, cbEthBalanceUSD } = useFetchUserInfo();

  return (
    <UserInfoContainer>
      <UserInfoHeader />
      <UserWalletInfo walletBalance={cbEthBalance} />
      <Divider
        variant="fullWidth"
        sx={{ marginTop: "40px", marginBottom: "20px" }}
      />
      <DepositRow
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
