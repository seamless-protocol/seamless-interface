import {
  AuthGuard,
  DisplayMoney,
  DisplayTokenAmount,
  Divider,
  FlexCol,
  FlexRow,
  Icon,
  Typography,
} from "../../../../../shared";
import { useFetchViewUserInfo } from "../../../../state/loop-strategy/hooks/useFetchViewUserInfo";
import { DepositModal } from "./DepositModal";
import { WithdrawModal } from "./WithdrawModal";

import walletIcon from "../../../../../assets/common/wallet-icon.svg";

interface YourInfoProps {
  id: number;
}

export const YourInfo: React.FC<YourInfoProps> = ({ id }: YourInfoProps) => {
  const viewUserInfo = useFetchViewUserInfo(id);

  return (
    <FlexCol className="px-6 py-4 gap-8">
      <Typography type="h3">Your Info</Typography>
      <AuthGuard>
        <FlexRow className="items-center gap-4">
          <Icon src={walletIcon} alt="wallet-icon" width={16} height={16} />
          <FlexCol>
            <Typography type="subheader2">Wallet balance</Typography>
            <DisplayTokenAmount
              typography="subheader1"
              {...viewUserInfo.data?.underlyingAssetBalance.tokenAmount}
              isFetched={viewUserInfo.isFetched}
            />
          </FlexCol>
        </FlexRow>
        <Divider />
        <FlexRow className="justify-between items-center">
          <FlexCol>
            <Typography type="subheader2">Available to deposit</Typography>
            <DisplayTokenAmount
              typography="main16"
              {...viewUserInfo?.data?.underlyingAssetBalance.tokenAmount}
              isFetched={viewUserInfo.isFetched}
            />
            <DisplayMoney
              typography="secondary12"
              {...viewUserInfo?.data?.underlyingAssetBalance.dollarAmount}
              isFetched={viewUserInfo.isFetched}
            />
          </FlexCol>

          <DepositModal
            id={id}
            disabled={
              !Number(
                viewUserInfo?.data?.underlyingAssetBalance.tokenAmount
                  .originalValue
              )
            }
          />
        </FlexRow>

        <Divider />

        <FlexRow className="justify-between items-center">
          <FlexCol>
            <Typography type="subheader2">Available to withdraw</Typography>
            <DisplayTokenAmount
              typography="main16"
              {...viewUserInfo?.data?.strategyBalance.tokenAmount}
              isFetched={viewUserInfo.isFetched}
            />
            <DisplayMoney
              typography="secondary12"
              {...viewUserInfo?.data?.strategyBalance.dollarAmount}
              isFetched={viewUserInfo.isFetched}
            />
          </FlexCol>

          <WithdrawModal
            id={id}
            disabled={
              !Number(
                viewUserInfo?.data?.strategyBalance.tokenAmount.originalValue
              )
            }
          />
        </FlexRow>
      </AuthGuard>
    </FlexCol>
  );
};
