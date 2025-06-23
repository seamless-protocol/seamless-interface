import { useFetchFormattedFullVaultInfo } from "../../../../../data/morpho/full-vault-info/FullVaultInfo.hook";
import { isWETH } from "../../../../utils/utils";
import { useFormSettingsContext } from "../../contexts/useFormSettingsContext";
import { useFormContext } from "react-hook-form";

export const DEPOSIT_NATIVE_ETH = "depositNativeETH";

export const useDepositingNativeETH = () => {
  // *** asset *** //
  const { strategy: vault } = useFormSettingsContext();
  const { data: vaultData } = useFetchFormattedFullVaultInfo(vault);

  // *** form functions *** //
  const { watch } = useFormContext();
  const depositNativeETH = watch(DEPOSIT_NATIVE_ETH);

  // *** logic *** //
  if (isWETH(vaultData?.asset.address) && depositNativeETH) {
    return true;
  }

  return false;
};
