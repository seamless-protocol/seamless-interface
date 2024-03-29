import React from "react";
import { Address } from "viem";
import { FlexCol } from "../../containers/FlexCol";
import { Icon } from "../../images/Icon";
import { Button } from "../../button/Button";
import { useWatchAsset } from "../../../hooks/wallet-hooks/useWatchAsset";
import walletIconWhite from "@assets/common/wallet-icon-white.svg";
import { useToken } from "../../../state/meta-data-queries/useToken";
import { Typography } from "../../text/Typography/Typography";

interface Token {
  symbol: string;
  address: Address;
  logo?: string;
  decimals?: number;
}
/**
 * `WatchAssetComponent` Component
 *
 * This component provides a user interface for adding a specified coin to the user's MetaMask wallet.
 * It utilizes the `useWatchAssetComponent` hook to perform the addition operation.
 *
 * * IMPORTANT Note: Logo in wallet will be overriden from public-wallet-logos.config file. Make sure to update it.
 *
 * ## Key Features:
 * - **Dynamic Coin Data**: Accepts coin data (symbol, address, logo, and decimals) as props.
 * - **Logo**: The logo URL passed via props is only used inside application. Wallet uses logo from `PublicWalletLogosConfig` file.
 * - **User Feedback**: Displays loading state while the add-to-wallet operation is pending.
 *
 * ## Usage:
 *
 * ```jsx
 * <WatchAssetComponent
 *   symbol="ETH"
 *   address="0x123..."
 *   logo={assets/token/yourLogo}
 *   decimals={18}
 * />
 * ```
 *
 * IMPORTANT Note: Logo in wallet will be overriden from public-wallet-logos.config file. Make sure to update it.
 * In this example, the `WatchAssetComponent` component renders an interface for adding Ethereum to the wallet, using the provided logo and details.
 *
 * @param {Token} props The Token details.
 * @returns {React.FC} A React functional component.
 */
export const WatchAssetComponent: React.FC<Token> = ({ symbol, address, logo }) => {
  const { mutateAsync, isPending } = useWatchAsset();
  const {
    data: { decimals },
  } = useToken(address);

  const handleAddToWalletClick = async () => {
    await mutateAsync({
      symbol,
      address,
      decimals,
      logo,
    });
  };

  return (
    <FlexCol className="p-3 gap-3 bg-background-disabled my-4 rounded-md items-center">
      <Icon src={logo} width={30} alt={`${symbol}-icon`} />
      <Typography>
        Add <strong>{symbol}</strong> to wallet to track your balance.
      </Typography>
      <Button loading={isPending} onClick={handleAddToWalletClick} className="flex flex-row gap-3">
        <Icon src={walletIconWhite} width={20} alt="wallet-icon-white" />
        Add to wallet
      </Button>
    </FlexCol>
  );
};
