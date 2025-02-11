import { vaultConfig } from "../../../../../statev3/settings/config";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFormContext } from "react-hook-form";

export const ALLOW_WRAP_FIELD = "allowWrap";

export const useIsWrapping = () => {
  // *** asset *** //
  const { strategy: vault } = useFormSettingsContext();

  // *** form functions *** //
  const { watch } = useFormContext();
  const allowWrap = watch(ALLOW_WRAP_FIELD);

  // *** logic *** //
  if (vault && vaultConfig[vault]?.isEthWrappable && allowWrap) {
    return true;
  }

  return false;
};
