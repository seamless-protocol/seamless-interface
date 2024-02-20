import makeBlockie from "ethereum-blockies-base64";
import { normalize } from "viem/ens";
import { useMemo } from "react";
import { useEnsName, useEnsAvatar, useAccount } from "wagmi";

export const useUserAvatar = () => {
  const { address } = useAccount();
  const { data: ensName, isLoading } = useEnsName({
    address: address,
  });
  const { data: ensAvatar, isLoading: isAvatarLoading } = useEnsAvatar({
    name: normalize(ensName || ""),
  });

  const blockieAvatar = useMemo(() => {
    if (!address) return undefined;
    return makeBlockie(address);
  }, [address]);

  return {
    avatar: ensAvatar || blockieAvatar,
    isLoading: isLoading || isAvatarLoading,
  };
};
