import { useParams } from "react-router-dom";
import { Address } from "viem";
import { seamless_Flagship_USDC_Vault } from "@meta";
import { Seamless_Flagship_USDC_VaultDetails } from "./morpho-details-per-vault/Seamless_Flagship_USDC_VaultDetails";

const DetailsDictionary = {
  [seamless_Flagship_USDC_Vault]: Seamless_Flagship_USDC_VaultDetails,
}

export const VaultDetails = () => {
  const { address } = useParams<{ address: string }>();
  const vault = address as Address | undefined;

  const Details = vault ? DetailsDictionary[vault] : undefined;

  return (
    (Details && vault) ? <Details vault={vault} /> : <div>Vault details not configured</div>
  );
};
