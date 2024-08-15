import React from "react";
import { Address } from "viem";
import { FlexCol } from "../../containers/FlexCol";
import { Icon } from "../../images/Icon";
import { useWatchAsset } from "../../../hooks/wallet-hooks/useWatchAsset";
import walletIconWhite from "@assets/common/wallet-icon-white.svg";
import { useToken } from "../../../state/meta-data-queries/useToken";
import { Typography } from "../../text/Typography/Typography";
import { Buttonv2 } from "../../button/Buttonv2";

interface Token {
  address?: Address;
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
export const WatchAssetComponentv2: React.FC<Token> = ({ address, logo }) => {
  const { mutateAsync, isPending } = useWatchAsset();
  const {
    data: { decimals, symbol },
  } = useToken(address);

  const handleAddToWalletClick = async () => {
    if (!address || !decimals || !symbol) return;

    await mutateAsync({
      symbol,
      address,
      decimals,
      logo,
    });
  };

  return (
    <FlexCol className="p-3 gap-3 bg-neutral-100 my-4 rounded-md items-center">
      <Icon src={logo} width={30} alt={`${symbol}-icon`} />
      <Typography type="medium3">
        Add <strong>{symbol}</strong> to wallet to track your balance.
      </Typography>
      <Buttonv2 size="small" loading={isPending} onClick={handleAddToWalletClick} className="flex flex-row gap-3">
        <Icon src={walletIconWhite} width={20} alt="wallet-icon-white" />
        Add to wallet
      </Buttonv2>
    </FlexCol>
  );
};
