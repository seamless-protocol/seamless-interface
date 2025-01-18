import { useParams } from "react-router-dom";
import { Address } from "viem";
import { seamlessUSDCMorphoVault } from "@meta";
import { Seamless_Flagship_USDC_VaultDetails } from "./morpho-details-per-vault/Seamless_Flagship_USDC_VaultDetails";

const DetailsDictionary = {
  [seamlessUSDCMorphoVault]: Seamless_Flagship_USDC_VaultDetails,
};

export const VaultDetails = () => {
  const { address } = useParams<{ address: string }>();
  const vault = address as Address | undefined;

  const Details = vault ? DetailsDictionary[vault] : undefined;

  return Details && vault ? <Details vault={vault} /> : <div>Vault details not configured</div>;
};
