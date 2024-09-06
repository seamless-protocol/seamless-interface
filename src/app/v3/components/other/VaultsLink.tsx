import { ExternalLink } from "@shared";
import { Address } from "viem";
import { useFullTokenData } from "../../../state/common/meta-data-queries/useFullTokenData";

export const VaultsLink: React.FC<{
  asset?: Address;
}> = ({ asset }) => {
  const {
    data: { vaultsFyiLink },
  } = useFullTokenData(asset);

  if (!asset) return null;
  if (vaultsFyiLink == null) {
    return null;
  }

  return (
    <ExternalLink url={vaultsFyiLink} className="text-regular3">
      VaultsLink.fyi
    </ExternalLink>
  );
};
