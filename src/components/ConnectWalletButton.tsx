import { connect, injected } from "@wagmi/core";
import { wagmiConfig } from "../../config/wagmi/config";
import { useAccount } from "wagmi";

//TODO: Remove this component when third parties adapt to new version of Wagmi
function ConnectWalletButton() {
  const account = useAccount();

  console.log("account", account.address);

  const handleConnectWallet = async () => {
    await connect(wagmiConfig, {
      connector: injected(),
    });
  };

  return (
    <button
      className="btn btn-primary btn-lg"
      type="button"
      onClick={handleConnectWallet}
    >
      Connect Wallet
    </button>
  );
}

export default ConnectWalletButton;
