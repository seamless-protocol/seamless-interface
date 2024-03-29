import { Button } from "../../button/Button";
import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ActionSection } from "./sections/ActionSection";
import { AvatarSection } from "./sections/AvatarSection";
import { NetworkSection } from "./sections/NetworkSection";
import { useConnectButtonContext } from "../../../contexts/connect-wallet/useConnectButtonContext";
import { Icon } from "../../images/Icon";
import { ConnectButtonStyled } from "./components/ConnectButton";

export const ConnectWalletRainbowWrapper = () => {
  const { userAvatar, dropdownRef, isDropdownVisible, toggleDropdown, setEnsAvatar } = useConnectButtonContext();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        setEnsAvatar?.(account?.ensAvatar);

        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return <ConnectButtonStyled onClick={openConnectModal}>Connect wallet</ConnectButtonStyled>;
              }
              if (chain.unsupported) {
                return (
                  <Button size="big" color="warning" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <div className="dropdown dropdown-end" ref={dropdownRef}>
                    <ConnectButtonStyled tabIndex={0} role="button" onClick={toggleDropdown}>
                      <FlexRow className="gap-2 items-center">
                        {userAvatar && (
                          <Icon
                            className="rounded-full"
                            src={userAvatar}
                            width={20}
                            alt={`user-avatar-${account.displayName}`}
                          />
                        )}
                        {account.displayName}
                        <ChevronDownIcon
                          width={20}
                          className={`w-5 h-5 transition-transform ease-in-out ${isDropdownVisible ? "rotate-180" : ""}`}
                        />
                      </FlexRow>
                    </ConnectButtonStyled>
                    {isDropdownVisible && (
                      <div
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                        tabIndex={0}
                        className="menu dropdown-content z-[1000] left-[-100px] shadow bg-base-100 rounded-md w-72 mt-4 p-0"
                      >
                        <FlexCol className="gap-2">
                          <div className="border-b">
                            <AvatarSection accountDisplayName={account.displayName} />
                          </div>
                          <NetworkSection chainName={chain.name} />
                          <div className="border-t">
                            <ActionSection />
                          </div>
                        </FlexCol>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
