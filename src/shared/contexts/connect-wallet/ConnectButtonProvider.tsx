import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useDropdown } from "../../hooks/useDropdown";
import { RouterConfig } from "../../../app/router";
import { useUserAvatar } from "../../hooks/useUserAvatar";
import { useFetchIsAddressSanctioned } from "../../../app/state/common/hooks/useFetchIsAddressSanctioned";

interface ConnectButtonContextType {
  isConnected: boolean;
  isDropdownVisible: boolean;
  setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  setIsDropdownVisible: () => {},
  toggleDropdown: () => {},
  handleDisconnect: async () => {},
  handleSwitchWallet: async () => {},
  handleCopyAddressClick: async () => {},
  handleViewItOnExplorer: () => {},
  dropdownRef: { current: null },
};

export const ConnectButtonContext =
  createContext<ConnectButtonContextType>(defaultContextValue);

export const ConnectButtonProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isConnected, address } = useAccount();
  const { isSanctioned } = useFetchIsAddressSanctioned(address);
  const { avatar } = useUserAvatar();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const [ensAvatar, setEnsAvatar] = useState<string | undefined>();
  const [attemptingToSwitch, setAttemptingToSwitch] = useState(false);
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
    const url = RouterConfig.Builder.baseScan(address);
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

  return (
    <ConnectButtonContext.Provider value={contextValue}>
      {children}
    </ConnectButtonContext.Provider>
  );
};
