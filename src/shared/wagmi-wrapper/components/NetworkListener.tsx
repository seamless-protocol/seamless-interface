import React, { useEffect } from "react";
import { base } from "viem/chains";
import { useAccount } from "wagmi";
import { Typography } from "../../components/text/Typography/Typography";
import { useNotificationContext } from "../../contexts/notification/useNotificationContext";

interface NetworkListenerProps {
  children: React.ReactNode;
  message?: React.ReactNode;
}

const LocalMessage = () => {
  return (
    <div className="flex flex-col items-center w-full text-center">
      <Typography type="regular3">
        You are connected to the wrong network. <br /> Please switch to <strong>Base chain</strong>.
      </Typography>
    </div>
  );
};

export const NetworkListener: React.FC<NetworkListenerProps> = ({ children, message = <LocalMessage /> }) => {
  const { isConnected, chainId } = useAccount();
  const { showNotification, closeNotification } = useNotificationContext();

  useEffect(() => {
    if (isConnected && chainId !== base.id) {
      showNotification({
        content: message,
        status: "warning",
      });
    }

    if (isConnected && chainId === base.id) {
      closeNotification();
    }
  }, [isConnected, chainId, showNotification, closeNotification]);

  return <>{children}</>;
};
