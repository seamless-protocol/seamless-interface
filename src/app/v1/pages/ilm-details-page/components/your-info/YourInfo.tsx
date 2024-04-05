import {
  AuthGuard,
  DisplayMoney,
  DisplayTokenAmount,
  Divider,
  FlexCol,
  FlexRow,
  Icon,
  Tooltip,
  Typography,
} from "@shared";
import { useFetchViewUserInfo } from "../../hooks/useFetchViewUserInfo";
import { DepositModal } from "./deposit/DepositModal";
import { WithdrawModal } from "./withdraw/WithdrawModal";

import walletIcon from "@assets/common/wallet-icon.svg";

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
            <Tooltip tooltip={viewUserInfo?.data?.underlyingAssetBalance.tokenAmount.symbol} size="small">
              <DisplayTokenAmount
                typography="main16"
                {...viewUserInfo?.data?.underlyingAssetBalance.tokenAmount}
                isFetched={viewUserInfo.isFetched}
              />
            </Tooltip>
            <DisplayMoney
              typography="secondary12"
              {...viewUserInfo?.data?.underlyingAssetBalance.dollarAmount}
              isFetched={viewUserInfo.isFetched}
            />
          </FlexCol>

          <DepositModal
            id={id}
            disabled={!Number(viewUserInfo?.data?.underlyingAssetBalance.tokenAmount.bigIntValue)}
            className="w-28 flex items-center rounded-[4px] justify-center space-x-2rounded-[4px] py-[10px] px-6 
            text-text-primary text-description hover:bg-primary-dark bg-primary-main"
            type="button"
          >
            Deposit
          </DepositModal>
        </FlexRow>

        <Divider />

        <FlexRow className="justify-between items-center">
          <FlexCol>
            <Typography type="subheader2">Available to withdraw</Typography>
            <Tooltip tooltip={viewUserInfo?.data?.strategyBalance.tokenAmount.symbol} size="small">
              <DisplayTokenAmount
                typography="main16"
                {...viewUserInfo?.data?.strategyBalance.tokenAmount}
                className="w-36"
                isFetched={viewUserInfo.isFetched}
              />
            </Tooltip>
            <DisplayMoney
              typography="secondary12"
              {...viewUserInfo?.data?.strategyBalance.dollarAmount}
              isFetched={viewUserInfo.isFetched}
            />
          </FlexCol>

          <WithdrawModal
            id={id}
            disabled={!Number(viewUserInfo?.data?.strategyBalance.tokenAmount.bigIntValue)}
            className="w-28 flex items-center rounded-[4px] justify-center space-x-2rounded-[4px] py-[10px] px-6 
            text-text-primary text-description hover:bg-primary-dark bg-primary-main"
            type="button"
          >
            Withdraw
          </WithdrawModal>
        </FlexRow>
      </AuthGuard>
    </FlexCol>
  );
};
