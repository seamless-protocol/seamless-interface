import React, { createContext, useState, useEffect, PropsWithChildren } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useDropdown } from "../../hooks/ui-hooks/useDropdown";
import { RouterConfig } from "../../../app/router";
import { useUserAvatar } from "../../hooks/wallet-hooks/useUserAvatar";
import { useFetchIsAddressSanctioned } from "../../state/queries/useFetchIsAddressSanctioned";
import { useNotificationContext } from "../notification/useNotificationContext";
import { useFetchIsUserRestricted } from "../../../app/data/common/queries/is-user-restricted/IsUserRestricted.hook";

interface ConnectButtonContextType {
  isConnected: boolean;
  isDropdownVisible: boolean;
  setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;

  toggleDropdown: (e: React.MouseEvent<any, MouseEvent>) => void;
  handleDisconnect: () => Promise<void>;
  handleSwitchWallet: () => Promise<void>;
  handleCopyAddressClick: () => Promise<void>;
  handleViewItOnExplorer: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  userAvatar?: string;
  setEnsAvatar?: (value?: string | undefined) => void;
}

const defaultContextValue: ConnectButtonContextType = {
  isConnected: false,
  isDropdownVisible: false,
  setIsDropdownVisible: () => { },
  toggleDropdown: () => { },
  handleDisconnect: async () => { },
  handleSwitchWallet: async () => { },
  handleCopyAddressClick: async () => { },
  handleViewItOnExplorer: () => { },
  dropdownRef: { current: null },
};

export const ConnectButtonContext = createContext<ConnectButtonContextType>(defaultContextValue);

export const ConnectButtonProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isConnected, address } = useAccount();
  const { isSanctioned } = useFetchIsAddressSanctioned(address);
  const { data: isUserRestricted } = useFetchIsUserRestricted();
  const { avatar } = useUserAvatar();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const [ensAvatar, setEnsAvatar] = useState<string | undefined>();
  const [attemptingToSwitch, setAttemptingToSwitch] = useState(false);
  const { showNotification } = useNotificationContext();
  const dropdown = useDropdown();

  useEffect(() => {
    if (!isConnected && attemptingToSwitch) {
      openConnectModal?.();
      setAttemptingToSwitch(false);
    }

    if (isSanctioned) {
      handleDisconnect();
    }
  }, [isConnected, isSanctioned, attemptingToSwitch, openConnectModal]);

  useEffect(() => {
    if (isUserRestricted) {
      showNotification({
        status: "error",
        content: "You are restricted from using this wallet.",
      });
    }
  }, [isUserRestricted, showNotification]);

  const handleDisconnect = async () => {
    disconnect();
    dropdown.setIsDropdownVisible(false);
  };

  const handleSwitchWallet = async () => {
    disconnect();
    setAttemptingToSwitch(true);
    dropdown.setIsDropdownVisible(false);
  };

  const handleCopyAddressClick = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
      } catch (error) {
        console.error("Failed to copy address:", error);
      }
    }
    dropdown.setIsDropdownVisible(false);
  };

  const handleViewItOnExplorer = () => {
    if (!address) return;
    const url = RouterConfig.Builder.baseScanAddress(address);
    window.open(url, "_blank");
    dropdown.setIsDropdownVisible(false);
  };

  const contextValue = {
    ...dropdown,
    isConnected,
    handleDisconnect,
    handleSwitchWallet,
    handleCopyAddressClick,
    handleViewItOnExplorer,
    dropdownRef: dropdown.dropdownRef,
    setEnsAvatar: (ensAvatar?: string) => {
      setTimeout(() => {
        if (ensAvatar) setEnsAvatar?.(ensAvatar);
      }, 0);
    },
    userAvatar: ensAvatar || avatar,
  };

  return <ConnectButtonContext.Provider value={contextValue}>{children}</ConnectButtonContext.Provider>;
};
