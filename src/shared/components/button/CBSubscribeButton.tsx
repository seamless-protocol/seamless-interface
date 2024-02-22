import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useWalletName } from "../../hooks/useWalletName";

interface Props {
  partnerAddress: string;
  partnerName: string;
  modalTitle: string;
  modalBody: string;
}

export const CBSubscribeButton: React.FC<{
  config: Props;
}> = ({ config }) => {
  const isCoinbaseWallet = useWalletName() === "Coinbase Wallet";
  const { isConnected } = useAccount();

  const [isSubscribed, setISubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // provider && !readOnlyMode &&
    if (isConnected && window.CBWSubscribe) {
      window.CBWSubscribe.createSubscriptionUI({
        onSubscriptionChange: setISubscribed,
        onLoading: setIsLoading,
        ...config,
      });
    } else {
      console.error("window.CBWSubscribe is not defined");
    }
  }, [isConnected, window.CBWSubscribe, isCoinbaseWallet]);

  const handleSubscribe = useCallback(() => {
    if (window && window.CBWSubscribe) {
      window.CBWSubscribe.toggleSubscription();
    }
  }, []);

  const subscribeButtonText = isLoading
    ? "Loading..."
    : isSubscribed
      ? "Unsubscribe"
      : "Subscribe";

  if (!isCoinbaseWallet) return null;

  return (
    <button
      onClick={handleSubscribe}
      className="p-[6px] rounded-sm bg-background-subscribe text-text-links border-primary-main"
    >
      {subscribeButtonText}
    </button>
  );
};
