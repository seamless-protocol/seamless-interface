import React from "react";
import { useAccount } from "wagmi";
import { FlexCol } from "../containers/FlexCol";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectButtonStyled } from "../wallet/connect-wallet-rainbow-wrapper/components/ConnectButton";
import { Typography } from "../text/Typography/Typography";

/**
 * `AuthGuard` Component Documentation
 *
 * The `AuthGuard` component is a React component designed to conditionally render its children
 * based on the wallet connection status of a user. When the user's wallet is not connected,
 * it displays a customizable message along with wallet connection options. Once the wallet is connected,
 * it renders the children components, making it useful for protecting content that requires a wallet connection.
 *
 * ### Key Features:
 * - **Wallet Connection Check**: Utilizes the `useAccount` hook from `wagmi` to check the wallet's connection status.
 * - **Customizable Message**: Provides an optional prop to customize the message shown to users without a connected wallet.
 * - **Flexible Typography**: Uses the `Typography` component to allow customization of the message's typography, supporting different `TypographyType` values.
 * - **Styling Flexibility**: Accepts custom CSS classes through the `className` prop to style the component's container, enhancing its adaptability to different UI designs.
 *
 * ### Props:
 * - `children` (React.ReactNode): Content or components to be rendered when the user's wallet is connected. This is the guarded content.
 * - `message` (React.ReactNode, optional): A customizable message displayed when the wallet is not connected. Defaults to a generic message prompting the user to connect their wallet.
 * - `className` (string, optional): A class name for additional styling of the component's outer container. Helps integrate the component into the application's styling theme.
 * - `typography` (`TypographyType`, optional): Specifies the typography style for the message. This prop is not directly implemented in the current version but mentioned for future flexibility with the `Typography` component.
 *
 * ### Usage Example:
 *
 * ```jsx
 * <AuthGuard message={<Typography type="description">Please connect your wallet to access this feature.</Typography>}>
 *   <ProtectedContent />
 * </AuthGuard>
 * ```
 *
 * In this usage example, the `AuthGuard` checks if the user's wallet is connected. If the wallet is not connected,
 * it displays a custom message with an option to connect the wallet. Once the wallet is connected, the `ProtectedContent` component is rendered.
 *
 * @param {Object} props - The props for the `AuthGuard` component.
 * @param {React.ReactNode} props.children - The content to be displayed upon successful wallet connection.
 * @param {React.ReactNode} [props.message] - Optional custom message component to display when the wallet is not connected.
 * @param {string} [props.className] - Optional custom CSS class for styling the component.
 * @returns {React.ReactElement} The rendered `AuthGuard` component.
 */

export const AuthGuard: React.FC<{
  children: React.ReactNode;
  message?: React.ReactNode;
  className?: string;
}> = ({
  children,
  message = <Typography type="description">Please connect a wallet to view your personal information here.</Typography>,
  className = "",
}) => {
  const { isConnected } = useAccount();

  if (!isConnected)
    return (
      <FlexCol className={`gap-1 ${className}`}>
        {message}
        <div className="">
          <ConnectButton.Custom>
            {({ openConnectModal }) => {
              return <ConnectButtonStyled onClick={openConnectModal}>Connect wallet</ConnectButtonStyled>;
            }}
          </ConnectButton.Custom>
        </div>
      </FlexCol>
    );
  return <>{children}</>;
};
