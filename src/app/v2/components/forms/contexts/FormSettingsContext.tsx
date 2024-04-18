import React, { useState, ReactNode, createContext, useEffect } from "react";
import { Address } from "viem";
import { OverrideUrlSlug, useAssetPickerState } from "../../../hooks/useAssetPickerState";

export interface FormSettingsContextType {
  hideTag?: boolean;
  onTransaction?: () => void;
  asset: Address;
  setAsset: (asset: Address) => void;
  overrideUrlSlug?: OverrideUrlSlug;
  disableAssetPicker?: boolean;
}

export const FormSettingsContext = createContext<FormSettingsContextType | undefined>(undefined);

interface FormSettingsProviderProps {
  children: ReactNode;
  defaultAsset: Address;
  onTransaction?: () => void;
  hideTag?: boolean;
  overrideUrlSlug?: OverrideUrlSlug;
  disableAssetPicker?: boolean;
}

export const FormSettingsProvider: React.FC<FormSettingsProviderProps> = ({
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
    <FormSettingsContext.Provider value={{
      asset,
      setAsset,
      onTransaction,
      hideTag,
      overrideUrlSlug,
      disableAssetPicker
    }}>
      {children}
    </FormSettingsContext.Provider>
  );
};
