import React, { useState, ReactNode, createContext, useEffect } from "react";
import { Address } from "viem";
import { OverrideUrlSlug, useAssetPickerState } from "../../../../hooks/useAssetPickerState";

export interface WithdrawFormContextType {
  hideTag?: boolean;
  onTransaction?: () => void;
  asset: Address;
  setAsset: (asset: Address) => void;
  overrideUrlSlug?: OverrideUrlSlug;
  disableAssetPicker?: boolean;
}

export const WithdrawFormContext = createContext<WithdrawFormContextType | undefined>(undefined);


interface WithdrawFormProviderProps {
  children: ReactNode;
  defaultAsset: Address;
  onTransaction?: () => void;
  hideTag?: boolean;
  overrideUrlSlug?: OverrideUrlSlug;
  disableAssetPicker?: boolean;
}

export const WithdrawFormProvider: React.FC<WithdrawFormProviderProps> = ({
  children,
  defaultAsset,
  onTransaction,
  hideTag,
  overrideUrlSlug,
  disableAssetPicker
}) => {
  const { asset: assetFromUrl } = useAssetPickerState({ overrideUrlSlug })
  const [asset, setAsset] = useState(defaultAsset);

  useEffect(() => {
    if (overrideUrlSlug) {
      setAsset(assetFromUrl);
    }
  }, [assetFromUrl])

  return (
    <WithdrawFormContext.Provider value={{
      asset,
      setAsset,
      onTransaction,
      hideTag,
      overrideUrlSlug,
      disableAssetPicker
    }}>
      {children}
    </WithdrawFormContext.Provider>
  );
};
