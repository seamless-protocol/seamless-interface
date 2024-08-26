import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FlexRow } from "../../containers/FlexRow";
import { Typography } from "../../text/Typography/Typography";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export const ConnectWalletRainbowWrapperv3 = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");
        const displayAddressSidebar = account ? `${account.address.slice(0, 5)}...${account.address.slice(-5)}` : "";

        return (
          <div
            className=""
            {...(!ready && { "aria-hidden": true, style: { opacity: 0, pointerEvents: "none", userSelect: "none" } })}
          >
            {!connected ? (
              <LocalButton className="text-medium3" onClick={openConnectModal}>
                Connect wallet
              </LocalButton>
            ) : chain.unsupported ? (
              <LocalButton onClick={openChainModal} className="bg-error text-medium3">
                Switch To Mainnet
              </LocalButton>
            ) : (
              <LocalButton onClick={openAccountModal}>
                <FlexRow className="justify-between items-center gap-4">
                  <Typography type="medium3">{displayAddressSidebar}</Typography>
                  <Cog6ToothIcon width={24} height={24} />
                </FlexRow>
              </LocalButton>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

const LocalButton = ({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`
         rounded-lg bg-neutral-0 py-3 px-4 items-center flex
        ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
