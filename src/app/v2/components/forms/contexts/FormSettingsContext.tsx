import React, { useState, ReactNode, createContext, useEffect } from "react";
import { Address } from "viem";
import { OverrideUrlSlug, useAssetPickerState } from "../../../hooks/useAssetPickerState";

export interface FormSettingsContextType {
  hideTag?: boolean;
  onTransaction?: () => void;
  asset?: Address;
  setAsset: (asset?: Address) => void;
  subStrategy?: Address;
  setSubStrategy: (asset?: Address) => void;
  setIsStrategy: (isStrategy?: boolean) => void;
  overrideUrlSlug?: OverrideUrlSlug;
  disableAssetPicker?: boolean;
  isStrategy: boolean;
}

export const FormSettingsContext = createContext<FormSettingsContextType | undefined>(undefined);

interface FormSettingsProviderProps {
  children: ReactNode;
  defaultAsset?: Address;
  defaultSubStrategy?: Address;
  onTransaction?: () => void;
  hideTag?: boolean;
  overrideUrlSlug?: OverrideUrlSlug;
  disableAssetPicker?: boolean;
  isStrategy?: boolean;
}

export const FormSettingsProvider: React.FC<FormSettingsProviderProps> = ({
  children,
  defaultAsset,
  defaultSubStrategy,
  onTransaction,
  hideTag,
  overrideUrlSlug,
  disableAssetPicker,
}) => {
  const { asset: assetFromUrl, isStrategy: isStrategyUrl } = useAssetPickerState({ overrideUrlSlug });
  const [asset, setAsset] = useState<Address | undefined>(defaultAsset);
  const [subStrategy, setSubStrategy] = useState<Address | undefined>(defaultSubStrategy);
  const [isStrategy, setIsStrategy] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (overrideUrlSlug) {
      setAsset(assetFromUrl);
      setIsStrategy(isStrategyUrl || false);
    }
  }, [assetFromUrl]);

  return (
    <FormSettingsContext.Provider
      value={{
        asset,
        setAsset,
        onTransaction,
        hideTag,
        overrideUrlSlug,
        setIsStrategy,
        disableAssetPicker,
        isStrategy: isStrategy || false,
        subStrategy,
        setSubStrategy,
      }}
    >
      {children}
    </FormSettingsContext.Provider>
  );
};
