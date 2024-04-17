import React, { useState, ReactNode, createContext, useEffect } from "react";
import { Address } from "viem";
import { OverrideUrlSlug, useAssetPickerState } from "../../../../hooks/useAssetPickerState";

export interface EarnFormContextType {
  hideTag?: boolean;
  onTransaction?: () => void;
  asset: Address;
  setAsset: (asset: Address) => void;
  overrideUrlSlug?: OverrideUrlSlug;
  disableAssetPicker?: boolean;
}

export const EarnFormContext = createContext<EarnFormContextType | undefined>(undefined);


interface EarnFormProviderProps {
  children: ReactNode;
  defaultAsset: Address;
  onTransaction?: () => void;
  hideTag?: boolean;
  overrideUrlSlug?: OverrideUrlSlug;
  disableAssetPicker?: boolean;
}

export const EarnFormProvider: React.FC<EarnFormProviderProps> = ({
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
    <EarnFormContext.Provider value={{
      asset,
      setAsset,
      onTransaction,
      hideTag,
      overrideUrlSlug,
      disableAssetPicker
    }}>
      {children}
    </EarnFormContext.Provider>
  );
};
