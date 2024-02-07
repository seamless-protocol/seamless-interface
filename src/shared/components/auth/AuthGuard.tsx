import React from "react";
import { useAccount } from "wagmi";
import { WalletOptions } from "../wallet/WalletOptions";
import { FlexCol } from "../containers/FlexCol";
import { Typography } from "../text/Typography/Typography";
import { TypographyType } from "../text/Typography/mappers";

/**
 * `AuthGuard` Component
 *
 * The `AuthGuard` component is designed to conditionally render content based on the user's wallet connection status. It displays a customizable message prompting the user to connect their wallet if they are not connected. Once the user connects their wallet, it renders the child components passed to it.
 *
 * ## Key Features:
 * - **Wallet Connection Check**: Automatically checks if the user's wallet is connected using the `useAccount` hook from `wagmi`.
 * - **Customizable Message**: Displays a message to users who have not connected their wallet, with the ability to customize this message.
 * - **Flexible Typography**: Allows the customization of the typography style of the message using the `Typography` component and `TypographyType`.
 * - **Extensibility with Custom Classes**: Accepts custom CSS classes to style the container that holds the message and wallet options.
 *
 * ## Props:
 * - `children`: The content to be rendered if the wallet is connected.
 * - `message`: Optional message to display when the wallet is not connected. Defaults to a generic connect wallet message.
 * - `className`: Optional string for additional custom CSS classes to style the outer container.
 * - `typography`: A `TypographyType` value to customize the typography style of the message text.
 *
 * ## Usage:
 *
 * ```jsx
 * <AuthGuard message="Custom message here" typography="h1">
 *   <YourComponent />
 * </AuthGuard>
 * ```
 *
 * In this example, the `AuthGuard` component checks if the user's wallet is connected. If not, it displays "Custom message here" with `h1` typography styling. If the wallet is connected, it renders `<YourComponent />`.
 *
 * @param props Props for the `AuthGuard` component.
 * @returns The `AuthGuard` component, rendering either a connect wallet message with options or the child components.
 */

export const AuthGuard: React.FC<{
  children: React.ReactNode;
  message?: string;
  className?: string;
  typography?: TypographyType;
}> = ({
  children,
  message = "Please connect a wallet to view your personal information here.",
  className = "",
  typography = "description",
}) => {
  const { isConnected } = useAccount();

  if (!isConnected)
    return (
      <FlexCol className={`gap-1 ${className}`}>
        <Typography type={typography}>{message}</Typography>
        <div className="bg-background-header">
          <WalletOptions />
        </div>
      </FlexCol>
    );
  return <>{children}</>;
};
