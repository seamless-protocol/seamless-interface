import React from "react";
import { FlexCol } from "../../../containers/FlexCol";
import { FlexRow } from "../../../containers/FlexRow";
import { Icon } from "../../../images/Icon";
import { MicroButton } from "../components/MicroButton";
import { useConnectButtonContext } from "../../../../contexts/connect-wallet/useConnectButtonContext";
import { Typography } from "../../../text/Typography/Typography";

export const AvatarSection: React.FC<{
  accountDisplayName?: string;
}> = ({ accountDisplayName }) => {
  const { handleDisconnect, handleSwitchWallet, userAvatar } = useConnectButtonContext();

  return (
    <FlexCol className="p-4 gap-2 md:text-primary-dark text-primary-contrast">
      <FlexRow className="items-center gap-2">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Icon src={userAvatar} alt={`user-avatar-${accountDisplayName}`} />
          </div>
        </div>
        <Typography type="h4" className="md:text-primary-dark text-primary-contrast">
          {accountDisplayName}
        </Typography>
      </FlexRow>

      <FlexRow className="gap-2">
        <MicroButton text="SWITCH WALLET" handleClick={handleSwitchWallet} />
        <MicroButton text="DISCONNECT" handleClick={handleDisconnect} />
      </FlexRow>
    </FlexCol>
  );
};
