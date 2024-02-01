import {
  DisplayMoney,
  DisplayTokenAmount,
  Displayable,
  Divider,
  FlexCol,
  FlexRow,
  Icon,
  Typography,
} from "../../../../../shared";
import { ViewUserInfo } from "../../../../state/loop-strategy/types/ViewUserInfo";
import { DepositButton } from "./DepositButton";
import { WithdrawButton } from "./WithdrawButton";

import walletIcon from "../../../../../assets/wallet-icon.svg";

export const YourInfo: React.FC<{
  props: Displayable<ViewUserInfo>;
}> = ({ props }) => {
  return (
    <FlexCol className="px-6 py-4 gap-8">
      <Typography type="h3">Your Info</Typography>

      <FlexRow className="items-center gap-4">
        <Icon src={walletIcon} alt="wallet-icon" width={16} height={16} />
        <FlexCol>
          <Typography type="subheader2">Wallet balance</Typography>
          <DisplayTokenAmount
            typography="subheader1"
            {...props.data?.underlyingAssetBalance.tokenAmount}
            isLoading={props.isLoading}
          />
        </FlexCol>
      </FlexRow>
      <Divider />
      <FlexRow className="justify-between items-center">
        <FlexCol>
          <Typography type="subheader2">Available to deposit</Typography>
          <DisplayTokenAmount
            typography="main16"
            {...props?.data?.underlyingAssetBalance.tokenAmount}
            isLoading={props.isLoading}
          />
          <DisplayMoney
            typography="secondary12"
            {...props?.data?.underlyingAssetBalance.dollarAmount}
            isLoading={props.isLoading}
          />
        </FlexCol>

        <DepositButton />
      </FlexRow>

      <Divider />

      <FlexRow className="justify-between items-center">
        <FlexCol>
          <Typography type="subheader2">Available to withdraw</Typography>
          <DisplayTokenAmount
            typography="main16"
            {...props?.data?.strategyBalance.tokenAmount}
            isLoading={props.isLoading}
          />
          <DisplayMoney
            typography="secondary12"
            {...props?.data?.strategyBalance.dollarAmount}
            isLoading={props.isLoading}
          />
        </FlexCol>

        <WithdrawButton />
      </FlexRow>
    </FlexCol>
  );
};
