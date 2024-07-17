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
  targetMultiply?: string;
  setTargetMultiply: (targetMultiply?: string) => void;
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
  defaultIsStrategy?: boolean;
  defaultTargetMultiply?: string;
}

export const FormSettingsProvider: React.FC<FormSettingsProviderProps> = ({
  children,
  defaultAsset,
  defaultSubStrategy,
  defaultIsStrategy,
  onTransaction,
  hideTag,
  overrideUrlSlug,
  disableAssetPicker,
  defaultTargetMultiply,
}) => {
  const { asset: assetFromUrl, isStrategy: isStrategyUrl } = useAssetPickerState({ overrideUrlSlug });
  const [asset, setAsset] = useState<Address | undefined>(defaultAsset);
  const [subStrategy, setSubStrategy] = useState<Address | undefined>(defaultSubStrategy);
  const [isStrategy, setIsStrategy] = useState<boolean | undefined>(defaultIsStrategy);
  const [targetMultiply, setTargetMultiply] = useState<string | undefined>(defaultTargetMultiply);

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
        targetMultiply,
        setTargetMultiply,
      }}
    >
      {children}
    </FormSettingsContext.Provider>
  );
};
