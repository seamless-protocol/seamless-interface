import { ExternalLink, TokenDescriptionDict } from "@shared";
import { Address } from "viem";


export const VaultsLink: React.FC<{
  asset?: Address;
  isStrategy?: boolean;
}> = ({ asset, isStrategy }) => {
  if (!asset) return null;
  const link = isStrategy ? TokenDescriptionDict[asset].strategyExternalLinks?.vaultsLink
    : TokenDescriptionDict[asset].externalLinks?.vaultsLink;

  if (link == null) {
    return null;
  }

  return (
    <ExternalLink url={link} className="text-regular3">
      Analytics
    </ExternalLink>
  );
};
