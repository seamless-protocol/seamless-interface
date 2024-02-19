import React from "react";
import { FlexCol } from "../../../../containers/FlexCol";
import { FlexRow } from "../../../../containers/FlexRow";
import { Typography } from "../../../../text/Typography/Typography";
import { MicroButton } from "../MicroButton";
import { useAccount, useDisconnect } from "wagmi";
import avatar from "@assets/common/avatar.png";

export const AvatarSection: React.FC<{
  accountDisplayName?: string;
  setIsDropdownVisible?: (value: boolean) => void;
  openConnectModal?: () => void;
}> = ({ accountDisplayName, setIsDropdownVisible, openConnectModal }) => {
  const { connector } = useAccount();
  const { disconnect } = useDisconnect();
  const handleDisconnect = async () => {
    await disconnect({
      connector,
    });
    if (setIsDropdownVisible) setIsDropdownVisible(false);
  };

  const handleSwitchWallet = async () => {
    if (openConnectModal) openConnectModal();
    await handleDisconnect();
    if (setIsDropdownVisible) setIsDropdownVisible(false);
  };

  return (
    <FlexCol className="p-4 gap-2 md:text-primary-dark text-primary-contrast">
      <FlexRow className="items-center gap-2">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={avatar} alt={`user-avatar-${accountDisplayName}`} />
          </div>
        </div>
        <Typography
          type="h4"
          className="md:text-primary-dark text-primary-contrast"
        >
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
