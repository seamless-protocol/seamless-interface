import { Divider } from "@mui/material";
import UserInfoContainer from "./UserInfoContainer";
import UserInfoHeader from "./UserInfoHeader";
import UserWalletInfo from "./UserWalletInfo";
import DepositRow from "./DepositRow";
import WithdrawRow from "./WithdrawRow";
import { useFetchViewUserInfo } from "../../../../state/loop-strategy/hooks/useFetchViewUserInfo";

function UserInfo() {
  const { isLoading, data } = useFetchViewUserInfo(0);

  return (
    <UserInfoContainer>
      <UserInfoHeader />
      <UserWalletInfo
        isLoading={isLoading}
        walletBalance={data?.underlyingAssetBalance.tokenAmount.value!}
      />
      <Divider
        variant="fullWidth"
        sx={{ marginTop: "40px", marginBottom: "20px" }}
      />
      <DepositRow
        isLoading={isLoading}
        walletBalance={data?.underlyingAssetBalance.tokenAmount.value!}
        walletBalanceUSD={data?.underlyingAssetBalance.dollarAmount.value!}
      />
      <Divider
        variant="fullWidth"
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      />
      <WithdrawRow
        isLoading={isLoading}
        walletBalance={data?.strategyBalance.tokenAmount.value!}
        walletBalanceUSD={data?.strategyBalance.dollarAmount.value!}
      />
    </UserInfoContainer>
  );
}

export default UserInfo;
