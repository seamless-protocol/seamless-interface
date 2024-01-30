import {
  DisplayMoney,
  DisplayTokenAmount,
  Divider,
  FlexCol,
  FlexRow,
  Icon,
  Typography,
} from "../../../../../shared";
import { DepositButton } from "./DepositButton";
import { WithdrawButton } from "./WithdrawButton";

import walleIcon from "/public/walle-icon.svg";

export const YourInfo = () => {
  return (
    <FlexCol className="px-6 py-4 gap-8">
      <Typography type="h3">Your Info</Typography>

      <FlexRow className="items-center gap-4">
        <Icon src={walleIcon} alt="wallet-icon" width={16} height={16} />
        <FlexCol>
          <Typography type="subheader2">Wallet balance</Typography>
          <DisplayTokenAmount typography="subheader1" value="0.00" />
        </FlexCol>
      </FlexRow>
      <Divider />
      <FlexRow className="justify-between items-center">
        <FlexCol>
          <Typography type="subheader2">Available to deposit</Typography>
          <DisplayTokenAmount typography="main16" symbol="cbETH" value="0.00" />
          <DisplayMoney typography="secondary12" value="0.00" />
        </FlexCol>

        <DepositButton />
      </FlexRow>

      <Divider />

      <FlexRow className="justify-between items-center">
        <FlexCol>
          <Typography type="subheader2">Available to withdraw</Typography>
          <DisplayTokenAmount typography="main16" symbol="cbETH" value="0.00" />
          <DisplayMoney typography="secondary12" value="0.00" />
        </FlexCol>

        <WithdrawButton />
      </FlexRow>
    </FlexCol>
  );
};
