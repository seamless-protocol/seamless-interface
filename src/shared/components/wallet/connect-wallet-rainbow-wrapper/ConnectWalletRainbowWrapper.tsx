import { Button } from "../../button/Button";
import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ActionSection } from "./sections/ActionSection";
import { AvatarSection } from "./sections/AvatarSection";
import { NetworkSection } from "./sections/NetworkSection";
import { useConnectButtonContext } from "../../../contexts/connect-wallet/useConnectButtonContext";

export const ConnectWalletRainbowWrapper = () => {
  const { dropdownRef, isDropdownVisible, toggleDropdown } =
    useConnectButtonContext();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
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
                return (
                  <button
                    className="box-border text-white border-solid  border-thin
                  rounded px-3 py-1.5  transition-all duration-250 ease-in-out 
                bg-primary-main hover:bg-background-header"
                    onClick={openConnectModal}
                  >
                    Connect wallet
                  </button>
                );
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
                    <div
                      tabIndex={0}
                      role="button"
                      onClick={toggleDropdown}
                      className="box-border text-white border-solid  border-thin
                      rounded px-3 py-1.5  transition-all duration-250 ease-in-out 
                    bg-primary-main hover:bg-background-header"
                    >
                      <FlexRow className="gap-1 items-center">
                        {account.displayName}
                        <ChevronDownIcon
                          width={20}
                          className={`w-5 h-5 transition-transform ease-in-out ${isDropdownVisible ? "rotate-180" : ""}`}
                        />
                      </FlexRow>
                    </div>
                    {isDropdownVisible && (
                      <div
                        tabIndex={0}
                        className="menu dropdown-content z-[1000] left-[-100px] shadow bg-base-100 rounded-md w-72 mt-4 p-0"
                      >
                        <FlexCol className="gap-2">
                          <div className="border-b">
                            <AvatarSection
                              accountDisplayName={account.displayName}
                            />
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
