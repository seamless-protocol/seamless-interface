import { useAccount } from "wagmi";

import notConnectedImage from "@assets/common/not-connected.svg";
import { Buttonv2, FlexCol, Image, Typography } from "@shared";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NotConnectedWalletGuard: React.FC<{
  children: React.ReactNode;
  message?: string;
}> = ({ children, message = "Connect your wallet to view your dashboard." }) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <>{children}</>;
  }

  return (
    <FlexCol className="bg-neutral-0 rounded-xl justify-center items-center gap-8 py-14">
      <Image src={notConnectedImage} alt="not-connected" width={160} height={160} />
      <FlexCol className="gap-2 justify-center items-center">
        <Typography type="bold5">No wallet connected</Typography>
        <Typography type="medium3">{message}</Typography>
      </FlexCol>

      <FlexCol>
        <ConnectButton.Custom>
          {({ openConnectModal }) => {
            return (
              <Buttonv2 fullWidth onClick={openConnectModal} className="text-regular3">
                <Typography type="bold2">Connect wallet</Typography>
              </Buttonv2>
            );
          }}
        </ConnectButton.Custom>
      </FlexCol>
    </FlexCol>
  );
};
