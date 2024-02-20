import React, { useMemo } from "react";
import { useAccount } from "wagmi";
import makeBlockie from "ethereum-blockies-base64";
import { FlexCol } from "../../../containers/FlexCol";
import { FlexRow } from "../../../containers/FlexRow";
import { Icon } from "../../../images/Icon";
import { Typography } from "../../../text/Typography/Typography";
import { MicroButton } from "../components/MicroButton";
import { useConnectButtonContext } from "../../../../contexts/connect-wallet/useConnectButtonContext";

export const AvatarSection: React.FC<{
  accountDisplayName?: string;
}> = ({ accountDisplayName }) => {
  const { address, isConnecting } = useAccount();
  const { handleDisconnect, handleSwitchWallet } = useConnectButtonContext();

  const avatar = useMemo(() => {
    if (!address) return undefined;
    return makeBlockie(address);
  }, [address]);

  return (
    <FlexCol className="p-4 gap-2 md:text-primary-dark text-primary-contrast">
      <FlexRow className="items-center gap-2">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Icon
              src={avatar}
              isLoading={isConnecting}
              alt={`user-avatar-${accountDisplayName}`}
            />
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
