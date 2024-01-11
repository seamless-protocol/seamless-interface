import { Divider } from "@mui/material";
import UserInfoContainer from "./UserInfoContainer";
import UserInfoHeader from "./UserInfoHeader";
import UserWalletInfo from "./UserWalletInfo";
import DepositRow from "./DepositRow";
import { useFetchUserInfo } from "../../../../hooks/useFetchUserInfo";

function UserInfo() {
  const { cbEthBalance, cbEthBalanceUSD } = useFetchUserInfo();

  return (
    <UserInfoContainer>
      <UserInfoHeader />
      <UserWalletInfo walletBalance={cbEthBalance} />
      <Divider variant="fullWidth" sx={{ marginTop: "40px" }} />
      <DepositRow
        walletBalance={cbEthBalance}
        walletBalanceUSD={cbEthBalanceUSD}
      />
    </UserInfoContainer>
  );
}

export default UserInfo;
