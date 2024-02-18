import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ActionSection } from "./components/sections/ActionSection";
import { AvatarSection } from "./components/sections/AvatarSection";
import { NetworkSection } from "./components/sections/NetworkSection";
import { useAccount } from "wagmi";

export const ConnectWalletRainbowWrapperMobile = () => {
  const { isConnected } = useAccount();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsDropdownVisible((isDropdownVisible) => !isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, chain }) => {
        return (
          <>
            <button
              onClick={(e) => {
                if (isConnected) toggleDropdown(e);
                else openConnectModal();
              }}
              className="box-border  border-solid  border-thin
              rounded px-3 py-1.5  transition-all duration-250 ease-in-out 
            bg-primary-main hover:bg-background-header"
            >
              <FlexRow className="gap-1 items-center">
                {isConnected ? account?.displayName : "Connect Wallet"}
                {isConnected && (
                  <ChevronDownIcon
                    width={20}
                    className={`w-5 h-5 transition-transform ease-in-out ${isDropdownVisible ? "rotate-180" : ""}`}
                  />
                )}
              </FlexRow>
            </button>

            <WalletContent
              chainName={chain?.name}
              accountDisplayName={account?.displayName}
              isWalletMenuOpen={isDropdownVisible}
              setIsWalletMenuOpen={setIsDropdownVisible}
            />
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};

const WalletContent: React.FC<{
  accountDisplayName?: string | undefined;
  chainName?: string | undefined;
  isWalletMenuOpen?: boolean;
  setIsWalletMenuOpen: (value: boolean) => void;
}> = ({
  accountDisplayName,
  chainName,
  isWalletMenuOpen: isMenuOpen,
  setIsWalletMenuOpen: setIsMenuOpen,
}) => {
  return (
    <>
      <div
        className={`md:hidden  ${isMenuOpen ? "fixed top-12 inset-0 z-50 bg-slate-800" : "hidden"} transform 
          transition-transform duration-300 ease-in-out`}
      >
        <FlexCol className="gap-2">
          <div className="border-b">
            <AvatarSection
              accountDisplayName={accountDisplayName}
              setIsDropdownVisible={setIsMenuOpen}
            />
          </div>
          <NetworkSection chainName={chainName} />
          <div className="border-t">
            <ActionSection setIsDropdownVisible={setIsMenuOpen} />
          </div>
        </FlexCol>
      </div>
    </>
  );
};
