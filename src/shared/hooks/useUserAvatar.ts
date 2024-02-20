import makeBlockie from "ethereum-blockies-base64";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export const useUserAvatar = () => {
  const { address, isConnecting } = useAccount();

  const blockieAvatar = useMemo(() => {
    if (!address) return undefined;
    return makeBlockie(address);
  }, [address]);

  return {
    avatar: blockieAvatar,
    isLoading: isConnecting,
  };
};
