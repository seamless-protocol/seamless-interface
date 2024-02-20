import React from "react";
import { Address } from "viem";
import { FlexCol } from "../../containers/FlexCol";
import { FlexRow } from "../../containers/FlexRow";
import { Icon } from "../../images/Icon";
import { Typography } from "../../text/Typography/Typography";
import { Button } from "../../button/Button";
import { useAddCoinToWallet } from "../../../../app/state/common/hooks/useAddCoinToWallet";

interface Coin {
  symbol: string;
  address: Address;
  logo?: string;
  decimals?: number;
}
/**
 * `AddCoinToWallet` Component
 *
 * This component provides a user interface for adding a specified coin to the user's MetaMask wallet.
 * It utilizes the `useAddCoinToWallet` hook to perform the addition operation.
 *
 * * IMPORTANT Note: Logo in wallet will be overriden from public-wallet-logos-config file. Make sure to update it.
 *
 * ## Key Features:
 * - **Dynamic Coin Data**: Accepts coin data (symbol, address, logo, and decimals) as props.
 * - **Logo**: The logo URL passed via props is only used inside application. Wallet uses logo from `PublicWalletLogosConfig` file.
 * - **User Feedback**: Displays loading state while the add-to-wallet operation is pending.
 *
 * ## Usage:
 *
 * ```jsx
 * <AddCoinToWallet
 *   symbol="ETH"
 *   address="0x123..."
 *   logo={assets/token/yourLogo}
 *   decimals={18}
 * />
 * ```
 *
 * IMPORTANT Note: Logo in wallet will be overriden from public-wallet-logos-config file. Make sure to update it.
 * In this example, the `AddCoinToWallet` component renders an interface for adding Ethereum to the wallet, using the provided logo and details.
 *
 * @param {Coin} props The coin details.
 * @returns {React.FC} A React functional component.
 */
export const AddCoinToWallet: React.FC<Coin> = ({
  symbol,
  address,
  logo,
  decimals,
}) => {
  const { mutateAsync, isPending } = useAddCoinToWallet();

  const handleAddToWalletClick = async () => {
    await mutateAsync({
      symbol,
      address,
      decimals,
      logo,
    });
  };

  return (
    <FlexCol className="p-3 gap-3 border my-4 rounded-md">
      <FlexRow className="p-1 gap-2 items-start">
        <Icon src={logo} width={40} alt={`${symbol}-icon`} />

        <FlexCol className="gap-1 px-1 items-start">
          <Typography>{symbol}</Typography>
          <Typography type="subheader2">New asset in your wallet?</Typography>
        </FlexCol>
      </FlexRow>
      <Button fullWidth loading={isPending} onClick={handleAddToWalletClick}>
        Add to wallet
      </Button>
    </FlexCol>
  );
};
