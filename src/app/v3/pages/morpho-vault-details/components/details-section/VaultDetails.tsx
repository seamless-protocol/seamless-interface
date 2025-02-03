import { useParams } from "react-router-dom";
import { Address } from "viem";
import { seamlesscbBTCMorphoVault, seamlessUSDCMorphoVault } from "@meta";
import { Seamless_USDC_VaultDetails } from "./morpho-details-per-vault/Seamless_USDC_VaultDetails";
import { Seamless_cbBTC_VaultDetails } from "./morpho-details-per-vault/Seamless_cbBTC_VaultDetails";

const DetailsDictionary = {
  [seamlessUSDCMorphoVault]: Seamless_USDC_VaultDetails,
  [seamlesscbBTCMorphoVault]: Seamless_cbBTC_VaultDetails,
};

export const VaultDetails = () => {
  const { address } = useParams<{ address: string }>();
  const vault = address as Address | undefined;

  const Details = vault ? DetailsDictionary[vault] : undefined;

  return Details && vault ? <Details vault={vault} /> : <div>Vault details not configured</div>;
};
