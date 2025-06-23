import React, { useEffect } from "react";
import { base } from "viem/chains";
import { useAccount, useDisconnect } from "wagmi";
import { Typography } from "../../components/text/Typography/Typography";
import { useNotificationContext } from "../../contexts/notification/useNotificationContext";
import { useFetchIsAddressSanctioned } from "../../state/queries/useFetchIsAddressSanctioned";
import { discordUrl } from "@router";
import { Link } from "react-router-dom";
import { useFetchIsUserRestricted } from "../../../app/data/common/queries/is-user-restricted/IsUserRestricted.hook";

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
      <Typography type="regular3">
        Sorry, it seems like you are trying to access this application from a restricted country. If you believe this is an error, try refreshing the page or open a support ticket in the Seamless Community{" "}
        <Link to={discordUrl} className="text-bold3 underline" target="_blank" rel="noreferrer">Discord</Link>
      </Typography>
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
