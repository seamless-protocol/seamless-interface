import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ActionSection } from "./sections/ActionSection";
import { AvatarSection } from "./sections/AvatarSection";
import { NetworkSection } from "./sections/NetworkSection";
import { useConnectButtonContext } from "../../../contexts/connect-wallet/useConnectButtonContext";
import { Icon } from "../../images/Icon";

export const ConnectWalletRainbowWrapperMobile = () => {
  const {
    userAvatar,
    setEnsAvatar,
    isConnected,
    isDropdownVisible,
    toggleDropdown,
  } = useConnectButtonContext();

  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, chain }) => {
        setEnsAvatar?.(account?.ensAvatar);
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
                {userAvatar && (
                  <Icon
                    className="rounded-full"
                    src={userAvatar}
                    width={20}
                    alt={`user-avatar-${account?.displayName}`}
                  />
                )}
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
}> = ({ accountDisplayName, chainName, isWalletMenuOpen: isMenuOpen }) => {
  return (
    <>
      <div
        className={`md:hidden  ${isMenuOpen ? "fixed top-16 inset-0 z-50 bg-slate-800" : "hidden"} transform 
          transition-transform duration-300 ease-in-out`}
      >
        <FlexCol className="gap-2">
          <div className="border-b">
            <AvatarSection accountDisplayName={accountDisplayName} />
          </div>
          <NetworkSection chainName={chainName} />
          <div className="border-t">
            <ActionSection />
          </div>
        </FlexCol>
      </div>
    </>
  );
};
