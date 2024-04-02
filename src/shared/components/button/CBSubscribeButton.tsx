import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useWalletName } from "../../hooks/wallet-hooks/useWalletName";

interface Props {
  partnerAddress: string;
  partnerName: string;
  modalTitle: string;
  modalBody: string;
}

function getSubscribeButtonText(isLoading: boolean, isSubscribed: boolean) {
  if (isLoading) return "Loading...";
  return isSubscribed ? "Unsubscribe" : "Subscribe";
}

export const CBSubscribeButton: React.FC<{
  config: Props;
}> = ({ config }) => {
  const isCoinbaseWallet = useWalletName() === "Coinbase Wallet";
  const { isConnected } = useAccount();

  const [isSubscribed, setISubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isConnected && isCoinbaseWallet && window.CBWSubscribe) {
      window.CBWSubscribe.createSubscriptionUI({
        onSubscriptionChange: setISubscribed,
        onLoading: setIsLoading,
        ...config,
      });
    }
  }, [isConnected, window.CBWSubscribe, isCoinbaseWallet]);

  const handleSubscribe = useCallback(() => {
    if (window && window.CBWSubscribe) {
      window.CBWSubscribe.toggleSubscription();
    }
  }, [window.CBWSubscribe]);

  const subscribeButtonText = getSubscribeButtonText(isLoading, isSubscribed);

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
