import { useAccount } from "wagmi";
import { Account } from "./Account";
import { WalletOptions } from "./WalletOptions";

//TODO: Remove this component once third parties start supporting new Wagmi version
function ConnectWalletButton() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default ConnectWalletButton;
