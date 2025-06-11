import React, { useEffect } from "react";
import { base } from "viem/chains";
import { useAccount, useDisconnect } from "wagmi";
import { Typography } from "../../components/text/Typography/Typography";
import { useNotificationContext } from "../../contexts/notification/useNotificationContext";
import { useFetchIsUserRestricted } from "@app/statev3/common/queries/is-user-restricted/IsUserRestricted.hook";
import { useFetchIsAddressSanctioned } from "../../state/queries/useFetchIsAddressSanctioned";

const WrongNetworkMessage = () => {
  return (
    <div className="flex flex-col items-center w-full text-center">
      <Typography type="regular3">
        You are connected to the wrong network. <br /> Please switch to <strong>Base chain</strong>.
      </Typography>
    </div>
  );
};

const RestrictedWalletMessage = () => {
  return (
    <div className="flex flex-col items-center w-full text-center">
      <Typography type="regular3">Sorry, you are unable to use this application because your current location is not supported due to country restrictions. If you believe this is an error or have questions, please contact support.</Typography>
    </div>
  );
};

export const NetworkCheck: React.FC = () => {
  const { disconnect } = useDisconnect();
  const { isConnected, chainId, address } = useAccount();
  const { isSanctioned } = useFetchIsAddressSanctioned(address);
  const { data: isUserRestricted } = useFetchIsUserRestricted();
  const { showNotification, closeNotification } = useNotificationContext();

  useEffect(() => {
    if (isConnected && chainId !== base.id) {
      showNotification({
        content: <WrongNetworkMessage />,
        status: "warning",
      });
    }

    if (isConnected && chainId === base.id) {
      closeNotification();
    }
  }, [isConnected, chainId, showNotification, closeNotification]);

  useEffect(() => {
    if (isUserRestricted) {
      showNotification({
        content: <RestrictedWalletMessage />,
        status: "error",
        showCloseButton: false,
        headerText: "Country Access Restricted",
      });
    }
  }, [isUserRestricted, showNotification]);

  useEffect(() => {
    if (isSanctioned) {
      disconnect();
    }
  }, [isSanctioned, disconnect]);

  return <> </>;
};
